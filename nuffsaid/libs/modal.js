var Modal = function Modal(options) {
  this.modalId = options.modal;
  this.content = $('#template_' + options.modal)[0].content;
  this.overlay = $('#overlay');
};

Modal.prototype.enableOverlayEvent = function() {
  var self = this;

  $(document).off('click', '#overlay');
  $(document).one("click", '#overlay', function(e) {
    var target = $(e.target);
    
    if (target.is('.modal .close') || target.is('#overlay')) {
      e.preventDefault();
      self.close();
    }
    
    if (target[0].nodeName === 'A') {
      return true;
    }
  });
};

Modal.prototype.overlayExists = function() {
  return $('body').find('#overlay').length > 0;
};

Modal.prototype.closeOverlay = function() {
  if (this.overlayExists()) {
    var self = this;

    this.overlay.removeClass('fadeIn').addClass('fadeOut').on('webkitAnimationEnd', function(e) {
      $(document).off('click', '#overlay');
      self.overlay.remove();
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

    this.overlay = $('#overlay');
  }

  this.enableOverlayEvent();

  var overlay = this.overlay;

  this.overlay.attr('class', 'animated fadeIn');
  callback(overlay);
};

Modal.prototype.show = function() {
  if (this.content !== undefined) {
    var content = this.content;

    this.showOverlay(function(overlay) {
      overlay.append(content);
    });
  }

  return this;
};

Modal.prototype.close = function() {
  var self = this;
  var modal = this.overlay.find('.modal');

  if (modal.length > 0) {
    modal.removeClass('bounceInDown').addClass('bounceOutUp').on('webkitAnimationEnd', function() {
      if (self.overlay.children()[0]) {
        self.content.appendChild(self.overlay.children()[0]);
        $(self.content.firstChild).removeClass('bounceOutUp').addClass('bounceInDown');
      }

      self.closeOverlay();
    });
  }
  else {
    self.closeOverlay();
  }

  return this;
};

Modal.show = function(modal) {
  return (new Modal({modal: modal})).show();
};