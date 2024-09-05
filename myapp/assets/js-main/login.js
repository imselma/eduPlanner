var UserService = {
    init: function() {
    
         $('#logout-button').on('click', function(e) {
            e.preventDefault(); 
            UserService.logout(); 
        });

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
            submitHandler: function(form, event){

                event.preventDefault();

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
                localStorage.setItem('current_user', JSON.stringify(result));
                localStorage.setItem('user_type', result.user_type);
                localStorage.setItem('users_id', result.id);
                localStorage.setItem('token', result.token);
                localStorage.setItem('first_name', result.first_name);
                localStorage.setItem('notification_flag', result.notification_flag);
                window.location.hash = '#calendar';
                updateSidebarForAuthenticatedUser();

                 setTimeout(function() {
                    var greetingElement = document.getElementById('user-greeting');
                    if (greetingElement) {
                        greetingElement.innerHTML = `<b>Welcome, ${result.first_name}! Add your upcoming exams and tasks!</b>`;
                        greetingElement.style.fontSize = '35px';
                    }
                }, 100);

                if(result.notification_flag == '1'){
                    $('#l').css({
                    'background-color': '#198754a6', 
                    });
                }else {
                    $('#l').css({
                    'background-color': 'rgba(52, 58, 64, 0.5)', 
                    });
                }
                // Clear the URL query parameters, if I go back button and than login again --> not to have this http://localhost/eduPlanner/myApp/?loginemail=aminameric3%40gmail.com&loginpassword=aminam2103#login
                window.history.pushState({}, document.title, window.location.pathname + "#calendar");
            },
            error: function(result) {
                
                console.error("Login failed:", result); 
                showAlert("Login failed due to wrong credentials!");
                $("input[name='loginemail']").val(''),
                $("input[name='loginpassword']").val('')
            }
            
        });
    },

    logout: function(){
        $.ajax({
            url: Constants.get_api_base_url() + "logout",
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            beforeSend: function(xhr) {
                if(localStorage.getItem('current_user')){
                  xhr.setRequestHeader("Authentication", localStorage.getItem('token'));
                }
              },
            success: function(result) {
                localStorage.removeItem('token');
                localStorage.removeItem('current_user');
                localStorage.removeItem('first_name');
                localStorage.removeItem('user_type');
                localStorage.removeItem('users_id');
                localStorage.removeItem('notification_flag');
                

                window.location.hash = '#home';
                updateSidebarForUnauthenticatedUser();
            },
            error: function(result) {
                console.error("Logout failed:", result); 
                showAlert("Logout failed!");
            }
            
        });
    },
};

$(document).ready(function() {
    UserService.init();
});

