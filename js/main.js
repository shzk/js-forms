$(document).ready(function(){

    (function(){

        var validateForm = {
    
            init: function(){
                this._setUpListeners();
            },
    
            _setUpListeners: function(){
                $('#sendButton').on( 'click', validateForm._validateComment );
            },

            _validateComment: function(event){
                event.preventDefault();
                //console.log('privateMethod _validateComment runs');
                var valid = true,
                    form = $('#commentForm'),
                    commentArea = $('#commentArea'),
                    commentText = commentArea.val().trim(),
                    label = form.find('.label-title'),
                    errorText = commentArea.attr('data-error-text'),
                    errorTooltip = $('<div class="error">' + errorText + '</div>');

                if ( commentText.length === 0 ) {
                    label.before(errorTooltip);
                    valid = false;
                } else {
                    form.find('.error').remove();
                }

                commentArea.on('focus keydown change', function(){
                    form.find('.error').remove();
                    //console.log('we are now in textarea');
                });

                if (valid === true) {
                    //console.log('everything is okay, sending form now');
                    form.submit();
                }
            }
        };
    
        validateForm.init();
    
    }());
});