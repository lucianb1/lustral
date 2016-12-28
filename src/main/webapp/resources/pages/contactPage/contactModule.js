var contactModule = angular.module("contactModule", []);

contactModule.directive('focusEffect', function() {
    return {
        restrict: 'A', //E = element, A = attribute, C = class, M = comment         
        link: function($scope, element, attrs) {
            element.focusin(function() {
                $('.input-style-group').addClass('active');
            });

            element.focusout(function() {
                $('.input-style-group').removeClass('active');
            });
        }
    }
});


contactModule.directive('textareaFocus', function() {
    return {
        restrict: 'A', //E = element, A = attribute, C = class, M = comment         
        link: function($scope, element, attrs) {
            element.focusin(function() {
                $('.textareaFocus').addClass('active');
            });

            element.focusout(function() {
                $('.textareaFocus').removeClass('active');
            });
        }
    }
});

contactModule.directive('notification', ['$timeout',function ($timeout) {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment         
		template: '<div class="span-color" style="display:inline-block;"><div style="padding: 5px 10px 5px 10px;"><span id="toast-message" style="color:white;"></span></div></div>',
        link: function ($scope, element, attr) {
			element.hide();
            if (attr.notification) {
                $scope[attr.notification] = function (data, color) {
                    element.find("#toast-message").text(data);
					element.find('div').addClass(color);
					element.show();
					$timeout(function(){
						element.hide();
						element.find('div').removeClass(color);
					},3000);
                }
            }
        }
    }
}]);



contactModule.service('contactService', ['$http', function ($http) {
    return {
        sendMessage: function (data) {
            return $http.post('/contact', data);
        }
    }
}]);


contactModule.controller('contactController', [
    '$scope', '$http', 'contactService', function ($scope, $http, contactService) {
        $scope.email = '';
        $scope.message = '';
        $scope.sendMessage = function () {
            var toastContent = ""

			var invalidEmail =!$scope.email || !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test($scope.email.trim())
			var invalidMessage =!$scope.message || $scope.message.trim().length < 5;
			
            if (invalidEmail) {
                $scope.showNotification('E-mailul nu este valid !','red darken-2');
				return;
            };

            if (invalidMessage) {
				$scope.showNotification('Mesajul trbuie sa contina cel putin 5 caractere !','red darken-2');                                
				return;
            }

			if(!invalidEmail && !invalidMessage){
            contactService.sendMessage({ email: $scope.email.trim(), message: $scope.message.trim() }).then(function() {
                $scope.email = '';
                $scope.message = '';
                $scope.showNotification('Iti multumim, mesajul tau a fost trimis !','green lighten-1');				
            });
			}
        };
    }
]);