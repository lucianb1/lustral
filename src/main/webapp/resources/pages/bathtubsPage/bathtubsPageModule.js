var bathtubsModule = angular.module("bathtubsModule", []);

var bathtubsOption = new HeightOptions(1.7);
var loangingBathtubeOption = new HeightOptions(1.47);

var ajaxErrorCallback = function (error) {
    console.log('data:' + error.data + ' | status:' + error.status + ' | message' + error.statusText);
}

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

bathtubsModule.directive('setBathtubtHeight', [
    '$rootScope', function ($rootScope) {
        return {
            restrict: 'A', //E = element, A = attribute, C = class, M = comment         
            link: function ($scope, element, attrs) {
                bathtubsOption.element = element;
                setCardHeight(bathtubsOption);

                $rootScope.$on('resize', function (e, eArgs) {
                    bathtubsOption.element = element;
                    setCardHeight(bathtubsOption);
                })
            }
        };
    }
]);

bathtubsModule.service('bathtubsService', ['$http', function ($http) {
    return {
        getBathubsCollection: function () {
            return $http.get('/baths');
        },

        getBathubsDetails: function (id) {
            return $http.get('/bath/' + id);
        }
    };
}]);

bathtubsModule.controller('bathtubsController', ['$scope', 'bathtubsService', function ($scope, bathtubsService) {
    $scope.cardsList = [];
    $scope.selectedCard = '';
    $scope.testData = ['test', 'test1', 'test2'];
    $scope.showFullImage = false;

    bathtubsService.getBathubsCollection().then(function (response) {
        angular.forEach(response.data, function(value, key) {
            value.dimensions = $scope.testData;
        });

        $scope.cardsList = response.data;
    }, ajaxErrorCallback);

    $scope.showDetailView = function(id) {
        bathtubsService.getBathubsDetails(id).then(function(response) {
            var data = { animate: true, images: response.data };
            $scope.openDetailView(data);
        }, ajaxErrorCallback);
    };

    $scope.show = function (image) {
        $scope.selectedCard = image.bigImageSrc;
        $scope.showFullImage = true;
    };

    $scope.hide = function () {
        $scope.showFullImage = !$scope.showFullImage;
    };
}]);

