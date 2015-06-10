var RegisterForm = React.createClass({displayName: "RegisterForm",
	handleSubmit: function(e) {
    	e.preventDefault();
    	var username = React.findDOMNode(this.refs.username).value.trim();
    	var password = React.findDOMNode(this.refs.password).value.trim();
    	var confirm = React.findDOMNode(this.refs.confirmPassword).value.trim();
    	var email = React.findDOMNode(this.refs.email).value.trim();
    	console.log("register " + username)
    	
        var user = new Parse.User();
        user.set("username", username);
        user.set("password", password);
        user.set("email", email);
        
        user.signUp(null, {
            success: function(user) {
            console.log("sign up " + this.props.onRegisterComplete)
            this.props.onRegisterComplete(user)
        },
        error: function(user, error) {
            alert("Error: " + error.code + " " + error.message);
        }
        });
        
		return;
	},
	render: function() {
	return (
		React.createElement("form", {id: "register-form", onSubmit: this.handleSubmit}, 
			React.createElement("div", {className: "form-group"}, 
				React.createElement("input", {type: "text", name: "username", ref: "username", tabIndex: "1", className: "form-control", placeholder: "Username"})
			), 
			React.createElement("div", {className: "form-group"}, 
				React.createElement("input", {type: "email", name: "email", ref: "email", tabIndex: "1", className: "form-control", placeholder: "Email Address"})
			), 
			React.createElement("div", {className: "form-group"}, 
				React.createElement("input", {type: "password", name: "password", ref: "password", tabIndex: "2", className: "form-control", placeholder: "Password"})
			), 
			React.createElement("div", {className: "form-group"}, 
				React.createElement("input", {type: "password", name: "confirm-password", ref: "confirmPassword", tabIndex: "2", className: "form-control", placeholder: "Confirm Password"})
			), 
			React.createElement("div", {className: "form-group"}, 
				React.createElement("div", {className: "row"}, 
					React.createElement("div", {className: "col-sm-6 col-sm-offset-3"}, 
						React.createElement("input", {type: "submit", name: "register-submit", id: "register-submit", tabIndex: "4", className: "form-control btn btn-register", value: "Register Now"})
					)
				)
			)
		)
	);}
});

var LoginForm = React.createClass({displayName: "LoginForm",
	render: function() {
	return (
		React.createElement("form", {id: "login-form"}, 
			React.createElement("div", {className: "form-group"}, 
				React.createElement("input", {type: "text", name: "username", id: "username", tabIndex: "1", className: "form-control", placeholder: "Username"})
			), 
			React.createElement("div", {className: "form-group"}, 
				React.createElement("input", {type: "password", name: "password", id: "password", tabIndex: "2", className: "form-control", placeholder: "Password"})
			), 
			React.createElement("div", {className: "form-group text-center"}, 
				React.createElement("input", {type: "checkbox", tabIndex: "3", className: "", name: "remember", id: "remember"}), 
				React.createElement("label", {htmlFor: "remember"}, " Remember Me")
			), 
			React.createElement("div", {className: "form-group"}, 
				React.createElement("div", {className: "row"}, 
					React.createElement("div", {className: "col-sm-6 col-sm-offset-3"}, 
						React.createElement("input", {type: "submit", name: "login-submit", id: "login-submit", tabIndex: "4", className: "form-control btn btn-login", value: "Log In"})
					)
				)
			)
		)
	);}
});

var UserForm = React.createClass({displayName: "UserForm",
	getInitialState: function() {
        return { registerDisplay: "asdfsdf" };
    },
	registerPressed: function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#login-form-link').removeClass('active');
		$('#register-form-link').addClass('active');
		e.preventDefault();
	},
	loginPressed: function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#register-form-link').removeClass('active');
		$('#login-form-link').addClass('active');
		e.preventDefault();
	},
	render: function() {
    return (
      React.createElement("div", {className: "container"}, 
    	React.createElement("div", {className: "row"}, 
			React.createElement("div", {className: "col-md-6 col-md-offset-3"}, 
				React.createElement("div", {className: "panel panel-login"}, 
					React.createElement("div", {className: "panel-heading"}, 
						React.createElement("div", {className: "row"}, 
							React.createElement("div", {className: "col-xs-6"}, 
								React.createElement("a", {href: "#", className: "active", id: "login-form-link", onClick: this.loginPressed}, "Login")
							), 
							React.createElement("div", {className: "col-xs-6"}, 
								React.createElement("a", {href: "#", id: "register-form-link", onClick: this.registerPressed}, "Register")
							)
						), 
						React.createElement("hr", null)
					), 
					React.createElement("div", {className: "panel-body"}, 
						React.createElement("div", {className: "row"}, 
							React.createElement("div", {className: "col-lg-12"}, 
								React.createElement(LoginForm, null), 
								React.createElement(RegisterForm, {onRegisterComplete: this.props.onRegisterComplete})
							)
						)
					)
				)
			)
		)
	)
    );
  }
});
