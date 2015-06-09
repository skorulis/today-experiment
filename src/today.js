Parse.initialize("obDHGL7K1Fmen951R5ezXvECakKrVVeCg3fNwLYg", "MSgkDUlpCg4mlDNcva1VjAcZoLVXLHPBHA286omP");

var RegisterElement = React.createClass({
	handleSubmit: function(e) {
    	e.preventDefault();
    	var username = React.findDOMNode(this.refs.username).value.trim();
    	var password = React.findDOMNode(this.refs.password).value.trim();
    	var email = React.findDOMNode(this.refs.email).value.trim();
    	this.props.onRegisterSubmit(username,password,email)
		return;
	},
	render: function() {
    return (
      <div className="register">
		<form onSubmit={this.handleSubmit}>
			<input type="text" placeholder="username" ref="username" />
			<input type="text" placeholder="password" ref="password" />
			<input type="text" placeholder="email" ref="email" />
			<input type="submit" value="Register" />
			</form>
      </div>
    );
  }
});

var PageContent = React.createClass({
	handleRegisterSubmit: function(username,password,email) {
		console.log("register")
		var user = new Parse.User();
		user.set("username",username)
		user.set("password",password)
		user.set("email",email)
		
		user.signUp(null, {
  			success: function(user) {
  		},
  		error: function(user, error) {
    		alert("Error: " + error.code + " " + error.message);
  		}
});
		
  },
  render: function() {
    return (
      <div className="content">
		<RegisterElement onRegisterSubmit={this.handleRegisterSubmit}/>
      </div>
    );
  }
});

React.render(
  <PageContent />,
  document.getElementById('example')
);

console.log("ready ")