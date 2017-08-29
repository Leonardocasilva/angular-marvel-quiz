'use strict';

var justapp = angular.module('marvel', []);

justapp.controller("quetionaryController", function($scope, $http) {
    $scope.marvel = [];
    $scope.userGiveUp = [];
    var publicKey = 'c65af5cea0a8039ef261b24a695d602c';
    var baseUrl = "http://gateway.marvel.com/v1/public/characters";
    var timeStamp = '17071991';
    var hash = '78a7d5bf7353ea721c6c693ada1fbfec';

    function getHero() {
        $http.get(baseUrl, {
            params: {
                ts: timeStamp,
                apikey: publicKey,
                hash: hash,
                limit: 50,
                series: '2, 3, 5, 9, 22, 32'
            }
        }).then(function(response) {
            console.log(response.data.data.results);
            $scope.marvel = response.data.data.results;
        });
    }

    function clearName(idInput) {
        document.getElementById(idInput).value = '';
    }

    $scope.giveUp = function(id, i) {
        if ($scope.marvel[i].id == id)
            $scope.userGiveUp[i] = id;
    }

    $scope.submit = function(id, i) {
        var HerosName = document.getElementById(id).value;
        document.getElementById('1009367').value.substring(0, document.getElementById('1009367').value.indexOf('(') - 1)

        for (var i = 0; $scope.marvel.length > i; i++) {
            if ($scope.marvel[i].id == id) {
                if ($scope.marvel[i].name.indexOf('(') != '-1') {
                    var nomeMarvel = $scope.marvel[i].name.substring(0, $scope.marvel[i].name.indexOf('(') - 1);
                } else {
                    var nomeMarvel = $scope.marvel[i].name;
                }

                if (nomeMarvel.toLowerCase() == HerosName.toLowerCase()) {
                    //When correct show the name of the hero  
                    $scope.userGiveUp[i] = true
                        //Show to user, that's the answer is correct
                    alert('Brilliant, you are correct!!!');
                    //Clear the input
                    clearName(id);
                    break;
                } else {
                    alert('Oh Nooo! Wrong name, try again!');
                    clearName(id);
                    break;
                }
            }
        }
    }

    getHero();
});