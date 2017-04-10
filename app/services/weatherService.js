app.service('weatherService', ['$http', '$q','$filter', '$window', '$resource',function($http, $q, $filter, $window,$resource){

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

}])
/*.factory('GetWeatherData', ['$resource', function ($resource) {
    //$resource() function returns an object of resource class
    return function (customHeader) {
     var url = 'http://api.openweathermap.org/data/2.5/find?lat='+ customHeader.lat +
                '&lon='+ customHeader.lon +
                '&appid=084c66197563211ec73423a8f2b503fc';
        return $resource('',
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
]);*/

