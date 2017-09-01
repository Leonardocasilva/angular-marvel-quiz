var justapp = angular.module('marvel', []);

justapp.controller('quetionaryController', function($scope, $http) {
    'use strict';

    $scope.marvel = [];
    $scope.mobile = false;
    $scope.userGiveUp = false;
    $scope.endPoints = true;
    $scope.heroPic = '';
    $scope.heroName = '';
    $scope.ButtonNext = '';
    $scope.finished = '';
    $scope.title_marvel = 'Welcome to Marvel Quiz';
    $scope.text_body_marvel = "let's test your knowledge in the Marvel universe and see how many points you can do, good luck ;-)";
    $scope.choiceColor = 'dark';
    $scope.userPoints = 0;
    $scope.choice = true;
    var x = 0;
    var count = 0;
    var nomeMarvel = '';
    var publicKey = 'c65af5cea0a8039ef261b24a695d602c';
    var baseUrl = "https://gateway.marvel.com/v1/public/characters";
    var timeStamp = '17071991';
    var hash = '78a7d5bf7353ea721c6c693ada1fbfec';

    /*
     * Function do get the heros from theMArvel API
     */
    function getHero() {
        $http.get(baseUrl, {
            params: {
                ts: timeStamp, // Send the timestanp to acess the API
                apikey: publicKey, // Send the Public Key to acess the API
                hash: hash, // Send the hash, that is the Public Key, timestamp and Private Key in a conbination to acess the API
                limit: 50, // Limit return from the API to 50 characters
                series: '5, 22, 102, 99, 91, 47, 44, 160, 173' //return the characters based in some series of event
            }
        }).then(function(response) {
            $scope.marvel = response.data.data.results;
            $scope.loadHero();
        });
    }

    function clearName() {
        //Used only to clear the input
        document.getElementById('userChoice').value = '';
    }

    function isMobile() {
        //Verify if the device is a mobile or not
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            //If is mobile, show the Whatsapp share button
            $scope.mobile = true;
        } else {
            //Else hide the Whatsapp share button
            $scope.mobile = false;
        }
    }

    $scope.loadHero = function(HeroChoice) {
        /*
         * In the function, we'll attribut the values to variables, to send to the view, 
         * all informations to load the heroes name and images, returned from the API
         */
        if (HeroChoice) {
            //Only a count to go to the next hero when a answer is given
            x += HeroChoice;
        }

        //The variable choiceColor is used to change the color of the buttons and Border like the choice of the user
        $scope.choiceColor = 'dark';

        //Verify if is the last hero
        if (x >= $scope.marvel.length) {
            //Call the function to verify if the device is a mobile or not
            isMobile();
            //Hide the Hero DIV
            $scope.endPoints = false;
            //Change the color of the buttons and Borders
            $scope.choiceColor = 'primary';
            //Align the punctuation DIV to the center of the body
            $scope.finished = 'block-center';
            //Change title text on punctuation DIV
            $scope.title_marvel = 'Good Job, Hero!';
            //change the body text on punctuation DIV
            $scope.text_body_marvel = "We hope that you enjoyed our little quiz, if you did a low score, don't be frustrated, try again!";
        } else {
            //Attribuete the hero picture in the variable of scope
            $scope.heroPic = $scope.marvel[x].thumbnail.path + '.' + $scope.marvel[x].thumbnail.extension;
            //Attribuete the hero name in the variable of scope
            $scope.heroName = $scope.marvel[x].name;
            //Hide the nextHero Button
            $scope.userGiveUp = false;
            //Show the Answer buttons and the input
            $scope.choice = true;
        }
    };

    $scope.tryAgain = function() {
        window.location.reload();
    };

    $scope.giveUp = function(wa) {
        //Changed to true, to show the nextButton
        $scope.userGiveUp = true;
        //Changed to false, to hide the answer's button and input
        $scope.choice = false;

        //Verify if is the last hero
        if (x >= $scope.marvel.length - 1) {
            //Change the button text if is the last hero
            $scope.ButtonNext = "Come on, let's finish this!";
            //change the button and border color to primary
            $scope.choiceColor = 'primary';
        } else {
            //verify if is a wrong answer or not
            if (!wa) {
                //Change the button text if is a give up
                $scope.ButtonNext = "Ok, Don't worry, you can try the next hero";
                //Change the color of button and borders to primary
                $scope.choiceColor = 'primary';
            } else if (wa) {
                //Change the button text if is a wrong answer
                $scope.ButtonNext = "Oh Nooo, Wrong answer, Let's try the next hero";
                //Change the button and border color
                $scope.choiceColor = 'danger';
                //Subtract the punctuation value
                $scope.userPoints--;
            }
        }
    };

    $scope.sendAnswer = function() {
        //Take the value on the input
        var HerosName = document.getElementById('userChoice').value;

        //Verify if the hero's name contain parentheses
        if ($scope.marvel[x].name.indexOf('(') != '-1') {
            //If hero's name have paretheses, remove it, to compare later
            nomeMarvel = $scope.marvel[x].name.substring(0, $scope.marvel[x].name.indexOf('(') - 1);
        } else {
            //If the hero's name don't have parentheses, only attributes it on the scope variable
            nomeMarvel = $scope.marvel[x].name;
        }

        //Verify if the answer of the user is equal of the hero's name, puting it in lowercase to avoid problems when compare
        if (nomeMarvel.toLowerCase() == HerosName.toLowerCase()) {
            //When correct show the name of the hero  
            $scope.userGiveUp = true;
            //Hide the buttons to avoid try insert a new answer on the same hero
            $scope.choice = false;
            //Add the point of correct answer
            $scope.userPoints++;
            //Change the color of the button
            $scope.choiceColor = 'success';
            //Verify if is the last hero
            if (x >= $scope.marvel.length - 1) {
                //Change the text of the button nextHero
                $scope.ButtonNext = "Come on, let's finish this!";
            } else {
                //Change the text of the button nextHero
                $scope.ButtonNext = "Nice job, Let's to the next hero";
            }
            //Clear the input
            clearName();
        } else {
            //Call the function giveUp to see with is a Wrong Answer or a Give Up
            $scope.giveUp('wrong');
            //Clear the answer input
            clearName();
        }
    };

    getHero();

});