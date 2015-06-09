Parse.initialize("obDHGL7K1Fmen951R5ezXvECakKrVVeCg3fNwLYg", "MSgkDUlpCg4mlDNcva1VjAcZoLVXLHPBHA286omP");

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