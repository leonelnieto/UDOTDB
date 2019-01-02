//Javascript file for traffic and safety dashboard
crashStatistics(null,'quarter');
function crashStatistics(region,period){
    var prd = formatDate(period);
    var dataUrl = 'https://dashboard.udot.utah.gov/resource/eecv-i83h.json';
    var select = '';
    if(!region) {
        var select = "?$select=crash_date,count(crash_id),sum(total_fatalities),sum(total_serious_injuries)&$group=crash_date&$where=crash_date>='"+prd+"'";
    } else {
        var select = "?$select=region_name,crash_date,count(crash_id),sum(total_fatalities),sum(total_serious_injuries)&$group=region_name,crash_date&$where=crash_date>='"+prd+"'and region_name="+region;
    }
    fetch(dataUrl+select).then(function(response) { 
	    return response.json();
    }).then(function(j) {
        var options = {
              useEasing: true,
              useGrouping: true,
              separator: ',',
              decimal: '.',
            };
        var crashes = 0,fatalities = 0,injuries = 0;
        for(var i=0;i<j.length;i++){
            crashes += parseInt(j[i].count_crash_id);
            fatalities += parseInt(j[i].sum_total_fatalities);
            injuries += parseInt(j[i].sum_total_serious_injuries);
        }
        var crashesActual = new CountUp('crashesActual', 0, crashes, 0, 2.5, options);
        if (!crashesActual.error) {
            crashesActual.start();
        } else {
          console.error(crashesActual.error);
        }
        var injuriesActual = new CountUp('injuriesActual', 0, injuries, 0, 2.5, options);
        if (!injuriesActual.error) {
            injuriesActual.start();
        } else {
          console.error(injuriesActual.error);
        }
        var fatalitiesActual = new CountUp('fatalitiesActual', 0, fatalities, 0, 2.5, options);
        if (!fatalitiesActual.error) {
            fatalitiesActual.start();
        } else {
          console.error(fatalitiesActual.error);
        }
        //Fetch comparsion for previous period
        console.log(backDatePreviousPeriod(period));
        console.log(prd);
        var filterDate = ''
        if(!region){
            select = "?$select=region_name,count(crash_id),sum(total_fatalities),sum(total_serious_injuries)&$group=region_name&$where=crash_date>= and crash_date<='"+filterDate;
        }else {
            select = "?$select=count(crash_id),sum(total_fatalities),sum(total_serious_injuries)&$where=crash_date>= and crash_date<='"+filterDate;
        }
        // fetch(dataUrl+select).then(function(response) { 
        //     return response.json();
        // }).then(function(j) {
        //     console.log(j);
        //     //Get daily, weekly, monthly, quaterly and yearly avarages for statewide and each region
            
        // }); 
    });
}

//Helper functions
// Format Date function recieves period input in for of today, week, month, quarter and year and returns date as 'yyyy-mm-dd'
function formatDate(period) {
	var d = new Date();
	switch (period) {
    case 'today':
        var month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        prd = [year, month, day].join('-');
        break;
    case 'week':
        d.setDate(d.getDate() - 7);
        var month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        prd = [year, month, day].join('-');
        break;
    case 'month':
    	d.setDate(1);
        var month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        prd = [year, month, day].join('-');
        break;
    case 'quarter':
    	d.setMonth(quarterBegin(d)-1);
    	d.setDate(1);
        var month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        prd = [year, month, day].join('-');
        break;
    case 'year':
        d.setMonth(0);
    	d.setDate(1);
        var month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        prd = [year, month, day].join('-');
        break;
    }
    return prd;
}
//Helper function to get month when quarter begins
function quarterBegin() {
	var date = new Date();
    var month = date.getMonth() + 1;
    if((Math.ceil(month / 3)) == 1){
    	return 1;
    }else if((Math.ceil(month / 3)) == 2) {
    	return 4;
    }else if((Math.ceil(month / 3)) == 3) {
    	return 7;
    } else {
    	return 10;
    }
}
//Function to get back date in years
function backDateTodayTo(years){
    var d = new Date();
    var pastYear = d.getFullYear() - years;
    d.setFullYear(pastYear);
    var month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    var backdate = [year, month, day].join('-');
    return backdate;
}
//Helper function to back date to previous period
function backDatePreviousPeriod(period){
    var d = new Date(formatDate(period));
	switch (period) {
    case 'today':
        var month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        prd = [year, month, day].join('-');
        break;
    case 'week':
        d.setDate(d.getDate() - 7);
        var month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        prd = [year, month, day].join('-');
        break;
    case 'month':
    	d.setDate(1);
        var month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        prd = [year, month, day].join('-');
        break;
    case 'quarter':
    	d.setMonth(quarterBegin(d)-1);
    	d.setDate(1);
        var month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        prd = [year, month, day].join('-');
        break;
    case 'year':
        d.setMonth(0);
    	d.setDate(1);
        var month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        prd = [year, month, day].join('-');
        break;
    }
    return prd;
}