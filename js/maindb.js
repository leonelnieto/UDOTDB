(function(){
    'use strict';
    var dataUrl = 'https://dashboard.udot.utah.gov/resource/rqv9-ry2j.json?entity=Statewide';
    fetch(dataUrl).then(function(response){
	    response.json()
	    .then(function(data){
            var options = {
              useEasing: true,
              useGrouping: true,
              separator: ',',
              decimal: '.',
              suffix: '%'
            };
            var zfIndex = new CountUp('indexNumZF', 0, parseFloat(data[0].safety), 2, 2, options);
            if (!zfIndex.error) {
                zfIndex.start();
            } else {
              console.error(zfIndex.error);
            }
            var piIndex = new CountUp('indexNumPI', 0, parseFloat(data[0].mobility), 2, 2, options);
            if (!piIndex.error) {
                piIndex.start();
            } else {
              console.error(piIndex.error);
            }
            var omIndex = new CountUp('indexNumOM', 0, parseFloat(data[0].infrastructure), 2, 2, options);
            if (!omIndex.error) {
                omIndex.start();
            } else {
              console.error(omIndex.error);
            }
	  });
    })
    .catch(function(error) {
        console.log("{^_^} Hello! UDOT we have a problem!"+error)
    });
})();