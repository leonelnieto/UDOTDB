document.addEventListener("DOMContentLoaded", function() {
  var calendarEl = document.getElementById("calendar");
  fetch("../../Data/EmpDev/course_schedule_data.json")
    .then(function(response) {
      // Convert to JSON
      return response.json();
    })
    .then(function(j) {
      // Yay, `j` is a JavaScript object
      console.log(j);
    });
  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ["dayGrid"],
    timeZone: "UTC",
    events: [
      {
        id: "a",
        title: "my event",
        start: "2019-03-25T06:30:00",
        end: "2019-03-25",
        allDay: false,
        url: "#",
        editable: false
      }
    ]
  });

  calendar.render();
});
