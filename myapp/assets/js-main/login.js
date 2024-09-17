function clearProfileData() {
    var userDetailsContainer = $("#profile-details");
    userDetailsContainer.empty(); // Clear the profile data container
}

function clearProfileEvents() {
    var userEventsContainer = $("#deadline-container");
    userEventsContainer.empty(); 
}

function clearProfileEvents() {
    var userDeadlinesContainer = $("#events-container");
    userDeadlinesContainer.empty(); 
}


var UserService = {
    
    init: function() {
    
         $('#logout-button').on('click', function(e) {
            e.preventDefault(); 
            UserService.logout(); 
        });

        $('#logout-btn').on('click', function(e) {
            e.preventDefault(); 
            UserService.logout(); 
        });

        $('#logout-btnn').on('click', function(e) {
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
    
                //showAlert("Login succesfull!");
                console.log("Login succesfull:", result);
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
                UserService.getUser();
               /* ExamService.getExams();
                TaskService.getTasks();
                TaskExamService.displayTasksExams();*/
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
                clearProfileData();
                clearProfileEvents();
                clearProfileEvents();
            },
            error: function(result) {
                console.error("Logout failed:", result); 
                showAlert("Logout failed!");
            }
            
        });
    },

    getUser: function() {
        return $.ajax({
            url: Constants.get_api_base_url() + "getUserById",
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            beforeSend: function(xhr) {
                const token = localStorage.getItem('token');
               // console.log("Token being sent:", token);
                if(localStorage.getItem('current_user')){
                  xhr.setRequestHeader("Authentication", token);
                }
            },
            success: function (result) {
                var userDetailsCintainer = $("#profile-details");
                userDetailsCintainer.empty();
                var first_name = $("<h2 class='profile-name' style='color:white;'>"+ result.result.first_name +" "+ result.result.last_name +"</h2>");
                var username= $("<p class='profile-username'>Username: "+ result.result.username +"</p>");
                var email= $(" <p class='profile-email'>Email: "+ result.result.email +" </p>");
                userDetailsCintainer.append(first_name).append(username).append(email);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.error("Failed to fetch user data:", XMLHttpRequest.responseText);
                alert("Failed to fetch user data: " + XMLHttpRequest.responseText);
            }
        });
    },

    submitEditForm: function () {
        var editEntity = {
          first_name: $("input[name='editfirstname']").val(),
          last_name: $("input[name='editlastname']").val(),
          username: $("input[name='editusername']").val(),
          email: $("input[name='editemail']").val(),
          phone_number: $("input[name='editnumber']").val()
        };
        var newPassword = $("input[name='editpassword']").val();
        if (newPassword) {
            editEntity.password = newPassword; 
        }

        UserService.editUser(editEntity);
    },

    editUser: function(entity) {
        $.ajax({
            url: Constants.get_api_base_url() + "editUser",
            type: "PUT",
            data: JSON.stringify(entity),
            contentType: "application/json",
            beforeSend: function(xhr) {
                const token = localStorage.getItem('token');
                //console.log("Token being sent:", token);
                if(localStorage.getItem('current_user')){
                  xhr.setRequestHeader("Authentication", token);
                }
            },
            success: function (result) {
                //console.log("Login succesfull. Result:", result);
                showModalSuccess("Data changed sucesfully!");
                UserService.getUser();

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.error("Failed to edit user data:", XMLHttpRequest.responseText);
                alert("Failed to edit user data: " + XMLHttpRequest.responseText);
            }
        });
    },

    deleteUser: function() {
        $.ajax({
            url: Constants.get_api_base_url() + "deleteUser",
            type: "DELETE",
            contentType: "application/json",
            beforeSend: function(xhr) {
              if(localStorage.getItem('current_user')){
                xhr.setRequestHeader("Authentication", localStorage.getItem('token'));
              }
            },
            success: function (result) {
                localStorage.removeItem('token');
                localStorage.removeItem('current_user');
                localStorage.removeItem('first_name');
                localStorage.removeItem('user_type');
                localStorage.removeItem('users_id');
                localStorage.removeItem('notification_flag');
                window.location.hash='home';
                updateSidebarForUnauthenticatedUser();
                clearProfileData();
                clearProfileEvents();
                clearProfileEvents();
        
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
              alert("Failed to delete the task: " + XMLHttpRequest.responseText);
            }
          });
    },   
};


$(document).ready(function() {
    UserService.init();
});

