app.controller('weatherController', ['$http', '$scope', 'weatherService', 'weatherFactory',

    function($http, $scope, weatherService, weatherFactory){
        var apiId = '084c66197563211ec73423a8f2b503fc';
        var data = {};
        weatherService.getCurrentPosition().then(function(response){
            console.log(response);
            var lat = response.coords.latitude;
            var lon = response.coords.longitude;
            data={"lat":lat,"lon":lon};
            $scope.location = data;
            console.log(data.lat);
            
            //var getWeatherData=new GetWeatherData(data);
        /*getWeatherData.get(function(result,responseHeader){
            console.log(result);
        },function(response){
            console.log('error');
        });*/
                /*weatherService.getJson(lat, lon).then(
                    function(response){
                        $scope.data = response;
                        console.log(response);
                        $scope.weatherData = weatherFactory.getWeatherData(response);
                        $scope.filteredData = weatherService.filterWeatherData($scope.weatherData);

                        console.log($scope.weatherData);
                        console.log($scope.filteredData);
                        console.log($scope.position);

                    }, function(response){
                        $scope.data = response;
                    }
                );*/



        }, function(response){
            console.log(response);
        });
        
        $scope.getJson = function(){
            console.log("getJSon called!!!");
            var url = 'http://api.openweathermap.org/data/2.5/forecast?lat='+data.lat+'&lon='+data.lon+'&mode=json&appid='+apiId;
            
            weatherService.getJsonFromAPI(url).then(function(response){
                console.log(response);
            }, function(response){
                console.log(response);
            });
        }



}])
