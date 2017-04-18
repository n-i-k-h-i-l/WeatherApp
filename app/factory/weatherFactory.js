app.factory('weatherFactory', ['$filter', function($filter){
    var factoryObject = {
        city:"",
        temp:[]
    };

    this.getWeatherData = function(data){
        factoryObject.city = data.city.name;
        var objectArray = data.list;
        for(var index=0; index<objectArray.length; index++){
            var eachObject = objectArray[index];
            var tempObj = {
                temp: eachObject.main.temp,
                maxTemp: eachObject.main.temp_max,
                minTemp: eachObject.main.temp_min,
                desciption: eachObject.weather[0].description,
                rawDate: eachObject.dt_txt,
                date: $filter('date')(new Date(eachObject.dt_txt),'yyyy-MM-dd')
            };
            factoryObject.temp[index] = tempObj;
        }
        return factoryObject;
    }


return this;
}])
.factory('GetWeatherData', ['$resource', function ($resource) {
    //$resource() function returns an object of resource class
    return function (customHeader) {
    
        return $resource(customHeader.url,
        {},
        //Handy for update & delete. id will be set with id of instance
        {
            get:
            {
                method: 'GET'
                
            }
        }
        );
    };
}
]);
