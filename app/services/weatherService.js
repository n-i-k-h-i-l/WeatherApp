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

}]);

