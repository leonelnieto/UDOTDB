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
      header: { center: "dayGridMonth,timeGridWeek" },
      plugins: ["dayGrid", "timeGrid", "list"],
      timeZone: "UTC",
      eventRender: function(info) {
        var tooltip = new Tooltip(info.el, {
          title: info.event.extendedProps.description,
          placement: "top",
          trigger: "hover",
          container: "body"
        });
      },
      events: j
    });

    calendar.render();
  });
