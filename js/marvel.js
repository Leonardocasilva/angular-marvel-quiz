var app = angular.module('marvelDemo', ['ngRoute', 'ui.bootstrap']);


app.controller('MainCtrl', function($scope, $location, $http) {
    $scope.char = {};
    $scope.showCharInfo = false;
    $scope.getCharacters = function(val) {
        $scope.timeStamp = Date.now();
        $scope.publicKey = "5234a931fdd1da574fb6133e31a6d02c";
        baseUrl = "http://gateway.marvel.com/v1/public/characters";
        return $http.get(baseUrl, {
            params: {
                nameStartsWith: val,
                limit: 25,
                ts: $scope.timeStamp,
                apikey: $scope.publicKey
            }
        }).then(function(response) {
            $scope.charInfoArr = response.data.data.results;
            return response.data.data.results.map(function(item) {

                return item.name;
            });
        });
    };

    $scope.selectCharacter = function(item) {
        angular.forEach($scope.charInfoArr, function(obj, key) {
            if (obj.name === item) {

                if (obj.thumbnail) {
                    $scope.char.thumb = obj.thumbnail.path + "." + obj.thumbnail.extension;
                } else {
                    $scope.char.thumb = "";
                }

                $scope.char.name = obj.name;
                $scope.char.desc = obj.description;
                $scope.showCharInfo = true;
            }

        });

    }

});