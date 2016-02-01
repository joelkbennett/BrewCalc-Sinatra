(function($) {
  var brewForm = $('#brew-form');

  $('#edit-brew-details').on('click', function(e) {
    e.preventDefault();
    brewForm.removeClass('hidden');
    $('.brew-details').addClass('hidden');
  });

  $('#cancel-edit').on('click', function(e) {
    e.preventDefault();
    $('.brew-details').removeClass('hidden');
    brewForm.addClass('hidden');    
  });

})(jQuery);