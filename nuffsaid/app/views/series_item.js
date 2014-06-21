var SeriesItem = React.createClass({
  displayName: 'SeriesItem',
  render: function() {
    return React.DOM.div({
      className: 'item'
    }, [
      React.DOM.img({className: 'seriesImage', src: this.props.model.image}),
      React.DOM.span({className: 'seriesName'}, this.props.model.name),
      React.DOM.span({className: 'publisherName'}, this.props.model.publisher.name)
    ]);
  }
});