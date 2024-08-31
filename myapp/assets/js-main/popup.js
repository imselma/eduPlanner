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
