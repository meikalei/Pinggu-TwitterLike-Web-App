(() => {
    'use strict';

    angular
        .module('app')
        .controller('UserController', UserController);

    UserController.$inject = ['$scope', '$location', '$window', 'UserService', 'AuthenticationService'];

    function UserController($scope, $location, $window, UserService, AuthenticationService) {
        $scope.login = login;
        $scope.logout = logout;
        $scope.signup = signup;
        
        function login(username, password) {
            if (username !== undefined && password !== undefined) {

                UserService
                    .login(username, password)
                    .success(function(data) {
                        AuthenticationService.isAuthenticated = true;
                        localStorage.token = data.token;
                        localStorage.userdata = JSON.stringify(data.userdata);
                        $location.path('/home');
                    }).error(function(status, data) {
                        console.log(status);
                        console.log(data);
                        alert('Invalid Username or Password.')
                    });
            }
        }

        function logout() {
            if (AuthenticationService.isAuthenticated) {
                AuthenticationService.isAuthenticated = false;
                localStorage.clear();
                $location.path('/');
            }
        }

        function signup(newUser) {
            if (AuthenticationService.isAuthenticated) {
                $location.path("/home");
            }
            else {
                UserService
                    .signup(newUser)
                    .success(function(data) {
                        alert('Successfully created account!')
                        $window.location.reload();
                    }).error(function(status, data) {
                        console.log(status);
                        console.log(data);
                        alert('E-mail is already in used.')
                    });
                $location.path('/')
            }
        }

    }
})();