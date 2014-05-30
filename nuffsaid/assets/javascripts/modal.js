var Modal = function Modal(options) {
  this.content = $('template_' + options.modal).children();
  this.overlay = $('#overlay');

  if (this.overlay.length == 0) {
    this.overlay = $('<div>', {
      id: 'overlay'
    });
  }

  var self = this;

  this.overlay.on("click", function(e) {
    var target = e.target;
    
    if (target.nodeName === 'A') {
      return true;
    }
    
    if ($(target).attr('id') === 'overlay') {
      self.close();
    }
  })
};

Modal.prototype.overlayExists = function() {
  return $('body').find('#overlay').length > 0;
};

Modal.prototype.closeOverlay = function() {
  if (this.overlayExists()) {
    var self = this;

    this.overlay.attr('class', 'animated fadeOut').on('animationend', function(e) {
      if (self.overlay.hasClass('fadeOut')) {
        self.overlay.off('click');
        self.overlay.remove();
      }
    });
  }
};

Modal.prototype.showOverlay = function(callback) {
  var body = $('body');
  if (!this.overlayExists()) {
    this.overlay = $('<div>', {
      id: 'overlay'
    });

    body.append(this.overlay);
  }

  this.overlay.attr('css', 'animated fadeIn').on('animationend', callback);
};

Modal.prototype.show = function() {
  if (this.content.length > 0) {
    var modal = this.content.hide();

    this.overlay.append(modal);

    this.showOverlay(function() {
      modal.attr('css', 'animated fadeIn');
    });
  }

  return this;
};

Modal.prototype.close = function() {
  if (this.content.length > 0) {
    var modal = this.content;
    var self = this;
    modal.fadeOut(300, (self.closeOverlay)(self));
  }

  return this;
};

Modal.show = function(modal) {
  return (new Modal({modal: modal})).show();
};