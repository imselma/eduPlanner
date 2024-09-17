var TaskService = {

    tasksArray: [],
    selectedEventType: '',
    currentPageTasks: 1,  
    itemsPerPageTasks: 4, 

    //Add logic
    addTask: function (entityTask, eventDate) {
        $.ajax({
            url: Constants.get_api_base_url() + "addTask",
            type: "POST",
            data: JSON.stringify(entityTask),
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
                $("input[name='eventtype']").val('');
                showAlert2("Task saved successfully!");

                TaskExamService.displayTasksExams(eventDate);
                TaskService.getTasks();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                showAlert2("Failed to save the task: " + XMLHttpRequest.responseText);
            }
        });
    },

    //Delete Task
    deleteTask: function(taskId) {
        $.ajax({
            url: Constants.get_api_base_url() + "deleteTask/" + taskId,
            type: "DELETE",
            beforeSend: function(xhr) {
                if (localStorage.getItem('current_user')) {
                    xhr.setRequestHeader("Authentication", localStorage.getItem('token'));
                }
            },
            success: function(result) {
                var selectedDate = $("input[name='eventdate']").val(); 
                TaskService.getTasks();
                TaskExamService.displayTasksExams(selectedDate); 
            }
            ,
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                showAlert2("Failed to delete the task: " + XMLHttpRequest.responseText);
            }
        });
    },

    //Display tasks by specific user
    getTasks: function () {
        $.ajax({
            url: Constants.get_api_base_url() + "getTaskByUserId",
            type: "GET",
            contentType: "application/json",
            dataType: "json",
            beforeSend: function(xhr) {
                if(localStorage.getItem('current_user')){
                xhr.setRequestHeader("Authentication", localStorage.getItem('token'));
                }
            },
            success: function (result) {
                console.log("Success! Data received:", result);

                TaskService.tasksArray = result.result;
                TaskService.renderTasks(TaskService.currentPageTasks);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("Failed to retrieve tasks: " + XMLHttpRequest.responseText);
              }
        });
    },

    setItemsPerPageTask: function() {
        var width = window.innerWidth;
        if (width <= 800) {
            TaskService.setItemsPerPageTasks = 1; 
        } else {
            TaskService.setItemsPerPageTasks = 4; 
        }
    },

    renderTasks: function(page) {
      
        TaskService.setItemsPerPageTask(); 

        var deadlineContainer = $("#deadline-container");
        deadlineContainer.empty();

        var startIndexTask = (page - 1) * TaskService.setItemsPerPageTasks;
        var endIndexTask = startIndexTask + TaskService.setItemsPerPageTasks;

        var tasksToDisplay = TaskService.tasksArray.slice(startIndexTask, endIndexTask);

        if (tasksToDisplay.length === 0) {
            var eventCard = $("<div class='custom-card' style='height: 10rem; align-items: center; display:flex;'></div>");
            var eventName = $("<div class='custom-title'>There are no tasks planned.</div>");
            eventCard.css({ "border-left": "10px solid black" });
            eventCard.append(eventName);
            deadlineContainer.append(eventCard);
        } else {
         
            tasksToDisplay.forEach(function(task) {
                var eventCard = $("<div class='custom-card' id='exam-card-" + task.id + "' style='position: relative;'></div>");
                var eventName = $("<div class='custom-title'>Task: " + task.task_name + "</div>");
                var eventDetails = $("<div class='custom-details'>Location: " + task.task_description + "</div>");
                var eventDate = $("<div class='custom-details'>Date: " + task.task_date + "</div>");
                var eventTime = $("<div class='custom-details'>Time: " + task.task_time + " h</div>");
                var buttonContainer = $("<div class='button-container' style='position: absolute; bottom: 10px; right: 10px; display: flex; gap: 10px;'></div>");
                var deleteButton = $("<button class='delete-delete-btn' style='background: none; border: none; cursor: pointer;'></button>").append("<i class='fa fa-trash' style='color: black; font-size: 20px;'></i>");
                deleteButton.on('click', function() {
                    showModalDeleteEvent("Are you sure you want to delete this task?", task.id, 'Task');
                });

                buttonContainer.append(deleteButton);
                eventCard.append(eventName).append(eventDetails).append(eventDate).append(eventTime).append(buttonContainer);
                deadlineContainer.append(eventCard);
            });
        }

        TaskService.updatePaginationControlsTask();
    },

    
    updatePaginationControlsTask: function() {
        var totalPagesTask = Math.ceil(TaskService.tasksArray.length / TaskService.itemsPerPageTasks);
        $("#page-info-task").text("Page " + TaskService.currentPageTasks + " of " + totalPagesTask);

        $("#prev-page-task").prop("disabled", TaskService.currentPageTasks === 1);
        $("#next-page-task").prop("disabled", TaskService.currentPageTasks === totalPagesTask);
    },

    //EDIT TASK
    editTask: function(entity, taskId) {
        $.ajax({
            url: Constants.get_api_base_url() + "editTask/" + taskId,
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
                console.log(result);
                //TaskService.getTasks();
                TaskExamService.displayTasksExams(result.task_date);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
              alert("Failed to edit the task: " + XMLHttpRequest.responseText);
            }
        });
    }

};

$(document).ready(function() {
    $("#prev-page-task").on('click', function() {
        TaskService.getTasks();
        if (TaskService.currentPageTasks > 1) {
            TaskService.currentPageTasks--;
            TaskService.renderTasks(TaskService.currentPageTasks);
        }
    });

    $("#next-page-task").on('click', function() {
        TaskService.getTasks();
        var totalPagesTaskk = Math.ceil(TaskService.tasksArray.length / TaskService.itemsPerPageTasks);
        if (TaskService.currentPageTasks < totalPagesTaskk) {
            TaskService.currentPageTasks++;
            TaskService.renderTasks(TaskService.currentPageTasks);
        }
    });

});


