app.controller('weatherController', ['$http', '$scope', 'weatherService', 'weatherFactory','GetWeatherData','$filter',

    function($http, $scope, weatherService, weatherFactory,GetWeatherData,$filter){
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
        
        $scope.getJson = function(){
                 data.url = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + data.lat +
                '&lon='+ data.lon +
                '&appid=084c66197563211ec73423a8f2b503fc';
            var getWeatherData=new GetWeatherData(data);
            getWeatherData.get(function(result,responseHeader){
                console.log(result);
            },function(response){
                console.log('error');
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
                console.log(response.list);
                $scope.forecastList = response.list;
				count = 0;
                if($scope.forecastList.length > 0){
					
                    angular.forEach($scope.forecastList,function(value,index){
						$scope.forecastList[index].maxTemp = value.main.temp_max;
                        $scope.forecastList[index].minTemp = value.main.temp_min;
                        $scope.forecastList[index].degree = value.main.temp;
                        $scope.forecastList[index].weatherIcon = "http://openweathermap.org/img/w/" + value.weather[0].icon + ".png";
                        $scope.forecastList[index].time = $filter('date')(new Date(value.dt_txt),'yyyy-MM-dd');
						$scope.forecastList[index].cond = value.weather[0].main + ' ( ' + value.weather[0].description + ' )';
						//alert($scope.forecastList[index].weatherIcon);
                       count++;
                    });
                    $scope.filteredList= $scope.filterWeatherData($scope.forecastList);
                    console.log("Filetered List !!!");
                    console.log($scope.filteredList);
                    $scope.todayData={};
                    $scope. todayData = $scope.filteredList.splice(0,1);
                    //$scope.filteredList.splice(1,$scope.filteredList.length);
                    console.log($scope.todayData);
                    //console.log($scope.remainingData);
					//alert(count);
                }
				
                //$scope.weatherCond = response.main.temp;
            }, function(response){
                
            });
        };
        
         $scope.filterWeatherData = function (temperatureData) {
           // var temperatureData = weatherData.degree;
            var localData = {
                date: "",
                maxTemp: 0.0,
                minTemp: 1000,
                description: "",
                weatherIcon: "",
                degree:""
            };
            var returnTemperatureData = [];
            var localDate = $filter('date')(new Date(), 'yyyy-MM-dd');
            console.log(localDate);
            localData.time = "Today";
             localData.degree= temperatureData[0].degree;
            localData.cond = temperatureData[0].cond;
            localData.weatherIcon = temperatureData[0].weatherIcon;
            for (var i = 0; i < temperatureData.length; i++) {
                var eachData = temperatureData[i];
                if (localDate == eachData.time) {
                    if (localData.maxTemp < eachData.maxTemp) {
                        localData.maxTemp = eachData.maxTemp;
                    }
                    if (localData.minTemp > eachData.minTemp) {
                        localData.minTemp = eachData.minTemp;
                    }
                } else {
                    var localDataCopy=angular.copy(localData);
                    returnTemperatureData.push(localDataCopy);
                    localData.time = eachData.time;
                    localData.maxTemp = eachData.maxTemp;
                    localData.minTemp = eachData.minTemp;
                    localData.cond = eachData.cond;
                    localData.weatherIcon = eachData.weatherIcon;
                    localData.degree = eachData.degree;
                }
                localDate = eachData.time;
            }
            return returnTemperatureData;
        };
}])
