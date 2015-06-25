Parse.initialize(parseId, parseKey);

var ProjectElement = React.createClass({
    render: function() {
    return (
        <div>
            <a href="google.com"><h2>{this.props.project.get("name")} - {this.props.project.get("client")}</h2></a>
        </div>    
        )
    }
    
});

var ProjectList = React.createClass({
    getInitialState: function() {
        return {projects:[]  }
    },
    addProjectPressed:function(e) {
        e.preventDefault()   
        var name = React.findDOMNode(this.refs.projectName).value.trim();
        var client = React.findDOMNode(this.refs.projectClient).value.trim();
        
        var project = new Project();
        project.set("name",name)
        project.set("client",client)
        project.set("parent",this.props.user)
        project.save()
        console.log(project)
    },
    componentDidMount: function() {
        var query = new Parse.Query(Project);
        var component = this
        query.equalTo("parent",this.props.user)
        query.find({
            success: function(results) {
                console.log(results)
                component.setState({projects:results})
            },
            error: function(error) {
                console.log("error " + error)
            }
        });
    },
    render: function() {
        return (
            <div>
            {this.state.projects.map(function(project,i) {
                return React.createElement(ProjectElement, {project: project, key: project.get("name")})
            })}
                                    
            <form onSubmit={this.addProjectPressed}>
                <input type="text" ref="projectName" className="form-control" placeholder="Project name" defaultValue="" />
                <input type="text" ref="projectClient" className="form-control" placeholder="Client" defaultValue="" />
                <input type="submit" className="btn btn-default" aria-label="Left Align" />
            </form>
            
            </div>
            )
   }
});

var PageContent = React.createClass({
    getInitialState: function() {
        console.log("User " + Parse.User.current())
        return { currentUser: Parse.User.current() };
    },
    handleLogout: function() {
        Parse.User.logOut();
        this.setState({currentUser:null})
    },
  render: function() {
    return (
        <div>
            <HeaderElement user={this.state.currentUser} onLogout={this.handleLogout} />
            <div className="content">
                <ProjectList user={this.state.currentUser} />
            </div>
        </div>
    );
  }
});

React.render(
  <PageContent />,
  document.getElementsByTagName ('body')[0]
);

console.log("ready ")