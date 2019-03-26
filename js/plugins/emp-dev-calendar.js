fetch(
  "https://leonelnieto.github.io/UDOTDB/Data/EmpDev/course_schedule_data.json"
)
  .then(function(response) {
    return response.json();
  })
  .then(function(j) {
    console.log(j);
    var calendarEl = document.getElementById("calendar");
    var calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: ["dayGrid"],
      timeZone: "UTC",
      events: j
    });

    calendar.render();
  });
