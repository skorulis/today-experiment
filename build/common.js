var HeaderElement = React.createClass({displayName: "HeaderElement",
    logoutPressed: function(e) {
        e.preventDefault()  
        this.props.onLogout()
    },
  render: function() {
    var logoutButton
    if(this.props.user != null) {
        logoutButton = React.createElement("a", {href: "#", className: "navbar-link", onClick: this.logoutPressed}, React.createElement("p", {className: "navbar-text navbar-right"}, "Signed in as ", this.props.user.get("username")))
    }
    return (
        React.createElement("nav", {className: "navbar navbar-default"}, 
            React.createElement("div", {className: "container-fluid"}, 
                React.createElement("a", {className: "navbar-brand", href: "#"}, "Today")
            ), 
        logoutButton
            
        )
    );
  }
});