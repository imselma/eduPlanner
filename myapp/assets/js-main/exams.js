var ExamService = {

    examsArray: [],

    init: function () {

        var selectedEventType = '';
        var type = '';

        // Handle event type selection
        $("#event-type-dropdown a").on("click", function () {
            selectedEventType = $(this).data("type");
            type = $(this).data("type");
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
            var eventType = type;

            // Only proceed if the selected type is 'Exam'
            if (selectedEventType === 'Exam') {
                var entity = {
                    exam_name: eventName,
                    exam_place: eventLocation,
                    exam_time: eventTime,
                    exam_date: eventDate,
                    exam_type: eventType
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
                $("input[name='eventype']").val('');
                showAlert2("Exam saved successfully!");

                // Automatically refresh the displayed exams after adding the new one
                TaskExamService.displayTasksExams(eventDate);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                showAlert2("Failed to save the exam: " + XMLHttpRequest.responseText);
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
                var selectedDate = $("input[name='eventdate']").val(); 
                TaskExamService.displayTasksExams(selectedDate);
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
