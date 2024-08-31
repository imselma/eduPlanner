var UserService = {
    init: function() {
        //Validation for registartion form
        $("#signup-form").validate({
            rules: {
                signupfirstname: {
                    required: true
                },
                signuplastname: {
                    required: true
                },
                signupusername: {
                    required: true,
                },
                signupemail: {
                    required: true,
                    email: true
                },
                signuppassword: {
                    required: true,
                    minlength: 6
                },
                signupnumber: {
                    required: true
                }

            },
            messages: {
                signupfirstname: {
                    required: "Please enter your first name."
                },
                signuplastname: {
                    required: "Please enter your last name."
                },
                signupusername: {
                    required: "Please enter your username."
                },
                signupemail: {
                    required: "Please enter an email address.",
                    email: "Please enter a valid email address."
                },
                signuppassword: {
                    required: "Please enter a password.",
                    minlength: "Your password must be at least 8 characters long."
                },
                signupnumber: {
                    required: "Please enter your phone number."
                }
            },
            submitHandler: function(form){
                var entity = {
                    user_type: 'user',
                    first_name: $("input[name='signupfirstname']").val(),
                    last_name: $("input[name='signuplastname']").val(),
                    username: $("input[name='signupusername']").val(),
                    email: $("input[name='signupemail']").val(),
                    password: $("input[name='signuppassword']").val(),
                    phone_number: $("input[name='signupnumber']").val()
                };
                UserService.register(entity); //Calling the function for registering user with the payload provided
            }

        });

    },

    register: function(entity) {
        $.ajax({
            url: Constants.get_api_base_url() + "register",
            type: "POST",
            data: JSON.stringify(entity),
            contentType: "application/json",
            dataType: "json",
            beforeSend: function(xhr) {
                if(localStorage.getItem('current_user')){
                  xhr.setRequestHeader("Authentication", localStorage.getItem('token'));
                }
              },
            success: function(result) {
                $("input[name='signupfirstname']").val(''),
                $("input[name='signuplastname']").val(''),
                $("input[name='signupusername']").val(''),
                $("input[name='signupemail']").val(''),
                $("input[name='signuppassword']").val(''),
                $("input[name='signupnumber']").val('')
                window.location.href = 'login.html';
                showAlert1("Registration successfull!");            
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log(XMLHttpRequest.responseText);
                
                var response = JSON.parse(XMLHttpRequest.responseText);
                var errorMessage = response.error || "An unknown error occurred.";
                if (response.messages && response.messages.length > 1) {

                    errorMessage += "<ul>"; 
                    response.messages.forEach(function(message) {
                        errorMessage += "<li style='text-align: start;'>" + message + "</li>";
                    });
                    errorMessage += "</ul>"; 
                } else {
                    errorMessage = "<div style='text-align: center;'>" + errorMessage + "<br>" +  response.messages + "</div>";
                }
                
                showAlert1(errorMessage);
            }
            
            
            
            
        });
    }
};

$(document).ready(function() {
    UserService.init();
});