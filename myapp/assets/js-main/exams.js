var ExamService = {


    examsArray: [],
    currentPageExams: 1,  
    itemsPerPageExams: 4, 
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
          
                $("input[name='eventname']").val('');
                $("input[name='eventplace']").val('');
                $("input[name='eventtime']").val('');
                $("input[name='eventype']").val('');
                showAlert2("Exam saved successfully!");

                TaskExamService.displayTasksExams(eventDate);
                //ExamService.getExams();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                showAlert2("Failed to save the exam: " + XMLHttpRequest.responseText);
            }
        });
    },

    
        //Delete Exam
        deleteExam: function(examId) {
            $(".events-container").empty();

            $.ajax({
                url: Constants.get_api_base_url() + "deleteExam/" + examId,
                type: "DELETE",
                beforeSend: function(xhr) {
                    if (localStorage.getItem('current_user')) {
                        xhr.setRequestHeader("Authentication", localStorage.getItem('token'));
                    }
                },
                success: function(result) {
                    var selectedDate = $("input[name='eventdate']").val(); 
                    ExamService.getExams();
                    TaskExamService.displayTasksExams(selectedDate);

                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    showAlert2("Failed to delete the exam: " + XMLHttpRequest.responseText);
                }
            });
        },

    getExams: function () {
        $.ajax({
            url: Constants.get_api_base_url() + "getExamByUserId",
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            beforeSend: function(xhr) {
                if(localStorage.getItem('current_user')){
                    xhr.setRequestHeader("Authentication", localStorage.getItem('token'));
                }
            },
            success: function (result) {
                console.log("Fetching exams to rerender...");
                ExamService.examsArray = result.result;
                ExamService.renderExams(ExamService.currentPageExams);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Failed to retrieve exams: " + XMLHttpRequest.responseText);
            }
        });
    },

    setItemsPerPageExams: function() {
        var width = window.innerWidth;
        if (width <= 800) {
            ExamService.itemsPerPageExams = 1; 
        } else {
            ExamService.itemsPerPageExams = 4; 
        }
    },

    renderExams: function(page) {
        ExamService.setItemsPerPageExams(); 
        var deadlineContainer = $("#deadline-container");
        deadlineContainer.empty();

        var startIndexExam = (page - 1) * ExamService.itemsPerPageExams;
        var endIndexExam = startIndexExam + ExamService.itemsPerPageExams;

        var examsToDisplay = ExamService.examsArray.slice(startIndexExam, endIndexExam);

        if (examsToDisplay.length === 0) {
            var eventCard = $("<div class='custom-card' style='height: 10rem; align-items: center; display:flex;'></div>");
            var eventName = $("<div class='custom-title'>There are no exams planned.</div>");
            eventCard.css({ "border-left": "10px solid black" });
            eventCard.append(eventName);
            deadlineContainer.append(eventCard);
        } else {
         
            examsToDisplay.forEach(function(exam) {
                var eventCard = $("<div class='custom-card' id='exam-card-" + exam.id + "' style='position: relative;'></div>");
                var eventName = $("<div class='custom-title'>Exam: " + exam.exam_name + "</div>");
                var eventDetails = $("<div class='custom-details'>Location: " + exam.exam_place + "</div>");
                var eventDate = $("<div class='custom-details'>Date: " + exam.exam_date + "</div>");
                var eventTime = $("<div class='custom-details'>Time: " + exam.exam_time + " h</div>");
                var buttonContainer = $("<div class='button-container' style='position: absolute; bottom: 10px; right: 10px; display: flex; gap: 10px;'></div>");
                var deleteButton = $("<button class='delete-delete-btn' style='background: none; border: none; cursor: pointer;'></button>").append("<i class='fa fa-trash' style='color: black; font-size: 20px;'></i>");

                deleteButton.on('click', function() {
                    showModalDeleteEvent("Are you sure you want to delete this exam?", exam.id, 'Exam');
                });


                buttonContainer.append(deleteButton);
                eventCard.append(eventName).append(eventDetails).append(eventDate).append(eventTime).append(buttonContainer);
                deadlineContainer.append(eventCard);
            });
        }

        ExamService.updatePaginationControlsExam();
    },

    
    updatePaginationControlsExam: function() {
        var totalPagesExam = Math.ceil(ExamService.examsArray.length / ExamService.itemsPerPageExams);
        $("#page-info-exam").text("Page " + ExamService.currentPageExams + " of " + totalPagesExam);

        $("#prev-page-exam").prop("disabled", ExamService.currentPageExams === 1);
        $("#next-page-exam").prop("disabled", ExamService.currentPageExams === totalPagesExam);
    },


    //EDIT EXAMS
    //Form for both exams and tasks
    submitExamTaskEditForm: function (eventId, eventType) {

        console.log("dosao sam do submitanja forme!");
            var eventName = $("input[name='eventnameedit']").val();
            var eventDescription = $("input[name='eventplaceedit']").val();
            var eventTime = $("input[name='eventtimetime']").val();
            var eventDate = $("input[name='eventdateedit']").val();
            var eventTypeDropdown = $("#eventType").val(); 
 
            if (eventType === 'Task') {
                var entityTask = {
                    task_name: eventName,
                    task_description: eventDescription,
                    task_time: eventTime,
                    task_date: eventDate,
                    task_type: eventTypeDropdown
                };

                TaskService.editTask(entityTask, eventId); // Passed eventDate to display taskss for this date
            }else if (eventType === 'Exam') {
                var entityExam = {
                    exam_name: eventName,
                    exam_place: eventDescription,
                    exam_time: eventTime,
                    exam_date: eventDate,
                    exam_type: eventTypeDropdown
                };

                ExamService.editExam(entityExam, eventId); // Passed eventDate to display exams for this date
            }
    },

    editExam: function(entity, examId) {
        $.ajax({
            url: Constants.get_api_base_url() + "editExam/" + examId,
            type: "PUT",
            data: JSON.stringify(entity),
            contentType: "application/json",
            dataType: "json",
            beforeSend: function(xhr) {
              if(localStorage.getItem('current_user')){
                xhr.setRequestHeader("Authentication", localStorage.getItem('token'));
              }
            },
            success: function (result) {
                console.log("Exam successfully updated:", result);
                ExamService.getExams();
                TaskExamService.displayTasksExams(result.exam_date);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
              alert("Failed to edit the exam: " + XMLHttpRequest.responseText);
            }
        });
    }
};

$(document).ready(function() {
    ExamService.getExams();
    $("#prev-page-exam").on('click', function() {
        if (ExamService.currentPageExams > 1) {
            ExamService.currentPageExams--;
            ExamService.renderExams(ExamService.currentPageExams);
        }
    });

    $("#next-page-exam").on('click', function() {
        ExamService.getExams();
        var totalPagesExamm = Math.ceil(ExamService.examsArray.length / ExamService.itemsPerPageExams);
        if (ExamService.currentPageExams < totalPagesExamm) {
            ExamService.currentPageExams++;
            ExamService.renderExams(ExamService.currentPageExams);
        }
    });

    ExamService.getExams();
});

