
navigator.getMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
var width = 320
var height
var imageContentType = "image/jpeg"

var TaskEntryElement = React.createClass({
    handleSubmit: function(e) {
      e.preventDefault()
      var task = React.findDOMNode(this.refs.newTask).value.trim();
      React.findDOMNode(this.refs.newTask).value = ''
      this.props.onTaskSubmit(task)
    },
    render: function() {
        return (
            <form onSubmit={this.handleSubmit}>
                    <input type="text" name="newTask" ref="newTask" tabIndex="1" className="form-control" placeholder="Add something" defaultValue="" />
            </form>
    );}
});

var TaskElement = React.createClass({
    render: function() {
        return (
            <li>{this.props.text}</li>
    );}
});

var DayElement = React.createClass({
    getInitialState: function() {
        return {recording:false}
    },
    handleTaskSubmit: function(task) {
        console.log("TEST" + task) 
        this.props.day.get("tasks").unshift(0)
        this.props.day.get("tasks")[0] = task
        this.props.day.save()
        this.setState({})
    },
    takePhotoPressed: function() {
        var video = document.querySelector('#video')
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(video, 0, 0, width, height);
        var originalData = canvas.toDataURL(imageContentType)
        var strippedData = originalData.substring(originalData.indexOf(',')+1);
        var jsonData = { "base64":strippedData.toString(),"_ContentType":imageContentType};
        var props = this.props
        var serverUrl = 'https://api.parse.com/1/files/' + "dayImage.jpeg";
        $.ajax({
            type: "POST",
            beforeSend: function(request) {
                request.setRequestHeader("X-Parse-Application-Id", parseId);
                request.setRequestHeader("X-Parse-REST-API-Key", parseAPIKey);
                request.setRequestHeader("Content-Type", imageContentType);
            },
            url: serverUrl,
            data: JSON.stringify(jsonData),
            processData: false,
            contentType: false,
            success: function(data) {
                props.day.set("photoURL",data.url)
                props.day.save()
            },
            error: function(data) {
                var obj = jQuery.parseJSON(data);
                alert(obj.error);
            }
        });
        this.setState({recording:false,imageData:originalData})
    },
    startCapturePressed: function(e) {
        e.preventDefault()
        if(this.state.recording) {
            this.takePhotoPressed()   
        } else {
            this.setState({recording:true})
        }
    },
    
    startCapture: function() {
        var video = document.querySelector('#video')
        var streaming = false
    
        video.addEventListener('canplay', function(ev){
            if (!streaming) {
                height = video.videoHeight / (video.videoWidth/width);
                streaming = true;
            }
        }, false);
    
        navigator.getMedia({ video: true, audio: false },function(stream) {
            if (navigator.mozGetUserMedia) {
                video.mozSrcObject = stream;
            } else {
                var vendorURL = window.URL || window.webkitURL;
                video.src = vendorURL.createObjectURL(stream);
            }
            video.play();
        },
            function(err) { console.log("An error occured! " + err); }
        );
    },
    componentDidUpdate: function(prevProps, prevState) {
        console.log("Will update " + this.state.recording)
        if(this.state.recording) {
            this.startCapture()   
        }
    },
    render: function() {
        var videoElement
        var imageElement
        if(this.state.recording) {
            videoElement = <video id="video" className="dayImageItem" z-index="2" />
        } else {
            if(this.state.imageData != null) {
                imageElement = <img src={this.state.imageData} className="dayImageItem" z-index="1" />
            } else if(this.props.day.get("photoURL") != null) {
                imageElement = <img src={this.props.day.get("photoURL")} className="dayImageItem" z-index="1" />
            }   
        }
        
      return (
            <li className="list-group list-unstyled day" >
                <h3>{this.props.day.formattedDate()}</h3>
                <div className="dayImageContainer">
                    {videoElement}
                    {imageElement}
                    <button type="button" className="btn btn-default captureButton" aria-label="Left Align" onClick={this.startCapturePressed}>
                        <span className="fa fa-camera" aria-hidden="true"></span>
                    </button>
                </div>
                <TaskEntryElement onTaskSubmit={this.handleTaskSubmit} />
                <ul>
                {this.props.day.get("tasks").map(function(task,i) {
                    return <TaskElement text={task} key={i} />
                })}
                </ul>
                
                
            </li>
      )}
});

var ContentList = React.createClass({
    updateState: function(days) {
        var firstDate
        if(days.length > 0) {
            firstDate = days[0].get("date")   
        }
        var today = Day.dateToday()
        console.log(firstDate)
        if(firstDate == null || firstDate.getDay() !== today.getDay() || firstDate.getMonth() !== today.getMonth() || firstDate.getYear() !== today.getYear()) {
            console.log("Adding today")
            var today = new Day()
            today.set("date",Day.dateToday())
            today.set("parent",this.props.user)
            today.set("tasks",[])
            days.unshift(0)
            days[0] = today
        }
        var lastDay = days[days.length-1]
        this.setState({days:days,bottomTime:lastDay.dateYesterday()})
    },
    getInitialState: function() {
        return {days:[]  }
    },
    addDayPressed: function(e) {
        e.preventDefault()
        var day = new Day()
        day.set("date",this.state.bottomTime)
        day.set("parent",this.props.user)
        day.set("tasks",[])
        day.save()
        this.state.days.push(day)
        this.updateState(this.state.days)
    },
    
    componentDidMount: function() {
        var query = new Parse.Query(Day);
        var component = this
        query.equalTo("parent",this.props.user)
        query.descending("date")
        query.find({
            success: function(results) {
                component.updateState(results)
            },
            error: function(error) {
                console.log("error " + error)
            }
        });
    },

  render: function() {
      var bottomButton
      if(this.state.bottomTime != null) {
        bottomButton = 
            <button type="button" className="btn btn-default" aria-label="Left Align" onClick={this.addDayPressed}>
                <span className="fa fa-plus-circle" aria-hidden="true"> {this.state.bottomTime.toDateString()}</span>
            </button>
      }
      return (
      <div className="list">
        <h2> {this.props.user.get("username")} </h2>
        
        <ul> {this.props.user.get("days")} 
        {this.state.days.map(function(day,i) {
            return <DayElement day={day} key={day.get("date")} />
        })}
        </ul>
        {bottomButton}
      </div>
    );
  }
});