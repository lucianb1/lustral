var bathtubsModule = angular.module("bathtubsModule", []);

var ajaxErrorCallback = function (error) {
    console.log('data:' + error.data + ' | status:' + error.status + ' | message' + error.statusText);
};

bathtubsModule.directive('openModal', function () {
    return {
        restrict: 'A', //E = element, A = attribute, C = class, M = comment
        link: function ($scope, element, attr) {
            if (attr.openCustomModal) {
                $scope[attr.openCustomModal] = function (data) {
                    element.openModal();
                }
            }
        }
    }
});

bathtubsModule.service('bathtubsService', ['$http', function ($http) {
    return {
        getBathubsCollection: function () {
            return $http.get('/cazi');
        }
    };
}]);

bathtubsModule.controller('bathtubsController', ['$scope', 'bathtubsService', function ($scope, bathtubsService) {
    $scope.cardsList = [];
    $scope.fancyBoxArray =[];
    $scope.isPageLoaded = false;
    $scope.toolTip='Cazile sunt fabricate in Romania, confectionate din acril cu placa de lemn pentru rezistenta. Toate modelele dispun de 10 ani garantie. Preturile sunt cu TVA si includ cada, picioarele si masca frontala. Nu includ sifonul si sistemul hidro. Pentru avedea lista de preturi pentru sistemele hidro click <a href="javascript:void(0)\" ng-click=\"openCustomModal();">aici</a>.';

    bathtubsService.getBathubsCollection().then(function (response) {
        $scope.cardsList = response.data;
        $scope.isPageLoaded = true;
        angular.forEach($scope.cardsList, function(card) {
            var fancyArray = [];
            for (var i = 1; i <= card.images; i++) {
                fancyArray.push({href: card.baseUrl + i + '.jpg', title: ''});
            }
            $scope.fancyBoxArray.push(fancyArray);
        });
        console.log($scope.fancyBoxArray);

    }, ajaxErrorCallback);
}]);

