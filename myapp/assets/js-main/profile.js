function showModalDeleteEvent(message, id, eventType) {

    console.log("Modal called with ID: ", id, "Event Type: ", eventType); 

    document.getElementById("modal-message").innerHTML = message;
    const modalBox = document.getElementById("modal-profile");
    const modaloverlay = document.getElementById("modal-overlay-profile");
    modalBox.style.display = "block";
    modaloverlay.style.display = "block";

    document.getElementById("modal-close").onclick = function() {
        modalBox.style.display = "none";
        modaloverlay.style.display = "none";
    };

    document.getElementById("modal-confirm-delete").onclick = function() {
        console.log("Confirm delete clicked for", eventType, "ID:", id);
        if (eventType === 'Exam') {
            ExamService.deleteExam(id); 
        } else if (eventType === 'Task') {
            TaskService.deleteTask(id); 
        }
        modalBox.style.display = "none";
        modaloverlay.style.display = "none";
    };
}

function showModalSuccess(message) {

    document.getElementById("modal-success-message").innerHTML = message;
    const modalBox = document.getElementById("modal-success");
    const modaloverlay = document.getElementById("modal-overlay-success");
    modalBox.style.display = "block";
    modaloverlay.style.display = "block";

    document.getElementById("modal-success-close").onclick = function() {
        modalBox.style.display = "none";
        modaloverlay.style.display = "none";
    };
}

function showModalEditProfile() {

    const modalBox = document.getElementById("modal-profile-edit");
    const modaloverlay = document.getElementById("modal-overlay-profile-edit");
    modalBox.style.display = "block";
    modaloverlay.style.display = "block";

    document.getElementById("modal-close-edit").onclick = function() {
        modalBox.style.display = "none";
        modaloverlay.style.display = "none";
    };

    document.getElementById("modal-confirm-edit").onclick = function() {
        UserService.submitEditForm();
        modalBox.style.display = "none";
        modaloverlay.style.display = "none";
    };
}


function showModalDeleteProfile(message) {

    document.getElementById("modal-message-delete").innerHTML = message;

    const modalBox = document.getElementById("modal-profile-delete");
    const modaloverlay = document.getElementById("modal-overlay-profile-delete");
    modalBox.style.display = "block";
    modaloverlay.style.display = "block";

    document.getElementById("modal-close-delete").onclick = function() {
        modalBox.style.display = "none";
        modaloverlay.style.display = "none";
    };

    document.getElementById("modal-confirm-del").onclick = function() {
        UserService.deleteUser();
        modalBox.style.display = "none";
        modaloverlay.style.display = "none";
    };
}

$("#edit-btn").on('click', function() {
    showModalEditProfile();
})

$("#delete-btn").on('click', function() {
    showModalDeleteProfile("Do you want to deactivate the account?");
})


$(document).ready(function () {
    function displayEventType(eventType) {
        $("#deadline-container").empty();

        if (eventType === "Exam") {
            ExamService.getExams();
        } else if (eventType === "Task") {
           TaskService.getTasks();
        }
    }


    displayEventType("Exam");
    UserService.getUser();

    $("#event-type-dropdown").on("click", "a", function () {
        var selectedType = $(this).data("type");
        if(selectedType==="Exam"){
            ExamService.getExams();
        }else{
            TaskService.getTasks();
        }
    });

});



