function showAlert(message) {
    document.getElementById("alert-message").textContent = message;
    const alertBox = document.getElementById("custom-alert");
    const overlay = document.getElementById("custom-alert-overlay");
    alertBox.style.display = "block";
    overlay.style.display = "block";

    document.getElementById("alert-close").onclick = function() {
        alertBox.style.display = "none";
        overlay.style.display = "none";
    };
}

function showAlert1(message) {
    document.getElementById("alert-message1").innerHTML = message;
    const alertBox = document.getElementById("custom-alert1");
    const overlay = document.getElementById("custom-alert-overlay1");
    alertBox.style.display = "block";
    overlay.style.display = "block";

    document.getElementById("alert-close1").onclick = function() {
        alertBox.style.display = "none";
        overlay.style.display = "none";
    };
}

function showAlert2(message) {
    document.getElementById("alert-message2").innerHTML = message;
    const alertBox = document.getElementById("custom-alert2");
    const overlay = document.getElementById("custom-alert-overlay2");
    alertBox.style.display = "block";
    overlay.style.display = "block";

    document.getElementById("alert-close2").onclick = function() {
        alertBox.style.display = "none";
        overlay.style.display = "none";
    };
}

function showAlert3(message, id, eventType) {
    document.getElementById("alert-message3").innerHTML = message;
    const alertBox = document.getElementById("custom-alert3");
    const overlay = document.getElementById("custom-alert-overlay3");
    alertBox.style.display = "block";
    overlay.style.display = "block";

    document.getElementById("alert-close3").onclick = function() {
        alertBox.style.display = "none";
        overlay.style.display = "none";
    };

    document.getElementById("alert-confirm-delete").onclick = function() {
        console.log("Confirm delete clicked for", eventType, "ID:", id); // Add this log
        if (eventType === 'Exam') {
            ExamService.deleteExam(id); 
        } else if (eventType === 'Task') {
            TaskService.deleteTask(id); 
        }
        alertBox.style.display = "none";
        overlay.style.display = "none";
    };
}

function showNotificationPopup(message) {
    document.getElementById("notification-popup-message").innerHTML = message;
    const popupBox = document.getElementById("custom-notification-popup");
    const overlay = document.getElementById("custom-notification-popup-overlay");
    popupBox.style.display = "block";
    overlay.style.display = "block";

    document.getElementById("notification-popup-close").onclick = function() {
        popupBox.style.display = "none";
        overlay.style.display = "none";
    };

    document.getElementById("notification-popup-submit").onclick = function() {
        notificationService.turnOn();
        popupBox.style.display = "none";
        overlay.style.display = "none";
    };
}

function showNotificationPopup2(message) {
    document.getElementById("notification-popup-message").innerHTML = message;
    const popupBox = document.getElementById("custom-notification-popup");
    const overlay = document.getElementById("custom-notification-popup-overlay");
    popupBox.style.display = "block";
    overlay.style.display = "block";

    document.getElementById("notification-popup-close").onclick = function() {
        popupBox.style.display = "none";
        overlay.style.display = "none";
    };

    document.getElementById("notification-popup-submit").onclick = function() {
        notificationService.turnOff();
        popupBox.style.display = "none";
        overlay.style.display = "none";
    };
}

