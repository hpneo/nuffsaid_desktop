var React = require('react');

var SeriesItem = React.createClass({
  displayName: 'SeriesItem',
  render: function() {
    var divOptions = {
      className: 'item'
    };

    if (this.props.onClick) {
      divOptions['onClick'] = this.props.onClick.bind(this);
    }

    if (this.props.onDoubleClick) {
      divOptions['onDoubleClick'] = this.props.onDoubleClick.bind(this);
    }

    return React.DOM.div(divOptions, [
      React.DOM.img({className: 'seriesImage', src: this.props.model.image}),
      React.DOM.span({className: 'seriesName'}, this.props.model.name),
      React.DOM.span({className: 'publisherName'}, (this.props.model.publisher || {}).name)
    ]);
  }
});

module.exports = SeriesItem;