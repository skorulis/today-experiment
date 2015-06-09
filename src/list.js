
var ListItem = React.createClass({
    render: function() {
      return (
         <li> TEST</li>
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
        console.log("TEST")
    },
    
    componentDidMount: function() {
        var query = new Parse.Query(Day);
        var component = this
        query.equalTo("parent",this.props.user)
        query.find({
            success: function(results) {
                console.log("found " + results)     
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
            return <ListItem />
        })}
    
        </ul>
      </div>
    );
  }
});