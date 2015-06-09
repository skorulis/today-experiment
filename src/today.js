var parseId = "obDHGL7K1Fmen951R5ezXvECakKrVVeCg3fNwLYg"
var parseKey = "MSgkDUlpCg4mlDNcva1VjAcZoLVXLHPBHA286omP"
var parseAPIKey = "W6ZiXjTuOPBpILFGKS9Z0DrI2sYNJVqGy7wrtGd3"

Parse.initialize(parseId, parseKey);

var PageContent = React.createClass({
    getInitialState: function() {
        console.log("User " + Parse.User.current())
        return { currentUser: Parse.User.current() };
    },
    handleRegisterComplete: function(user) {
		console.log("register " + user)			
    },
  render: function() {
      var mainView;
      console.log("main " + this.state.currentUser)
        if(this.state.currentUser != null) {
            mainView = <ContentList user={this.state.currentUser} />
        } else {
            mainView = <UserForm onRegisterComplete={this.handleRegisterComplete}/>    
        }
      
    return (
      <div className="content">
        {mainView}
      </div>
    );
  }
});

React.render(
  <PageContent />,
  document.getElementById('example')
);

console.log("ready ")