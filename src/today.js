var PageContent = React.createClass({
  render: function() {
    return (
      <div className="content">
		REACT UP AND RUNNING
      </div>
    );
  }
});

React.render(
  <PageContent />,
  document.getElementById('example')
);

console.log("ready ")