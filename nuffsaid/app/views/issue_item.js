var React = require('../../libs/react');

var IssueItem = React.createClass({
  displayName: 'IssueItem',
  render: function() {
    return React.DOM.div({
      className: 'item'
    }, [
      React.DOM.img({className: 'issueImage', src: this.props.model.image}),
      React.DOM.span({className: 'seriesName'}, this.props.model.series.name),
      React.DOM.span({className: 'issueNumber'}, '#' + this.props.model.issueNumber)
    ]);
  }
});

module.exports = IssueItem;