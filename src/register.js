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
      <div className="container">
    	<div className="row">
			<div className="col-md-6 col-md-offset-3">
				<div className="panel panel-login">
					<div className="panel-heading">
						<div className="row">
							<div className="col-xs-6">
								<a href="#" className="active" id="login-form-link">Login</a>
							</div>
							<div className="col-xs-6">
								<a href="#" id="register-form-link">Register</a>
							</div>
						</div>
						<hr/>
					</div>
					<div className="panel-body">
						<div className="row">
							<div className="col-lg-12">
								<form id="login-form" >
									<div className="form-group">
										<input type="text" name="username" id="username" tabIndex="1" className="form-control" placeholder="Username" value="" />
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
									<div className="form-group">
										<div className="row">
											<div className="col-lg-12">
												<div className="text-center">
													<a href="http://phpoll.com/recover" tabIndex="5" className="forgot-password">Forgot Password?</a>
												</div>
											</div>
										</div>
									</div>
								</form>
								<form id="register-form" >
									<div className="form-group">
										<input type="text" name="username" id="username" tabIndex="1" className="form-control" placeholder="Username" value=""/>
									</div>
									<div className="form-group">
										<input type="email" name="email" id="email" tabIndex="1" className="form-control" placeholder="Email Address" value=""/>
									</div>
									<div className="form-group">
										<input type="password" name="password" id="password" tabIndex="2" className="form-control" placeholder="Password"/>
									</div>
									<div className="form-group">
										<input type="password" name="confirm-password" id="confirm-password" tabIndex="2" className="form-control" placeholder="Confirm Password"/>
									</div>
									<div className="form-group">
										<div className="row">
											<div className="col-sm-6 col-sm-offset-3">
												<input type="submit" name="register-submit" id="register-submit" tabIndex="4" className="form-control btn btn-register" value="Register Now"/>
											</div>
										</div>
									</div>
								</form>
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
