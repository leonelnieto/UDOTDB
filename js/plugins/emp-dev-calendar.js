fetch(
  "http://maps.udot.utah.gov/wadocuments/Data/EmpDev/course_schedule_data.json"
)
  .then(function(response) {
    return response.json();
  })
  .then(function(j) {
    console.log(j);
    var calendarEl = document.getElementById("calendar");
    var calendar = new FullCalendar.Calendar(calendarEl, {
      header: { center: "dayGridMonth,timeGridWeek" },
      plugins: ["dayGrid", "timeGrid", "list"],
      timeZone: "UTC",
      classNames:["fc-event"],
      events: j
    });

    calendar.render();
  });
