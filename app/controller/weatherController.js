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
        }, function(response){
            console.log(response);
        });
        
       var getWeatherData=new GetWeatherData(data);
        getWeatherData.get(function(result,responseHeader){
            console.log(result);
        },function(response){
            console.log('error');
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

         $scope.getCurrentWeather = function(){
            console.log("getCurrentWeather called!!!");
            var url = 'http://api.openweathermap.org/data/2.5/weather?q='+$scope.city+'&mode=json&appid='+apiId+'&units=metric';
            console.log("URL= " +url);
             weatherService.getJsonFromAPI(url).then(function(response){
                 $scope.currentTemp = response.main.temp;
            }, function(response){
                 $scope.currentTemp = response.main.temp;
                //console.log(response.main.temp);
            });
        }
        $scope.getForecastDetials = function(){
            console.log("getForecastDetials called!!!");
            var url = 'http://api.openweathermap.org/data/2.5/forecast?lat='+data.lat+'&lon='+data.lon+'&mode=json&appid='+apiId+'&units=metric';
            
            weatherService.getJsonFromAPI(url).then(function(response){
                $scope.forecastList = response.list;
				count = 0;
                if($scope.forecastList.length > 0){
					
                    angular.forEach($scope.forecastList,function(value,index){
											
                        $scope.forecastList[index].degree = value.main.temp;
                        $scope.forecastList[index].weatherIcon = "http://openweathermap.org/img/w/" + value.weather[0].icon + ".png";
                        $scope.forecastList[index].time = value.dt_txt;
						$scope.forecastList[index].cond = value.weather[0].main + ' ( ' + value.weather[0].description + ' )';
						//alert($scope.forecastList[index].weatherIcon);
                       count++;
                    })
					//alert(count);
                }
				
                //$scope.weatherCond = response.main.temp;
            }, function(response){
                
            });
        }
}])
