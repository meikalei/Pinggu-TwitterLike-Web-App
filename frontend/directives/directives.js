(function(){ 
    'use strict';
    
    angular
        .module('app')
        .directive('viewPing', viewPing)
        .directive('editPing', editPing)
        .directive('deletePing', deletePing)
        .directive('dropdownDirective', dropdownDirective)
        .directive('dimmerDirective', dimmerDirective)
        .directive('pressEnter', pressEnter)

        function viewPing() {
            var directive = {
                link: link,
                restrict: 'EA'
            };
            return directive;
            
            function link(scope, element, attrs) {
                $(element).on('click', function() {
                    $('#pings-modal').modal('show');
                });
            }

        }

        function editPing() {
            var directive = {
                link: link,
                restrict: 'EA'
            };
            return directive;
            
            function link(scope, element, attrs) {
                $(element).on('click', function() {
                    $('#edit-modal').modal('show');
                });
            }

        }

        function deletePing() {
            var directive = {
                link: link,
                restrict: 'EA'
            };
            return directive;
            
            function link(scope, element, attrs) {
                $(element).on('click', function() {
                    $('#del-modal').modal('show');
                });
            }

        }

        function dropdownDirective() {
            var directive = {
                link: link,
                restrict: 'EA'
            };
            return directive;
            
            function link(scope, element, attrs) {
                $(element).dropdown();
            }

        }

        function dimmerDirective() {
            var directive = {
                link: link,
                restrict: 'EA'
            };
            return directive;
            
            function link(scope, element, attrs) {
                $(element).dimmer({
                    on: 'hover'
                });
            }

        }
        
        function pressEnter() {
            var directive = {
                link: link,
                restrict: 'EA'
            };
            return directive;
            
            function link(scope, element, attrs) {
                element.bind("keypress", function(event) {
                    var keyCode = event.which || event.keyCode;

                    if (keyCode == attrs.code) {
                        scope.$apply(function() {
                            scope.$eval(attrs.pressEnter, {$event: event});
                        });
                    }
                })
            }
            
        }
})();
