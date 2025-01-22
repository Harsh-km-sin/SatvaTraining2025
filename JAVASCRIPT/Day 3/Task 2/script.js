document.addEventListener("DOMContentLoaded", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: "dayGridMonth",
    dateClick: function (info) {
      // Open the modal for adding a new event
      var selectedDate = info.dateStr;
      document.getElementById("eventDateFrom").value = selectedDate;
      document.getElementById("eventTimeFrom").value = "12:00"; // Default to 12:00 PM
      document.getElementById("eventDateTo").value = selectedDate; // Default end date same as start date
      document.getElementById("eventTimeTo").value = "12:30"; // Default to 12:30 PM
      document.getElementById("eventTitle").value = ""; // Clear previous event title
      document.getElementById("saveEventBtn").style.display = "block"; // Show save button
      document.getElementById("deleteEventBtn").style.display = "none"; // Hide delete button
      var modal = new bootstrap.Modal(document.getElementById("eventModal"));
      modal.show();
    },
    eventClick: function (info) {
      // Open the modal for editing an existing event
      var event = info.event;
      var start = event.start;
      var end = event.end;

      document.getElementById("eventDateFrom").value = start.toISOString().split('T')[0]; // Get date part
      document.getElementById("eventTimeFrom").value = start.toISOString().split('T')[1].slice(0, 5); // Get time part (HH:MM)
      
      document.getElementById("eventDateTo").value = end.toISOString().split('T')[0]; // Get end date
      document.getElementById("eventTimeTo").value = end.toISOString().split('T')[1].slice(0, 5); // Get end time

      document.getElementById("eventTitle").value = event.title;
      document.getElementById("saveEventBtn").style.display = "block"; // Show save button
      document.getElementById("deleteEventBtn").style.display = "block"; // Show delete button

      // Store the current event object for potential deletion
      document.getElementById("deleteEventBtn").onclick = function () {
        event.remove(); // Remove event from the calendar
        var modal = bootstrap.Modal.getInstance(
          document.getElementById("eventModal")
        );
        modal.hide(); // Close the modal
      };

      // Show the modal for editing
      var modal = new bootstrap.Modal(document.getElementById("eventModal"));
      modal.show();

      // Save updated event details when clicked
      document.getElementById("saveEventBtn").onclick = function () {
        event.setProp("title", document.getElementById("eventTitle").value); // Update title
        
        var eventDateFrom = document.getElementById("eventDateFrom").value;
        var eventTimeFrom = document.getElementById("eventTimeFrom").value;
        var eventDateTo = document.getElementById("eventDateTo").value;
        var eventTimeTo = document.getElementById("eventTimeTo").value;

        var newStart = new Date(eventDateFrom + "T" + eventTimeFrom); // Combine start date and time
        var newEnd = new Date(eventDateTo + "T" + eventTimeTo); // Combine end date and time
        
        event.setStart(newStart); // Update start time
        event.setEnd(newEnd); // Update end time

        var modal = bootstrap.Modal.getInstance(
          document.getElementById("eventModal")
        );
        modal.hide(); // Close the modal
      };
    },
  });
  calendar.render();

  // Handle the creation of new events
  document
    .getElementById("saveEventBtn")
    .addEventListener("click", function () {
      var eventTitle = document.getElementById("eventTitle").value;
      var eventDateFrom = document.getElementById("eventDateFrom").value;
      var eventTimeFrom = document.getElementById("eventTimeFrom").value;
      var eventDateTo = document.getElementById("eventDateTo").value;
      var eventTimeTo = document.getElementById("eventTimeTo").value;

      if (eventTitle && eventDateFrom && eventTimeFrom && eventDateTo && eventTimeTo) {
        // Combine date and time to create valid start and end dates
        var eventStart = new Date(eventDateFrom + "T" + eventTimeFrom);
        var eventEnd = new Date(eventDateTo + "T" + eventTimeTo);

        // Add new event to the calendar
        calendar.addEvent({
          title: eventTitle,
          start: eventStart, // Set the start date with time
          end: eventEnd, // Set the end date with time
        });

        // Close the modal and clear the form
        var modal = bootstrap.Modal.getInstance(
          document.getElementById("eventModal")
        );
        modal.hide();
        document.getElementById("eventTitle").value = ""; // Clear input fields
        document.getElementById("eventDateFrom").value = "";
        document.getElementById("eventTimeFrom").value = "12:00"; // Reset start time input
        document.getElementById("eventDateTo").value = "";
        document.getElementById("eventTimeTo").value = "12:30"; // Reset end time input
      } else {
        alert("Please fill in all event details!");
      }
    });

  // Adding functionality for Day, Week, and Month buttons
  document.getElementById("dayBtn").addEventListener("click", function () {
    calendar.changeView("timeGridDay"); // Change to Day view with time grid
  });

  document.getElementById("weekBtn").addEventListener("click", function () {
    calendar.changeView("timeGridWeek"); // Change to Week view with time grid
  });

  document.getElementById("monthBtn").addEventListener("click", function () {
    calendar.changeView("dayGridMonth"); // Change to Month view
  });
});
f