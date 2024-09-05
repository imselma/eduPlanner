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

function showAlert3(message, examId) {
    document.getElementById("alert-message3").innerHTML = message;
    const alertBox = document.getElementById("custom-alert3");
    const overlay = document.getElementById("custom-alert-overlay3");
    alertBox.style.display = "block";
    overlay.style.display = "block";

    // Handle the close button (Cancel)
    document.getElementById("alert-close3").onclick = function() {
        alertBox.style.display = "none";
        overlay.style.display = "none";
    };

    // Handle the confirm delete button
    document.getElementById("alert-confirm-delete").onclick = function() {
        ExamService.deleteExam(examId); // Call the delete function
        alertBox.style.display = "none";
        overlay.style.display = "none";
    };
}

