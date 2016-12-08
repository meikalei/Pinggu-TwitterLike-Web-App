'use strict';

(function(){  
    angular
        .module('app', ['ngRoute'])
        .config(config)
        .config(tokeninterceptor)
        .run(auth)

    config.$inject = ['$routeProvider','$locationProvider'];
    auth.$inject = ['$rootScope', '$location', 'AuthenticationService'];

    function config($routeProvider, $locationProvider){
        $routeProvider
            .when('/', {
                'templateUrl': 'views/landing-page.html',
                'caseInsensitiveMatch': true,
                'controller' : 'UserController',
                'access': { requiredAuthentication: false }
            })
            .when('/home', {
                'templateUrl': 'views/home.html',
                'caseInsensitiveMatch': true,
                'access': { requiredAuthentication: true }
            })
            .when('/profile', {
                'templateUrl': 'views/profile.html',
                'caseInsensitiveMatch': true,
                'access': { requiredAuthentication: true }
            })
            .when('/profile/:username', {
                'templateUrl': 'views/other-profile.html',
                'caseInsensitiveMatch': true,
                'access': { requiredAuthentication: true }
            })
            .when('/search/:name', {
                'templateUrl': 'views/search-results.html',
                'caseInsensitiveMatch': true,
                'access': { requiredAuthentication: true }
            })
    }

    function tokeninterceptor($httpProvider) {
        $httpProvider.interceptors.push('TokenInterceptor');
    }

    function auth($rootScope, $location, AuthenticationService) {
        $rootScope
            .$on('$routeChangeStart', function(event, nextRoute, currentRoute) {
                if (nextRoute != null && nextRoute.access != null && nextRoute.access.requiredAuthentication 
                    && !AuthenticationService.isAuthenticated && !localStorage.token) {
                    $location.path('/');
            }
        });
    }

})();
