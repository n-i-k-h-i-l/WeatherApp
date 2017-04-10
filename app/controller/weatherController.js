app.controller('weatherController', ['$http', '$scope', 'weatherService', 'weatherFactory',

    function($http, $scope, weatherService, weatherFactory, GetWeatherData){

        weatherService.getCurrentPosition().then(function(response){
            console.log(response);
            var lat = response.coords.latitude;
            var lon = response.coords.longitude;
        var data={"lat":lat,"lon":lon};
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
        
        
        
       




}])
