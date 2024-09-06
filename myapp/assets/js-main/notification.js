var notificationService = {

  //Turn notification ON
  turnOn: function () {
    var userId = localStorage.getItem('users_id')
    $.ajax({
      url: Constants.get_api_base_url() + "notificationOn" ,
      type: "PUT",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify({id: userId}),
      beforeSend: function(xhr) {
        if(localStorage.getItem('current_user')){
          xhr.setRequestHeader("Authentication", localStorage.getItem('token'));
        }
      },
      success: function (result) {
        showAlertN("Notifications turned on!");
        $('#l').css({
          'background-color': '#198754a6', 
        });
        localStorage.setItem('notification_flag', '1');

      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert("Failed to turn on notifications: " + XMLHttpRequest.responseText);
      }
    });
  },

  turnOff: function () {
    var userId = localStorage.getItem('users_id')
    $.ajax({
      url: Constants.get_api_base_url() + "notificationOff" ,
      type: "PUT",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify({id: userId}),
      beforeSend: function(xhr) {
        if(localStorage.getItem('current_user')){
          xhr.setRequestHeader("Authentication", localStorage.getItem('token'));
        }
      },
      success: function (result) {
        showAlertN("Notifications turned off!");
        $('#l').css({
          'background-color': 'rgba(52, 58, 64, 0.5)', // Default gray color when notifications are off
        });
        localStorage.setItem('notification_flag', '0');
      },
      error: function (XMLHttpRequest, textStatus, errorThrown) {
        alert("Failed to turn off notifications: " + XMLHttpRequest.responseText);
      }
    });

  }
};


$('#l').on('click', function(e){ 
  var notification_flag = localStorage.getItem('notification_flag')
  if(notification_flag == 0){
    showNotificationPopup("Do you want to turn deadline notifications on?");
  }
});


$('#l').on('click', function(e){ 
  var notification_flag = localStorage.getItem('notification_flag')
  if(notification_flag == 1){
    showNotificationPopup2("Do you want to turn deadline notifications off?");
  }
});