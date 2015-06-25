Parse.initialize(parseId, parseKey);

var ProjectElement = React.createClass({
    render: function() {
    return (
        <div>TEST</div>    
        )
    }
    
});

var ProjectList = React.createClass({
    getInitialState: function() {
        return {projects:[]  }
    },
    
   render: function() {
        return (
            <div>
            {this.state.projects.map(function(project,i) {
                    return React.createElement(ProjectElement, {project: project, key: project.get("name")})
                })}
            </div>
            )
   }
});

var PageContent = React.createClass({
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
        <div>
            <HeaderElement user={this.state.currentUser} onLogout={this.handleLogout} />
            <ProjectList />
        </div>
    );
  }
});

React.render(
  <PageContent />,
  document.getElementsByTagName ('body')[0]
);

console.log("ready ")