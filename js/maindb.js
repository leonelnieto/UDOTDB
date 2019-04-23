//File writes all the charts and tables on index.html
//Chart Plugins
//Plug ins
Chart.plugins.register({
    afterDraw: function(chartInstance) {
      if (chartInstance.config.options.showDatapoints) {
        var helpers = Chart.helpers;
        var ctx = chartInstance.chart.ctx;
        var fontColor = helpers.getValueOrDefault(chartInstance.config.options.showDatapoints.fontColor, chartInstance.config.options.defaultFontColor);
  
        // render the value of the chart above the bar
        ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, 'normal', Chart.defaults.global.defaultFontFamily);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillStyle = fontColor;
  
        chartInstance.data.datasets.forEach(function (dataset) {
          for (var i = 0; i < dataset.data.length; i++) {
            var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
            var scaleMax = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._yScale.maxHeight;
            var yPos = (scaleMax - model.y) / scaleMax >= 0.93 ? model.y + 20 : model.y - 5;
            ctx.fillText(dataset.data[i], model.x, yPos);
          }
        });
      }
    }
});
  Chart.pluginService.register({
    beforeDraw: function (chart) {
      if (chart.config.options.elements.center) {
        //Get ctx from string
        var ctx = chart.chart.ctx;
        //Get options from the center object in options
        var centerConfig = chart.config.options.elements.center;
        var fontStyle = centerConfig.fontStyle || 'proxima-nova';
        var txt = centerConfig.text;
        var color = centerConfig.color || '#000';
        var sidePadding = centerConfig.sidePadding || 20;
        var sidePaddingCalculated = (sidePadding/100) * (chart.innerRadius * 2)
        //Start with a base font of 30px
        ctx.font = "30px " + fontStyle;
        //Get the width of the string and also the width of the element minus 10 to give it 5px side padding
        var stringWidth = ctx.measureText(txt).width;
        var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;
        // Find out how much the font can grow in width.
        var widthRatio = elementWidth / stringWidth;
        var newFontSize = Math.floor(30 * widthRatio);
        var elementHeight = (chart.innerRadius * 2);
        // Pick a new font size so it will not be larger than the height of label.
        var fontSizeToUse = Math.min(newFontSize, elementHeight);
        //Set font settings to draw it correctly.
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
        var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
        ctx.font = fontSizeToUse+"px " + fontStyle;
        ctx.fillStyle = color;
        //Draw text in center
        ctx.fillText(txt, centerX, centerY);
      }
    }
});
//Main Chart Draw
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
                var d = new Date(data['dataUpdatedAt']);
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
//KPI Charts
(function(){
    url = "https://dashboard.udot.utah.gov/resource/rqv9-ry2j.json?entity=Statewide";
    fetch(url).then(function(response){
      return response.json();
    }).then(function(j){
      var chartOptions = {scales: {xAxes: [{ stacked: true }],yAxes: [{ stacked: true }]},responsive: true,animation: {duration: 3000, animateScale: true,animateRotate: true,easing:'easeOutCirc'},maintainAspectRatio: false,legend: {position: 'bottom',labels: {boxWidth: 20}},}
      //Draw First Chart for PI
      var targetMet = [parseFloat(j[0]["atms"]),parseFloat(j[0]["bridges"]),parseFloat(j[0]["pavement"]),parseFloat(j[0]["signals"])];
      var targetRem = [100 - parseFloat(j[0]["atms"]),100 - parseFloat(j[0]["bridges"]),100 - parseFloat(j[0]["pavement"]),100 - parseFloat(j[0]["signals"])];
      var kpiChartData = {
        labels: ["ATMS: 9%","Bridges: 38%","Pavmts: 36%","Signals: 17%"],
        datasets: [
          {label: 'Target Met',
           data:targetMet,
           backgroundColor:'#5b87c6'},
          {label: 'Target Remaining',
           data:targetRem,
           backgroundColor:'#eb7523'}
        ]
      }
      var KPIChart = document.getElementById('piKPIChart');
      new Chart(KPIChart,{
        type: 'bar',
        data:kpiChartData,
        options: chartOptions
      });
      //Draw Second Chart for OM
      targetMet = [parseFloat(j[0]["delay"]),parseFloat(j[0]["reliability"]),parseFloat(j[0]["mode_split"]),parseFloat(j[0]["snow"])];
      targetRem = [100 - parseFloat(j[0]["delay"]), 100 - parseFloat(j[0]["reliability"]), 100 - parseFloat(j[0]["mode_split"]),100 - parseFloat(j[0]["snow"])];
      kpiChartData = {
          labels: ["I15 Delay: 30%","I15 Relia: 35%","Mode Split: 11%","Snow Rem: 24%"],
          datasets: [
            {label: 'Target Met',
             data:targetMet,
             backgroundColor:'#5b87c6'},
            {label: 'Target Remaining',
             data:targetRem,
             backgroundColor:'#eb7523'}
          ]
        }
      KPIChart = document.getElementById('omKPIChart');
      new Chart(KPIChart,{
        type: 'bar',
        data:kpiChartData,
        options: chartOptions
      });
      //Draw Third Chart for ZF
      targetMet = [parseFloat(j[0]["ed_index"]),parseFloat(j[0]["if_index"]),parseFloat(j[0]["ii_index"]),parseFloat(j[0]["tc_index"]),parseFloat(j[0]["tf_index"]),parseFloat(j[0]["tsi_index"])];
      targetRem = [100 - parseFloat(j[0]["ed_index"]), 100 - parseFloat(j[0]["if_index"]), 100 - parseFloat(j[0]["ii_index"]),100 - parseFloat(j[0]["tc_index"]),100 - parseFloat(j[0]["tf_index"]),100 - parseFloat(j[0]["tsi_index"])];
      kpiChartData = {
          labels: ["Equip Dam: 5%","UDOT Fatlt: 28%","Emp Injrs: 10%","Traf Cras: 8%","Traf Fatlt: 29%","Traf Injrs: 20%"],
          datasets: [
            {label: 'Target Met',
             data:targetMet,
             backgroundColor:'#5b87c6'},
            {label: 'Target Remaining',
             data:targetRem,
             backgroundColor:'#eb7523'}
          ]
        }
        KPIChart = document.getElementById('zfKPIChart');
        new Chart(KPIChart,{
        type: 'bar',
        data:kpiChartData,
        options: chartOptions
      });
    }).catch(function(err){
      console.log("(*_*) if you see me there is the KPI Chart Data Fetch..."+err);
    });
})();
//Historical Line Chart
function histLineChart(){
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
}
//Helper function
function getPercentageChange(y1, y2){
    var dif = ((y2 - y1)/y1)*100;

    return dif.toFixed(2);
}

