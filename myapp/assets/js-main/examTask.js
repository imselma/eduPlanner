var TaskExamService = {

    tasksArray: [],
    examArray: [],
    selectedEventType: '',

    //Display logic
    displayTasksExams: function (task_exam_date = $("input[name='eventdate']").val()) { // Default to the input field's date

        // Clear the event container before displaying new exams
        $(".events-container").empty();
        //console.log('datum',task_exam_date);
        
        var dateParts = task_exam_date.split('-');
        var month = dateParts[1];
        var day = dateParts[2];
        var year = dateParts[0];

        //Display Task

        $.ajax({
            url: Constants.get_api_base_url() + "getTaskByUserIdAndDate",
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({ task_date: task_exam_date }),
            beforeSend: function (xhr) {
                if (localStorage.getItem('current_user')) {
                    xhr.setRequestHeader("Authentication", localStorage.getItem('token'));
                }
            },
            success: function (data) {
                // Handle the received data
                TaskService.tasksArray = data.result;

                if (TaskService.tasksArray.length === 0) {
                    var event_card = $("<div class='event-card'></div>");
                    var event_name = $("<div class='event-name'>There are no tasks planned for " + day + "." + month + "." + year + ".</div>");
                    $(event_card).css({ "border-left": "10px solid #FF1744" });
                    $(event_card).append(event_name);
                    $(".events-container").append(event_card);
                } else {
                    // Display each task
                    TaskService.tasksArray.forEach((task) => {
                       // console.log("Task", task);
                        var event_card = $("<div class='event-card' style='position: relative;'></div>");
                        var event_id = $("<div class='event-id' style='visibility: hidden;'></div>")
                            .append("<span style='color: #e0a800; font-weight: bold;'>Id: </span>")
                            .append("<span style='color: black; font-weight: normal;'>" + task.id + "</span>");

                        var event_name = $("<div class='event-name'></div>")
                            .append("<span style='color: #e0a800; font-weight: bold;'>Task: </span>")
                            .append("<span style='color: black; font-weight: normal;'>" + task.task_name + "</span>");

                        var event_details = $("<div class='event-details'></div>")
                            .append("<span style='color: #e0a800; font-weight: bold;'>Description: </span>")
                            .append("<span style='color: black; font-weight: normal;'>" + task.task_description + "</span>");

                        var event_time = $("<div class='event-details'></div>")
                            .append("<span style='color: #e0a800; font-weight: bold;'>Time: </span>")
                            .append("<span style='color: black; font-weight: normal;'>" + task.task_time + " h</span>");
                                
                        var button_container = $("<div class='button-container' style='position: absolute; bottom: 10px; right: 10px; display: flex; gap: 10px;'></div>");

                        var delete_button = $("<button class='delete-exam' style='background: none; border: none; cursor: pointer;'></button>")
                            .append("<i class='fa fa-trash' style='color: black; font-size: 20px;'></i>");
                        
                        var edit_button = $("<button class='edit-exam' style='background: none; border: none; cursor: pointer;'></button>")
                                .append("<i class='fa fa-pencil' style='color: black; font-size: 20px;'></i>");
                        
                        delete_button.on('click', function () {
                            console.log("Delete button clicked for task ID: ", task.id);
                            showAlert3("Are you sure you want to delete this task?", task.id, 'Task'); 
                        });

                        edit_button.on('click', function () {

                            console.log("Opening edit modal forrrr: ", task.id);
                            console.log("type:", task.task_type);

                            $("#editname1").val(task.task_name);
                            $("#editdetails2").val(task.task_description);
                            $("#edittime3").val(task.task_time);
                            $("editdate4").val(task.task_date);
                            $("#event-type-dropdown-edit").val(task.task_type);

                            showModalEditEvent(task.id, 'Task');
                        });

                        $(button_container).append(edit_button).append(delete_button);
                        $(event_card).append(event_id).append(event_name).append(event_details).append(event_time).append(button_container);
                        $(".events-container").append(event_card);
                    });
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Failed to fetch task: " + XMLHttpRequest.responseText);
            }
        });

        //Display Exam
        $.ajax({
            url: Constants.get_api_base_url() + "getExamByUserIdAndDate",
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            data: JSON.stringify({ exam_date: task_exam_date }),
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
                    var event_name = $("<div class='event-name'>There are no exams planned for " + day + "." + month + "." + year + ".</div>");
                    $(event_card).css({ "border-left": "10px solid #FF1744" });
                    $(event_card).append(event_name);
                    $(".events-container").append(event_card);
                } else {
                    // Display each exam
                    ExamService.examsArray.forEach((exam) => {
                        var event_card = $("<div class='event-card' style='position: relative;'></div>");
                        var event_id = $("<div class='event-id' style='visibility: hidden;'></div>")
                            .append("<span style='color: #e0a800; font-weight: bold;'>Id: </span>")
                            .append("<span style='color: black; font-weight: normal;'>" + exam.id + "</span>");

                        var event_name = $("<div class='event-name'></div>")
                            .append("<span style='color: #e0a800; font-weight: bold;'>Exam: </span>")
                            .append("<span style='color: black; font-weight: normal;'>" + exam.exam_name + "</span>");

                        var event_details = $("<div class='event-details'></div>")
                            .append("<span style='color: #e0a800; font-weight: bold;'>Location: </span>")
                            .append("<span style='color: black; font-weight: normal;'>" + exam.exam_place + "</span>");

                        var event_time = $("<div class='event-details'></div>")
                            .append("<span style='color: #e0a800; font-weight: bold;'>Time: </span>")
                            .append("<span style='color: black; font-weight: normal;'>" + exam.exam_time + " h</span>");
                        
                        var button_container = $("<div class='button-container' style='position: absolute; bottom: 10px; right: 10px; display: flex; gap: 10px;'></div>");

                        var delete_button = $("<button class='delete-exam' style='background: none; border: none; cursor: pointer;'></button>")
                            .append("<i class='fa fa-trash' style='color: black; font-size: 20px;'></i>");
                        
                        var edit_button = $("<button class='edit-exam' style='background: none; border: none; cursor: pointer;'></button>")
                            .append("<i class='fa fa-pencil' style='color: black; font-size: 20px;'></i>");
                            
                        delete_button.on('click', function () {
                            showAlert3("Are you sure you want to delete this exam?", exam.id, 'Exam');
                        });

                        edit_button.on('click', function () {

                            console.log("Opening edit modal for: ", exam.id);
                            console.log("EType:", exam.exam_type);
                            $("#editname1").val(exam.exam_name);
                            $("#editdetails2").val(exam.exam_place);
                            $("#edittime3").val(exam.exam_time);
                            $("#editdate4").val(exam.exam_date);
                            $("#event-type-dropdown").val(exam.exam_type);
                            showModalEditEvent(exam.id, 'Exam');
                        });

                        $(button_container).append(edit_button).append(delete_button);
                        $(event_card).append(event_id).append(event_name).append(event_details).append(event_time).append(button_container);
                        $(".events-container").append(event_card);
                    });
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Failed to fetch task: " + XMLHttpRequest.responseText);
            }
        });
    },
};
