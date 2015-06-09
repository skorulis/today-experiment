
navigator.getMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

function startRecording() {
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

}


var ListItem = React.createClass({
    startCapturePressed: function(e) {
      e.preventDefault()
      startRecording()
      console.log("TEST")
    },
    render: function() {
        var videoElement
        
        if(this.props.day.get("date") === dateToday()) {
            videoElement = <div>
                <video id="video" /><button id="startbutton" onClick={this.startCapturePressed}>Start capture</button>
                </div>
        }
      return (
            <li>
                {this.props.day.get("date")} 
                {videoElement}
            </li>
      )}
});

var ContentList = React.createClass({
    getInitialState: function() {
        return {days:[]  }
    },
    addDayPressed: function(e) {
        e.preventDefault() 
        var today = new Day()
        today.set("date",dateToday())
        today.set("parent",this.props.user)
        today.save()
    },
    
    componentDidMount: function() {
        var query = new Parse.Query(Day);
        var component = this
        query.equalTo("parent",this.props.user)
        query.find({
            success: function(results) {
                console.table(results)     
                component.setState({days:results})
            },
            error: function(error) {
                console.log("error " + error)
            }
        });
    },

  render: function() {
      return (
      <div className="list">
        <h2> {this.props.user.get("username")} </h2>
        <a href="#" onClick={this.addDayPressed}><i className="fa fa-plus-circle"></i></a>
        <ul> {this.props.user.get("days")} 
        {this.state.days.map(function(day,i) {
            return <ListItem day={day} key={day.get("date")} />
        })}
    
        </ul>
      </div>
    );
  }
});