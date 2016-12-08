(() => {
    'use strict';

    angular
        .module('app')
        .factory('TokenInterceptor', TokenInterceptor);

    TokenInterceptor.$inject = ['$q', '$window', '$location', 'AuthenticationService'];

    function TokenInterceptor($q, $window, $location, AuthenticationService) {
        const service = {
            request : request,
            requestError : requestError,
            response : response,
            responseError : responseError
        }

        return service;

        function request(config) {
            config.headers = config.headers || {};
            if (localStorage.token) {
                config.headers.Authorization = 'Bearer ' + localStorage.token;
            }
            return config;
        }

        function requestError(rejection) {
            return $q.reject(rejection);
        }

        /* Set Authentication.isAuthenticated to true if 200 received */
        function response(response) {
            if (response != null && response.status == 200 && localStorage.token && !AuthenticationService.isAuthenticated) {
                AuthenticationService.isAuthenticated = true;
            }
            return response || $q.when(response);
        }

        /* Revoke client authentication if 401 is received */
        function responseError(rejection) {
            if (rejection != null && rejection.status === 401 && (localStorage.token || AuthenticationService.isAuthenticated)) {
                localStorage.clear();
                AuthenticationService.isAuthenticated = false;
                $location.path("/");
            }

            return $q.reject(rejection);
        }

    }
})();