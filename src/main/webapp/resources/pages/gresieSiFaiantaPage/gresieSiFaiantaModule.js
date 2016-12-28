var honeAndFaienceModule = angular.module("honeAndFaienceModule", []);
var HeightOptions = function (heightProportion) {
    this.heightProportion = heightProportion;
    this.FIRST_ELEMENT_WIDTH = null;
    this.element = null;
}

var honeAndFaienceOptions = new HeightOptions(1.65);

var ajaxErrorCallback = function (error) {
    console.log('data:' + error.data + ' | status:' + error.status + ' | message' + error.statusText);
}

var setCardHeight = function(options) {
    if (!options.FIRST_ELEMENT_WIDTH) {
        options.FIRST_ELEMENT_WIDTH = options.element.parent().width();
    }

    if (options.FIRST_ELEMENT_WIDTH) {
        if (Math.abs(options.FIRST_ELEMENT_WIDTH - options.element.parent().width()) > 10) {
            options.FIRST_ELEMENT_WIDTH = options.element.parent().width();
        }
    }
    var height = Math.floor(options.FIRST_ELEMENT_WIDTH / options.heightProportion);
    if (!options.isWidthFixed) {
        options.element.width(options.FIRST_ELEMENT_WIDTH);
    }
    options.element.height(height);
};

honeAndFaienceModule.directive('setHeightDimension', ['$rootScope', function ($rootScope) {
    return {
        restrict: 'A', //E = element, A = attribute, C = class, M = comment         
        link: function ($scope, element, attrs) {
            honeAndFaienceOptions.element = element;
            setCardHeight(honeAndFaienceOptions);

            $rootScope.$on('resize', function (e, eArgs) {
                honeAndFaienceOptions.element = element;
                setCardHeight(honeAndFaienceOptions);
            })
        }
    }
}])

honeAndFaienceModule.service('honeAndFaienceService', ['$http', function ($http) {
    return {
        getHoneAndFaience: function (collection) {
            return $http.get('/gresie-faianta' + (collection ? '/' + collection : ''));
        }
    }
}]);

honeAndFaienceModule.controller('honeAndFaienceController', [
    '$scope', '$routeParams', 'honeAndFaienceService',
    function ($scope, $routeParams, honeAndFaienceService) {
        $scope.cardsList = [];
        $scope.selectedCard = '';
        $scope.showFullImage = false;
        $scope.fancyBoxArray = [];
        $scope.loading = true;
        honeAndFaienceService.getHoneAndFaience($routeParams.collection).then(function (response) {
            $scope.cardsList = response.data;
            angular.forEach($scope.cardsList, function (value, key) {
                $scope.fancyBoxArray.push({ href: value.bigImageSrc, title: getTitleContent(value.id, value.name) });
            });
        }, ajaxErrorCallback);


        $scope.show = function (image) {
            $scope.selectedCard = image.bigImageSrc;
            $scope.showFullImage = true;
        };

        $scope.hide = function () {
            $scope.showFullImage = !$scope.showFullImage;
        };

        function getTitleContent(id, name) {
            return "<a href=\"#/gresie-faianta/collection/" + id + "\" class=\"fancybox-btn-details\" onClick=\"_gaq.push(['_trackEvent', 'Gresie si faianta - detalii mic', 'click', '" + id + "']);\">Detalii</a>" +
            		"<span class=\"g-name\">" + name + "</span>";
        }
    }
]);