var TaskService = {

    tasksArray: [],
    selectedEventType: '',


    init: function () {

        // Handle event type selection
        $("#event-type-dropdown a").on("click", function () {
            selectedEventType = $(this).data("type");
            t_type = $(this).data("type");
            $(".btn-group .dropdown-toggle").text(selectedEventType);
        });

        // Form submit handler
        $("#form").on("submit", function (e) {
            e.preventDefault(); // Prevent the form from refreshing the page

            // Collect input values
            var eventName = $("input[name='eventname']").val();
            var eventDescription = $("input[name='eventplace']").val();
            var eventTime = $("input[name='eventtime']").val();
            var eventDate = $("input[name='eventdate']").val();
            var eventType = t_type;

            // Only proceed if the selected type is 'Exam'
            if (selectedEventType === 'Task') {
                var entity = {
                    task_name: eventName,
                    task_description: eventDescription,
                    task_time: eventTime,
                    task_date: eventDate,
                    task_type: eventType
                };

                // Call addTask with the entity
                TaskService.addTask(entity, eventDate); // Pass eventDate to display exams for this date
            }
        });
    },

    //Add logic
    addTask: function (entity, eventDate) {
        $.ajax({
            url: Constants.get_api_base_url() + "addTask",
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
                $("input[name='eventtype']").val('');
                showAlert2("Task saved successfully!");

                // Automatically refresh the displayed exams after adding the new one
                TaskExamService.displayTasksExams(eventDate);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                showAlert2("Failed to save the task: " + XMLHttpRequest.responseText);
            }
        });
    },

    //Delete Task
    deleteTask: function(taskId) {
        $.ajax({
            url: Constants.get_api_base_url() + "deleteTask/" + taskId, // Use the appropriate endpoint
            type: "DELETE",
            beforeSend: function(xhr) {
                if (localStorage.getItem('current_user')) {
                    xhr.setRequestHeader("Authentication", localStorage.getItem('token'));
                }
            },
            success: function(result) {
                showAlert2("Task deleted successfully!");
               // TaskService.displayTasks(); // Refresh the exam list after deletion
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                showAlert2("Failed to delete the task: " + XMLHttpRequest.responseText);
            }
        });
    },


};

$(document).ready(function () {
    TaskService.init();
});
