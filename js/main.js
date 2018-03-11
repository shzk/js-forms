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
    // end of form validation

    (function(){
        var validateLogin = {
    
            init: function(){
                this._setUpListeners();
            },
    
            _setUpListeners: function(){
                $('#loginButton').on('click', validateLogin._checkLogin );
            },
    
            _checkLogin: function(event){
                event.preventDefault();
                var form = $('#loginForm'),
                    inputs = form.find('input'),
                    heading = form.find('.plate__heading'),
                    validEmail = "mail@mail.com",
                    validPassword = "123",
                    emailValid,
                    emailValue,
                    passwordValid,
                    passwordValue;

                //loop for each input
                $.each( inputs, function(index, val) {
                    var input = $(val),
                        value = input.val().trim().toLowerCase(),
                        errorClass = input.attr('type'),
                        errorText = input.attr('data-empty-error'),
                        errorTooltip = $('<div class="error error-' + errorClass +'">' + errorText + '</div>');

                    if ( input.attr('type').toLowerCase() === 'email' ) {
                        if ( value.length === 0 ) {
                        form.find('.error-email').remove();
                        input.after(errorTooltip);
                        emailValid = false;
                        }
                        if ( value !== '' ) {
                            var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;

                            if ( pattern.test(value) ) {
                                form.find('.error-email, .error-description').remove();
                                emailValid = true;
                                emailValue = value;
                                /*console.log('Email is valid, value = ' + value);*/
                            } else {
                                form.find('.error-email, .error-description').remove();
                                errorText = input.attr('data-wrong-email');
                                errorTooltip = $('<div class="error error-email">' + errorText + '</div>');
                                input.after(errorTooltip);
                                emailValid = false;
                                emailValue = value;
                                /*console.log('Email is INVALID, value = ' + value);*/
                            }
                        } 
                    }

                    if ( input.attr('type').toLowerCase() === 'password' ) {
                        if ( value.length === 0 ) {
                        form.find('.error-password').remove();
                        input.after(errorTooltip);
                        passwordValid = false;
                        passwordValue = value;
                        /*console.log('password is INVALID, value is empty ');*/
                        }
                        if ( value !== '' ) {
                            form.find('.error-password').remove();
                            passwordValid = true;
                            passwordValue = value;
                            /*console.log('password is valid, value = ' + value);*/
                        } 
                    }

                    //hide errors
                    input.on('focus keydown change', function(){
                    errorClass = input.attr('type');
                    form.find('.error-email, .error-password').remove();

                    });

                    if ( emailValid === true && passwordValid === true) {
                        console.log('data is valid');
                        if ( emailValue !== validEmail || passwordValue !== validPassword ) {
                            form.find('.error-description, .error--with-desc').remove();
                            errorText = 'Неверный email или пароль';
                            loginErrorText = '<p>Введите верные данные для входа или воспользуйтесь <a href="#">восстановлением пароля, </a>чтобы войти на сайт.</p>';
                            loginErrorTooltip = '<div class="error-description">' + loginErrorText + '</div>';
                            errorTooltip = $('<div class="error error--with-desc">' + errorText + '</div>' + loginErrorTooltip);
                            heading.after(errorTooltip);
                            /*console.log('some credentials are wrong');*/
                        } else {
                            form.find('.error-description, .error--with-desc').remove();
                            /*console.log('all data valid, ready to submit form');*/
                            form.submit();
                        }
                    } 
                });
            },
        };
    
        validateLogin.init();
    
    }());

});