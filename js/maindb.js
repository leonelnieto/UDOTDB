//File writes all the charts and tables on index.html
(function(){
    'use strict';
    var dataUrl = 'https://dashboard.udot.utah.gov/resource/rqv9-ry2j.json?entity=Statewide';
    
    var opts = {
        angle: 0, // The span of the gauge arc
        lineWidth: 0.24, // The line thickness
        radiusScale: 1, // Relative radius
        pointer: {
          length: 0.6, // // Relative to gauge radius
          strokeWidth: 0.035, // The thickness
          color: '#000000' // Fill color
        },
        limitMax: false,     // If false, max value increases automatically if value > maxValue
        limitMin: false,     // If true, the min value of the gauge will be fixed
        colorStart: '#6FADCF',   // Colors
        colorStop: '#8FC0DA',    // just experiment with them
        strokeColor: '#E0E0E0',  // to see which ones work best for you
        generateGradient: true,
        highDpiSupport: true,     // High resolution support 
        staticLabels: {
            font: "10px sans-serif",  // Specifies font
            labels: [0, 25, 50, 75, 100],  // Print labels at these values
            color: "#000000",  // Optional: Label text color
            fractionDigits: 0  // Optional: Numerical precision. 0=round off.
          },
        staticZones: [
            {strokeStyle: "#F03E3E", min: 0, max: 50}, // Red from 100 to 130
            {strokeStyle: "#FFDD00", min: 50, max: 85}, // Yellow
            {strokeStyle: "#30B32D", min: 85, max: 100} // Green
        ],
    };
    //Initial Fetch, get current indexes
    fetch(dataUrl).then(function(response){
	    response.json()
	    .then(function(data){
            //Define vars for current indexes
            var currentSafety = parseFloat(data[0].safety);
            var currentMobility = parseFloat(data[0].mobility);
            var currentInfra = parseFloat(data[0].infrastructure);
            var options = {
              useEasing: true,
              useGrouping: true,
              separator: ',',
              decimal: '.',
              suffix: '%'
            };
            var target = document.getElementById('zfGuageChart'); // your canvas element
            var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
            gauge.maxValue = 100; // set max gauge value
            gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
            gauge.animationSpeed = 15; // set animation speed (32 is default value)
            gauge.set(parseFloat(data[0].safety)); // set actual value
            var zfIndex = new CountUp('indexNumZF', 0, parseFloat(data[0].safety), 2, 2, options);
            if (!zfIndex.error) {
                zfIndex.start();
            } else {
              console.error(zfIndex.error);
            }
            target = document.getElementById('omGuageChart'); // your canvas element
            gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
            gauge.maxValue = 100; // set max gauge value
            gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
            gauge.animationSpeed = 15; // set animation speed (32 is default value)
            gauge.set(parseFloat(data[0].mobility)); // set actual value
            var omIndex = new CountUp('indexNumOM', 0, parseFloat(data[0].mobility), 2, 2, options);
            if (!omIndex.error) {
                omIndex.start();
            } else {
              console.error(omIndex.error);
            }
            target = document.getElementById('piGuageChart'); // your canvas element
            gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
            gauge.maxValue = 100; // set max gauge value
            gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
            gauge.animationSpeed = 15; // set animation speed (32 is default value)
            gauge.set(parseFloat(data[0].infrastructure)); // set actual value
            var piIndex = new CountUp('indexNumPI', 0, parseFloat(data[0].infrastructure), 2, 2, options);
            if (!piIndex.error) {
                piIndex.start();
            } else {
              console.error(piIndex.error);
            }
            //Fetch Metadata to see when table was last updated
            fetch("https://udot.data.socrata.com//api/views/metadata/v1/ikvc-y3rj").then(function(response){
                return response.json()
            }).then(function(data){
                var d = new Date(data['updatedAt']);
                document.getElementById('sdindexupdate1').innerHTML = d.toUTCString();
                document.getElementById('sdindexupdate2').innerHTML = d.toUTCString();
                document.getElementById('sdindexupdate3').innerHTML = d.toUTCString();
                var today = new Date();
                var lastYear = today.getFullYear()-1;
                var currentMonth =today.getMonth() +1;
                //fetch data to compare
                dataUrl = "https://dashboard.udot.utah.gov/resource/b8iq-pg44.json?$select=avg(safety),avg(mobility),avg(infrastructure),date_extract_y(index_date)%20as%20year,date_extract_m(index_date)%20as%20month&$group=year,month&$where=year="+lastYear+"%20and%20month="+currentMonth;
                fetch(dataUrl).then(function(response){
                return response.json()
                }).then(function(data){
                    var PrevPerSafety = parseFloat(data[0].avg_safety);
                    var PrevPerMobility = parseFloat(data[0].avg_mobility);
                    var PrevPerInfra = parseFloat(data[0].avg_infrastructure);
                    //Write comparisons onto document
                    document.getElementById('zfCompare').innerHTML = (currentSafety-PrevPerSafety).toFixed(2) +" ("+getPercentageChange(PrevPerSafety,currentSafety)+"%)";
                    if(getPercentageChange(PrevPerSafety,currentSafety) < 0){
                        document.getElementById('compareTxt1').className += " text-danger";
                        document.getElementById('compareIcon1').className = "fas fa-arrow-down";
                    } else {
                        document.getElementById('compareTxt1').className += " text-success";
                        document.getElementById('compareIcon1').className = "fas fa-arrow-up";
                    }
                    document.getElementById('omCompare').innerHTML = (currentMobility-PrevPerMobility).toFixed(2)+" ("+getPercentageChange(PrevPerMobility,currentMobility)+"%)";
                    if(getPercentageChange(PrevPerMobility,currentMobility) < 0){
                        document.getElementById('compareTxt2').className += " text-danger";
                        document.getElementById('compareIcon2').className = "fas fa-arrow-down";
                    } else {
                        document.getElementById('compareTxt2').className += " text-success";
                        document.getElementById('compareIcon2').className = "fas fa-arrow-up";
                    }
                    document.getElementById('piCompare').innerHTML = (currentInfra-PrevPerInfra).toFixed(2) +" ("+getPercentageChange(PrevPerInfra,currentInfra)+"%)";
                    if(getPercentageChange(PrevPerInfra,currentInfra) < 0){
                        document.getElementById('compareTxt3').className += " text-danger";
                        document.getElementById('compareIcon3').className = "fas fa-arrow-down";
                    } else {
                        document.getElementById('compareTxt3').className += " text-success";
                        document.getElementById('compareIcon3').className = "fas fa-arrow-up";
                    }
                }).catch(function(error){
                    console.log("Could not fetch data to compare: "+error)
                });
            }).catch(function(error){
                console.log("Could not fetch dataset metadata: "+error)
            });
	  });
    })
    .catch(function(error) {
        console.log("{^_^} Hello! UDOT we have a problem!"+error)
    });
})();
//Historical Line Chart
(function(){
    'use strict';
    var dataUrl = 'https://dashboard.udot.utah.gov/resource/b8iq-pg44.json?$select=avg(safety),avg(mobility),avg(infrastructure),year&$group=year&$order=year';
    //Fetch me some data
    fetch(dataUrl).then(function(response) {
        return response.json();
    }).then(function(data) {
        var safety = [], mobility = [], infrastructure = [],year = [];
        for(var i = 0; i<data.length;i++){
            safety.push(parseFloat(data[i].avg_safety).toFixed(2));
            mobility.push(parseFloat(data[i].avg_mobility).toFixed(2));
            infrastructure.push(parseFloat(data[i].avg_infrastructure).toFixed(2));
            year.push(parseInt(data[i].year));
        }
        // Set new default font family and font color to mimic Bootstrap's default styling
        Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
        Chart.defaults.global.defaultFontColor = '#292b2c';
        Chart.defaults.global.defaultFontSize = 18;
        // Chart
        var ctx = document.getElementById("IndexHist");
        var dataSafety = {
            label: "Annual Safety Average",
            data: safety,
            lineTension: 0.3,
            borderColor: '#ee7623',
            backgroundColor: 'transparent',
            pointBorderColor: '#5588cc',
            pointBackgroundColor: 'black',
            pointRadius: 5,
            pointHoverRadius: 15,
            pointHitRadius: 30,
            pointBorderWidth: 2,
            pointStyle: 'rect'
          };
        
        var dataMobility = {
            label: "Annual Mobility Average",
            data: mobility,
            lineTension: 0.3,
            borderColor: '#243c84',
            backgroundColor: 'transparent',
            pointBorderColor: '#5588cc',
            pointBackgroundColor: 'black',
            pointRadius: 5,
            pointHoverRadius: 15,
            pointHitRadius: 30,
            pointBorderWidth: 2,
            pointStyle: 'circ'
          };
        var dataInfra = {
            label: "Annual Infrastructure Average",
            data: infrastructure,
            lineTension: 0.3,
            borderColor: '#7f7f7f',
            backgroundColor: 'transparent',
            pointBorderColor: '#5588cc',
            pointBackgroundColor: 'black',
            pointRadius: 5,
            pointHoverRadius: 15,
            pointHitRadius: 30,
            pointBorderWidth: 2,
            pointStyle: 'triangle'
          };
        
        var HistData = {
          labels: year,
          datasets: [dataSafety,dataMobility,dataInfra]
        };
        
        var chartOptions = {
          legend: {
            display: true,
            position: 'top',
            labels: {
              boxWidth: 20,
              fontColor: 'black'
            }
          },
            scales: {
                yAxes: [{
                    ticks: {
                        max: 100,
                        min: 0,
                    }
                }]
            }
        };
        
        var lineChart = new Chart(ctx, {
          type: 'line',
          data: HistData,
          options: chartOptions
        });
        //Fetch Metadata for last updated
        fetch("https://dashboard.udot.utah.gov/api/views/metadata/v1/b8iq-pg44").then(function(response){
                return response.json()
            }).then(function(data){
                var d = new Date(data['updatedAt']);
                document.getElementById('histdataTimeStamp').innerHTML = d.toUTCString();
        }).catch(function(error){
            console.log("Could not fetch dataset metadata: "+error)
        });
        
    }).catch(function(err) {
        console.log("Failed to retrive data: "+err)
    });
})();

function getPercentageChange(y1, y2){
    var dif = ((y2 - y1)/y1)*100;

    return dif.toFixed(2);
}

