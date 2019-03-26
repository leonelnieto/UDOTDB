fetch(
  "https://maps.udot.utah.gov/wadocuments/Data/EmpDev/course_schedule_data.json"
)
  .then(function(response) {
    return response.json();
  })
  .then(function(j) {
    console.log(j[1]["description"]);
    var calendarEl = document.getElementById("calendar");
    var calendar = new FullCalendar.Calendar(calendarEl, {
      header: { center: "dayGridMonth,timeGridWeek" },
      plugins: ["dayGrid", "timeGrid", "list"],
      timeZone: "UTC",
      classNames:["fc-event"],
      events: j,
      eventClick: function(info) {
        var eventObj = info.event;
          //alert('Clicked ' + eventObj.title);
          for(var i = 0;i<j.length;i++){
            if(j[i]["id"] === eventObj.id){
              $("#desc").html(j[i]["description"])
              var d = new Date(j[i]["start"])
              $("#start").html(d);
              d = new Date(j[i]["end"]);
              $("#end").html(d);
            }
            continue;
          }
          $('#exampleModal').modal('show')
          $("#modalLabel").html(eventObj.title)
      }
    });

    calendar.render();
  });
