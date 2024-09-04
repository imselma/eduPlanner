var ExamService = {

    examsArray: [],

    init: function () {

        var selectedEventType = '';

        // Handle event type selection
        $("#event-type-dropdown a").on("click", function () {
            selectedEventType = $(this).data("type");
            $(".btn-group .dropdown-toggle").text(selectedEventType);
        });

        // Form submit handler
        $("#form").on("submit", function (e) {
            e.preventDefault(); // Prevent the form from refreshing the page

            // Collect input values
            var eventName = $("input[name='eventname']").val();
            var eventLocation = $("input[name='eventplace']").val();
            var eventTime = $("input[name='eventtime']").val();
            var eventDate = $("input[name='eventdate']").val();

            // Only proceed if the selected type is 'Exam'
            if (selectedEventType === 'Exam') {
                var entity = {
                    exam_name: eventName,
                    exam_place: eventLocation,
                    exam_time: eventTime,
                    exam_date: eventDate
                };

                // Call addExam with the entity
                ExamService.addExam(entity, eventDate); // Pass eventDate to display exams for this date
            }
        });
    },

    //Add logic
    addExam: function (entity, eventDate) {
        $.ajax({
            url: Constants.get_api_base_url() + "addExam",
            type: "POST",
            data: JSON.stringify(entity),
            contentType: "application/json",
            dataType: "json",
            beforeSend: function (xhr) {
                if (localStorage.getItem('current_user')) {
                    xhr.setRequestHeader("Authentication", localStorage.getItem('token'));
                }
            },
            success: function (result) {
                // Clear form fields and show success message
                $("input[name='eventname']").val('');
                $("input[name='eventplace']").val('');
                $("input[name='eventtime']").val('');
                showAlert2("Exam saved successfully!");

                // Automatically refresh the displayed exams after adding the new one
                ExamService.displayExams(eventDate);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                showAlert2("Failed to save the exam: " + XMLHttpRequest.responseText);
            }
        });
    },

    //Display logic
    displayExams: function (exam_date = $("input[name='eventdate']").val()) { // Default to the input field's date

        // Clear the event container before displaying new exams
        $(".events-container").empty();

        var dateParts = exam_date.split('-');
        var month = dateParts[1];
        var day = dateParts[2];
        var year = dateParts[0];

        $.ajax({
            url: Constants.get_api_base_url() + "getExamByUserIdAndDate",
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({ exam_date: exam_date }),
            beforeSend: function (xhr) {
                if (localStorage.getItem('current_user')) {
                    xhr.setRequestHeader("Authentication", localStorage.getItem('token'));
                }
            },
            success: function (data) {
                // Handle the received data
                ExamService.examsArray = data.result;

                if (ExamService.examsArray.length === 0) {
                    var event_card = $("<div class='event-card'></div>");
                    var event_name = $("<div class='event-name'>There are no events planned for " + month + "." + day + "." + year + ".</div>");
                    $(event_card).css({ "border-left": "10px solid #FF1744" });
                    $(event_card).append(event_name);
                    $(".events-container").append(event_card);
                } else {
                    // Display each exam
                    ExamService.examsArray.forEach((exam) => {
                        var event_card = $("<div class='event-card'></div>");
                        var event_name = $("<div class='event-name'></div>")
                            .append("<span style='color: #e0a800; font-weight: bold;'>Exam: </span>")
                            .append("<span style='color: black; font-weight: normal;'>" + exam.exam_name + "</span>");

                        var event_details = $("<div class='event-details'></div>")
                            .append("<span style='color: #e0a800; font-weight: bold;'>Location: </span>")
                            .append("<span style='color: black; font-weight: normal;'>" + exam.exam_place + "</span>");

                        var event_time = $("<div class='event-details'></div>")
                            .append("<span style='color: #e0a800; font-weight: bold;'>Time: </span>")
                            .append("<span style='color: black; font-weight: normal;'>" + exam.exam_time + " h</span>");
                        
                        var delete_button = $("<button class='delete-exam' style=' bottom: 10px; right: 10px; padding-left: 17rem; background: none; border: none; cursor: pointer;'></button>")
                            .append("<i class='fa fa-trash' style='color: black; font-size: 20px;'></i>");

                        delete_button.on('click', function () {
                            showAlert3("Are you sure you want to delete this event?", exam.id); // Pass the exam ID
                        });

                        $(event_card).append(event_name).append(event_details).append(event_time).append(delete_button);
                        $(".events-container").append(event_card);
                    });
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Failed to fetch exam: " + XMLHttpRequest.responseText);
            }
        });
    },

    //Delete Exam
    deleteExam: function(examId) {
        $.ajax({
            url: Constants.get_api_base_url() + "deleteExam/" + examId, // Use the appropriate endpoint
            type: "DELETE",
            beforeSend: function(xhr) {
                if (localStorage.getItem('current_user')) {
                    xhr.setRequestHeader("Authentication", localStorage.getItem('token'));
                }
            },
            success: function(result) {
                showAlert2("Exam deleted successfully!");
                ExamService.displayExams(); // Refresh the exam list after deletion
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                showAlert2("Failed to delete the exam: " + XMLHttpRequest.responseText);
            }
        });
    },


};

$(document).ready(function () {
    ExamService.init();
});
