(function ($) {
    "use strict";

    // Setup the calendar with the current date
    $(document).ready(function () {
        var date = new Date();
        var today = date.getDate();
        var formattedDate = formatDate(date);

        $(".right-button").click({ date: date }, next_year);
        $(".left-button").click({ date: date }, prev_year);
        $(".month").click({ date: date }, month_click);
        $("#add-button").click({ date: date }, new_event);

        // Set current month as active
        $(".months-row").children().eq(date.getMonth()).addClass("active-month");

        // Initialize the calendar and display today's tasks and exams
        init_calendar(date);
        TaskExamService.displayTasksExams(formattedDate); // Display tasks/exams for today on page load
    });

    function init_calendar(date) {
        $(".tbody").empty();
        $(".events-container").empty();
        var calendar_days = $(".tbody");
        var month = date.getMonth();
        var year = date.getFullYear();
        var day_count = days_in_month(month, year);
        var row = $("<tr class='table-row'></tr>");
        var today = date.getDate();
        date.setDate(1);
        var first_day = date.getDay();

        for (var i = 0; i < 35 + first_day; i++) {
            var day = i - first_day + 1;

            if (i % 7 === 0) {
                calendar_days.append(row);
                row = $("<tr class='table-row'></tr>");
            }

            if (i < first_day || day > day_count) {
                var curr_date = $("<td class='table-date nil'>" + "</td>");
                row.append(curr_date);
            } else {
                var curr_date = $("<td class='table-date'>" + day + "</td>");
                var events = check_events(day, month + 1, year);

                if (today === day && $(".active-date").length === 0) {
                    curr_date.addClass("active-date");
                    show_events(events, months[month], day); // Show today's events
                }

                if (events.length !== 0) {
                    curr_date.addClass("event-date");
                }

                curr_date.click({ events: events, month: months[month], day: day }, date_click);
                row.append(curr_date);
            }
        }

        calendar_days.append(row);
        $(".year").text(year);
    }

    // Get the number of days in a given month/year
    function days_in_month(month, year) {
        var monthStart = new Date(year, month, 1);
        var monthEnd = new Date(year, month + 1, 1);
        return (monthEnd - monthStart) / (1000 * 60 * 60 * 24);
    }

    // Event handler for when a date is clicked
    function date_click(event) {
        $(".events-container").show(250);
        $("#dialog").hide(250);
        $(".active-date").removeClass("active-date");
        $(this).addClass("active-date");

        // Get the selected day, month, and year
        var selectedDay = event.data.day;
        var selectedMonth = months.indexOf(event.data.month) + 1; 
        var selectedYear = $(".year").text(); // Get the current year

        // Format the date as YYYY-MM-DD
        var selectedDate = selectedYear + "-" + (selectedMonth < 10 ? "0" + selectedMonth : selectedMonth) + "-" + (selectedDay < 10 ? "0" + selectedDay : selectedDay);

        // Store the selected date in the hidden input field
        $("#eventdate").val(selectedDate);

        // Show events for the selected date
        TaskExamService.displayTasksExams(selectedDate);
    }

    // Event handler for when a month is clicked
    function month_click(event) {
        $(".events-container").show(250);
        $("#dialog").hide(250);
        var date = event.data.date;
        $(".active-month").removeClass("active-month");
        $(this).addClass("active-month");
        var new_month = $(".month").index(this);
        date.setMonth(new_month);
        init_calendar(date);
    }

    // Event handler for when the year right-button is clicked
    function next_year(event) {
        $("#dialog").hide(250);
        var date = event.data.date;
        var new_year = date.getFullYear() + 1;
        $(".year").text(new_year);
        date.setFullYear(new_year);
        init_calendar(date);
    }

    // Event handler for when the year left-button is clicked
    function prev_year(event) {
        $("#dialog").hide(250);
        var date = event.data.date;
        var new_year = date.getFullYear() - 1;
        $(".year").text(new_year);
        date.setFullYear(new_year);
        init_calendar(date);
    }

    // Function to format date as YYYY-MM-DD
    function formatDate(date) {
        var year = date.getFullYear();
        var month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add leading zero
        var day = date.getDate().toString().padStart(2, '0'); // Add leading zero
        return year + '-' + month + '-' + day;
    }

    // Event handler for clicking the new event button
    function new_event(event) {
        // if a date isn't selected then do nothing
        if ($(".active-date").length === 0)
            return;

        // remove red error input on click
        $("input").click(function () {
            $(this).removeClass("error-input");
        });

        // empty inputs and hide events
        $("#dialog input[type=text]").val('');
        $("#dialog input[type=number]").val('');
        $(".events-container").hide(250);
        $("#dialog").show(250);

        // Event handler for cancel button
        $("#cancel-button").click(function () {
            $("#e-name").removeClass("error-input");
            $("#e-details").removeClass("error-input");
            $("#dialog").hide(250);
            $(".events-container").show(250);
        });

        // Event handler for ok button
        $("#ok-button").unbind().click({ date: event.data.date }, function () {
            var date = event.data.date;
            var name = $("#e-name").val().trim();
            var details = $("#e-details").val().trim();
            var day = parseInt($(".active-date").html());

            // Basic form validation
            if (name.length === 0) {
                $("#e-name").addClass("error-input");
            } else if (details.length === 0) {
                $("#e-details").addClass("error-input");
            } else {
                $("#dialog").hide(250);
                //console.log("new event");
                new_event_json(name, details, date, day);
                date.setDate(day);
                init_calendar(date);
            }
        });
    }


    // Adds a json event to event_data
    function new_event_json(name, details, date, day) {
        var event = {
            "occasion": name,
            "details": details,
            "year": date.getFullYear(),
            "month": date.getMonth() + 1,
            "day": day
        };
        event_data["events"].push(event);
    }




    // Display all events of the selected date in card views
    function show_events(events, month, day) {
        // Clear the events container
        $(".events-container").empty();
        $(".events-container").show(250);
    }

    // Checks if a specific date has any events
    function check_events(day, month, year) {
        var events = [];
        for (var i = 0; i < event_data["events"].length; i++) {
            var event = event_data["events"][i];
            if (event["day"] === day && event["month"] === month && event["year"] === year) {
                events.push(event);
            }
        }
        return events;
    }

    // Given data for events in JSON format
    var event_data = {
        "events": [{
            "occasion": "Repeated Test Event",
            "details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "year": 2020,
            "month": 5,
            "day": 10,
            "cancelled": true
        },
        {
            "occasion": "Test Event",
            "details": "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
            "year": 2020,
            "month": 5,
            "day": 11
        }
        ]
    };

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];

})(jQuery);

function showModalEditEvent(id, type) {

    const modalBox = document.getElementById("edit-box");
    const modaloverlay = document.getElementById("edit-overlay");
    modalBox.style.display = "block";
    modaloverlay.style.display = "block";

    document.getElementById("edit-close").onclick = function() {
        modalBox.style.display = "none";
        modaloverlay.style.display = "none";
    };

    document.getElementById("edit-submit").onclick = function() {
        var selectedDateEvent = $("input[name='eventdate']").val(); 

        console.log("Ja se mogu kliknuti da submitam exam!");
        ExamService.submitExamTaskEditForm(id, type);
        //TaskExamService.displayTasksExams(selectedDateEvent);
        modalBox.style.display = "none";
        modaloverlay.style.display = "none";
    };
}
