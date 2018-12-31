//Javascript file for traffic and safety dashboard
crashStatistics(null,'week');
function crashStatistics(region,period){
    var prd = formatDate(period);
    var dataUrl = 'https://dashboard.udot.utah.gov/resource/eecv-i83h.json';
    if(!region) {
        var select = "?$select=crash_date,count(crash_id),sum(total_fatalities),sum(total_serious_injuries)&$group=crash_date&$where=crash_date>='"+prd+"'";
    } else {
        var select = "?$select=region_name,crash_date,count(crash_id),sum(total_fatalities),sum(total_serious_injuries)&$group=region_name,crash_date&$where=crash_date>='"+prd+"'and region_name="+region;
    }
    fetch(dataUrl+select).then(function(response) { 
	    return response.json();
    }).then(function(j) {
        console.log(j); 
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