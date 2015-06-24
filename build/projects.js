Parse.initialize(parseId, parseKey);

var ProjectList = React.createClass({displayName: "ProjectList",
   render: function() {
        return (
            React.createElement("div", null, "TEST")
            );
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