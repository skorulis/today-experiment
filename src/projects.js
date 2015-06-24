Parse.initialize(parseId, parseKey);

var ProjectList = React.createClass({
   render: function() {
        return (
            <div>TEST</div>
            );
   }
});

var PageContent = React.createClass({
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
        <div>
            <HeaderElement user={this.state.currentUser} onLogout={this.handleLogout} />
            <ProjectList />
        </div>
    );
  }
});

React.render(
  <PageContent />,
  document.getElementsByTagName ('body')[0]
);

console.log("ready ")