(() => {
    'use strict';

    angular
        .module('app')
        .factory('AuthenticationService', AuthenticationService);

    function AuthenticationService() {
        const service = {
            isLogged: false
        }

        return service;

    }
})();