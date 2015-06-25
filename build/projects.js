Parse.initialize(parseId, parseKey);

var ProjectElement = React.createClass({displayName: "ProjectElement",
    render: function() {
    return (
        React.createElement("div", null, "TEST")    
        )
    }
    
});

var ProjectList = React.createClass({displayName: "ProjectList",
    getInitialState: function() {
        return {projects:[]  }
    },
    
   render: function() {
        return (
            React.createElement("div", null, 
            this.state.projects.map(function(project,i) {
                    return React.createElement(ProjectElement, {project: project, key: project.get("name")})
                })
            )
            )
   }
});

var PageContent = React.createClass({displayName: "PageContent",
    getInitialState: function() {
        console.log("User " + Parse.User.current())
        return { currentUser: Parse.User.current() };
    },
    componentDidMount: function() {
        var query = new Parse.Query(Project);
        var component = this
        query.equalTo("parent",this.props.user)
        query.find({
            success: function(results) {
                component.updateState(results)
            },
            error: function(error) {
                console.log("error " + error)
            }
        });
    },
    handleLogout: function() {
        Parse.User.logOut();
        this.setState({currentUser:null})
    },
  render: function() {
    return (
        React.createElement("div", null, 
            React.createElement(HeaderElement, {user: this.state.currentUser, onLogout: this.handleLogout}), 
            React.createElement(ProjectList, null)
        )
    );
  }
});

React.render(
  React.createElement(PageContent, null),
  document.getElementsByTagName ('body')[0]
);

console.log("ready ")