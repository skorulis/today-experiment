
navigator.getMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
var width = 320
var height
var imageContentType = "image/jpeg"

var DayElement = React.createClass({
    takePhotoPressed: function(e) {
        e.preventDefault()
        canvas.width = width;
        canvas.height = height;
        canvas.getContext('2d').drawImage(video, 0, 0, width, height);
        var data = canvas.toDataURL(imageContentType)
        data = data.substring(data.indexOf(',')+1);
        var jsonData = { "base64":data.toString(),"_ContentType":imageContentType};
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
                console.table(data)
                console.table(props)
                props.day.set("photoURL",data.url)
                props.day.save()
            },
            error: function(data) {
                var obj = jQuery.parseJSON(data);
                alert(obj.error);
            }
        });
        
        //photo.setAttribute('src', data);
    },
    
    startCapturePressed: function(e) {
      e.preventDefault()
      var video = document.querySelector('#video')
    var streaming = false
    
    video.addEventListener('canplay', function(ev){
    if (!streaming) {
      height = video.videoHeight / (video.videoWidth/width);
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      streaming = true;
    }
  }, false);
    
    navigator.getMedia(
    { video: true, audio: false },
    function(stream) {
      if (navigator.mozGetUserMedia) {
        video.mozSrcObject = stream;
      } else {
        var vendorURL = window.URL || window.webkitURL;
        video.src = vendorURL.createObjectURL(stream);
      }
      video.play();
    },
    function(err) {
      console.log("An error occured! " + err);
    }
  );
    },
    render: function() {
        var videoElement
        if(this.props.day.get("date") === Day.dateToday()) {
            videoElement = <div>
                    <canvas id="canvas" />
                    <video id="video" />
                    <button id="startbutton" onClick={this.startCapturePressed}>Start capture</button>
                    <button id="doneButtone" onClick={this.takePhotoPressed}>take photo</button>
                </div>
        }
        var imageElement
        if(this.props.day.get("photoURL") != null) {
            imageElement = <img src={this.props.day.get("photoURL")} />
        }
        
      return (
            <li className="list-group list-unstyled day" >
                <h3>{this.props.day.formattedDate()}</h3>
                {videoElement}
                {imageElement}
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