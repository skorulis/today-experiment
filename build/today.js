var parseId = "obDHGL7K1Fmen951R5ezXvECakKrVVeCg3fNwLYg"
var parseKey = "MSgkDUlpCg4mlDNcva1VjAcZoLVXLHPBHA286omP"
var parseAPIKey = "W6ZiXjTuOPBpILFGKS9Z0DrI2sYNJVqGy7wrtGd3"

Parse.initialize(parseId, parseKey);

var PageContent = React.createClass({displayName: "PageContent",
    getInitialState: function() {
        console.log("User " + Parse.User.current())
        return { currentUser: Parse.User.current() };
    },
    handleLogin: function(user) {
        this.setState({ currentUser: Parse.User.current() })
		console.log("register " + user)			
    },
    handleLogout: function() {
        Parse.User.logOut();
        this.setState({currentUser:null})
    },
  render: function() {
      var mainView;
      console.log("main " + this.state.currentUser)
        if(this.state.currentUser != null) {
            mainView = React.createElement(ContentList, {user: this.state.currentUser})
        } else {
            mainView = React.createElement(UserForm, {onLogin: this.handleLogin})    
        }
      
    return (
        React.createElement("div", null, 
            React.createElement(HeaderElement, {user: this.state.currentUser, onLogout: this.handleLogout}), 
            React.createElement("div", {className: "content"}, 
                mainView
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