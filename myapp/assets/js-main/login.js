var UserService = {
    init: function() {

        //Validation for login form
        $("#login-form").validate({
            rules: {
                loginemail: {
                    required: true,
                    email: true
                },
                loginpassword: {
                    required: true,
                    minlength: 8
                }
            }, 
            messages: {
                loginemail: {
                    required: "Please enter your email address.",
                    email: "Please enter a valid email address."
                },
                loginpassword: {
                    required: "Please enter a password.",
                    minlength: "Your password must be at least 6 characters long."
                },
            },
            submitHandler: function(form){
                var entity = {
                    email: $("input[name='loginemail']").val(),
                    password: $("input[name='loginpassword']").val()
                };
                console.log("entity:", entity);
                UserService.login(entity); //Calling the fubction for registering user with the payload provided
            }

        });
    },

    login: function(entity) {
        $.ajax({
            url: Constants.get_api_base_url() + "login",
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

                $("input[name='loginemail']").val(''),
                $("input[name='loginpassword']").val('')
               // localStorage.setItem('current_user', JSON.stringify(result));
                localStorage.setItem('user_type', result.user_type);
                localStorage.setItem('users_id', result.id);
                localStorage.setItem('token', result.token);
                localStorage.setItem('first_name', result.first_name);
                window.location.href = 'calendar.html';
            },
            error: function(result) {
                
                console.error("Login failed:", result); // Log the full error response
                showAlert("Login failed due to wrong credentials!");
                $("input[name='loginemail']").val(''),
                $("input[name='loginpassword']").val('')
            }
            
        });
    }
};

$(document).ready(function() {
    UserService.init();
});

