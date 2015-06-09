var RegisterForm = React.createClass({
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
		<form id="register-form" onSubmit={this.handleSubmit}>
			<div className="form-group">
				<input type="text" name="username" ref="username" tabIndex="1" className="form-control" placeholder="Username" />
			</div>
			<div className="form-group">
				<input type="email" name="email" ref="email" tabIndex="1" className="form-control" placeholder="Email Address" />
			</div>
			<div className="form-group">
				<input type="password" name="password" ref="password" tabIndex="2" className="form-control" placeholder="Password"/>
			</div>
			<div className="form-group">
				<input type="password" name="confirm-password" ref="confirmPassword" tabIndex="2" className="form-control" placeholder="Confirm Password"/>
			</div>
			<div className="form-group">
				<div className="row">
					<div className="col-sm-6 col-sm-offset-3">
						<input type="submit" name="register-submit" id="register-submit" tabIndex="4" className="form-control btn btn-register" value="Register Now"/>
					</div>
				</div>
			</div>
		</form>
	);}
});

var LoginForm = React.createClass({
	render: function() {
	return (
		<form id="login-form" >
			<div className="form-group">
				<input type="text" name="username" id="username" tabIndex="1" className="form-control" placeholder="Username" />
			</div>
			<div className="form-group">
				<input type="password" name="password" id="password" tabIndex="2" className="form-control" placeholder="Password" />
			</div>
			<div className="form-group text-center">
				<input type="checkbox" tabIndex="3" className="" name="remember" id="remember"/>
				<label htmlFor="remember"> Remember Me</label>
			</div>
			<div className="form-group">
				<div className="row">
					<div className="col-sm-6 col-sm-offset-3">
						<input type="submit" name="login-submit" id="login-submit" tabIndex="4" className="form-control btn btn-login" value="Log In"/>
					</div>
				</div>
			</div>
		</form>
	);}
});

var UserForm = React.createClass({
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
      <div className="container">
    	<div className="row">
			<div className="col-md-6 col-md-offset-3">
				<div className="panel panel-login">
					<div className="panel-heading">
						<div className="row">
							<div className="col-xs-6">
								<a href="#" className="active" id="login-form-link" onClick={this.loginPressed}>Login</a>
							</div>
							<div className="col-xs-6">
								<a href="#" id="register-form-link" onClick={this.registerPressed}>Register</a>
							</div>
						</div>
						<hr/>
					</div>
					<div className="panel-body">
						<div className="row">
							<div className="col-lg-12">
								<LoginForm  />
								<RegisterForm onRegisterComplete={this.props.onRegisterComplete} />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
    );
  }
});
