app.service('weatherService', ['$http', '$q','$filter', '$window',function($http, $q, $filter, $window){

    this.getCurrentPosition = function() {
        var deferred = $q.defer();

        if (!$window.navigator.geolocation) {
            deferred.reject('Geolocation not supported.');
        } else {
            $window.navigator.geolocation.getCurrentPosition(
                function (position) {
                    deferred.resolve(position);
                },
                function (err) {
                    deferred.reject(err);
                });
        }
        return deferred.promise;
    }
    
    this.getJsonFromAPI = function(url){
        var deferred = $q.defer();
        console.log('url: '+url);
        $http.get(url)
            .then(function (response) {
                deferred.resolve(response.data);
            }, function (response) {
               deferred.reject({ error: true, message: 'Error: ' + response.data.message });
            });
        return deferred.promise;
    }

    this.filterWeatherData = function (weatherData) {
            var temperatureData = weatherData.temperature;
            var localData = {
                date: "",
                maxTemp: 0.0,
                minTemp: 1000,
                description: ""
            };
            var returnTemperatureData = [];
            var localDate = $filter('date')(new Date(), 'yyyy-MM-dd');
            console.log(localDate);
            localData.date = "Today";
            localData.description = temperatureData[0].desc;
            for (var i = 0; i < temperatureData.length; i++) {
                var eachData = temperatureData[i];
                if (localDate == eachData.date) {
                    if (localData.maxTemp < eachData.maxTemp) {
                        localData.maxTemp = eachData.maxTemp;
                    }
                    if (localData.minTemp > eachData.minTemp) {
                        localData.minTemp = eachData.minTemp;
                    }
                } else {
                    var localDataCopy=angular.copy(localData);
                    returnTemperatureData.push(localDataCopy);
                    localData.date  = eachData.date;
                    localData.maxTemp = eachData.maxTemp;
                    localData.minTemp = eachData.minTemp;
                    localData.description = eachData.desc;
                }
                localDate = eachData.date;
            }
            return returnTemperatureData;
        };

    
    
}]);

