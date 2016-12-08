(() => {
    'use strict';

    angular
        .module('app')
        .factory('UserService', UserService);

    UserService.$inject = ['$http', '$q'];

    function UserService($http, $q) {
        const service = {
            login : login,
            logout : logout,
            signup : signup
        }

        return service;

        function login(username, password) {
            let data = {
                username: username,
                password: password
            }

            return $http.post('/api/account/login', data);
        }

        function logout() {
            return $http.get('/api/account/logout');
        }

        function signup(user) {
            let deferred = $q.defer();

            let data = {
                email: user.email,
                username: user.username,
                loginPassword: user.password,
                name: user.username
            }

            $http.post('/api/account/signup', data)
            .then((res) => {
                    console.log(res);
                    deferred.resolve(res);
                }, (err) => {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

    }
})();