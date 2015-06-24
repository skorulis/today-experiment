var parseId = "obDHGL7K1Fmen951R5ezXvECakKrVVeCg3fNwLYg"
var parseKey = "MSgkDUlpCg4mlDNcva1VjAcZoLVXLHPBHA286omP"
var parseAPIKey = "W6ZiXjTuOPBpILFGKS9Z0DrI2sYNJVqGy7wrtGd3"

var HeaderElement = React.createClass({
    logoutPressed: function(e) {
        e.preventDefault()  
        this.props.onLogout()
    },
  render: function() {
    var logoutButton
    if(this.props.user != null) {
        logoutButton = <a href="#" className="navbar-link" onClick={this.logoutPressed}><p className="navbar-text navbar-right">Signed in as {this.props.user.get("username")}</p></a>
    }
    return (
        <nav className="navbar navbar-default" role="navigation">
        
            <div className="container-fluid">
                <a className="navbar-brand" href="#"><img src="img/icon-28.png" />  Today</a>
            </div>
        {logoutButton}
            
        </nav>
    );
  }
});