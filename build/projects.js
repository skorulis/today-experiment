Parse.initialize(parseId, parseKey);

var ProjectElement = React.createClass({displayName: "ProjectElement",
    render: function() {
    return (
        React.createElement("div", null, 
            React.createElement("a", {href: "google.com"}, React.createElement("h2", null, this.props.project.get("name"), " - ", this.props.project.get("client")))
        )    
        )
    }
    
});

var ProjectList = React.createClass({displayName: "ProjectList",
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
            React.createElement("div", null, 
            this.state.projects.map(function(project,i) {
                return React.createElement(ProjectElement, {project: project, key: project.get("name")})
            }), 
                                    
            React.createElement("form", {onSubmit: this.addProjectPressed}, 
                React.createElement("input", {type: "text", ref: "projectName", className: "form-control", placeholder: "Project name", defaultValue: ""}), 
                React.createElement("input", {type: "text", ref: "projectClient", className: "form-control", placeholder: "Client", defaultValue: ""}), 
                React.createElement("input", {type: "submit", className: "btn btn-default", "aria-label": "Left Align"})
            )
            
            )
            )
   }
});

var PageContent = React.createClass({displayName: "PageContent",
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
        React.createElement("div", null, 
            React.createElement(HeaderElement, {user: this.state.currentUser, onLogout: this.handleLogout}), 
            React.createElement("div", {className: "content"}, 
                React.createElement(ProjectList, {user: this.state.currentUser})
            )
        )
    );
  }
});

React.render(
  React.createElement(PageContent, null),
  document.getElementsByTagName ('body')[0]
);

console.log("ready ")