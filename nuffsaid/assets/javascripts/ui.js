$(document).on('click', '.nav_item', function(e) {
  e.preventDefault();

  switch($(this).attr('id')) {
    case 'add_series':
      window.currentModal = Modal.show('series');
    break;
  }
});