var baseTemplateUrl = '/resources/pages/';

//load dependencies
var honeAndFaienceModule = angular.module('honeAndFaienceModule')
var honeAndFaienceDetailModule = angular.module('honeAndFaienceDetailModule');
var parquetModule = angular.module('parquetModule');
var parchetDetailsModule = angular.module('parchetDetailsModule');
var bathtubsModule = angular.module('bathtubsModule');
var mobilierModule = angular.module('mobilierModule');

//inject dependecies in the main app
var mainApp = angular.module('lustralWebSite',
    [
        'ngRoute',
        'ngAnimate',
        'infinite-scroll',
        'honeAndFaienceModule',
        'honeAndFaienceDetailModule',
        'parquetModule',
        'parchetDetailsModule',
        'bathtubsModule',
        'mobilierModule',
        'mobDetailsModule',
        'contactModule',
        'ui.materialize'
    ]);

//add global directives

mainApp.directive('loadingSpinner', [function () {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment
        templateUrl: '/resources/components/loading-template.html',
        // scope: { loading: "=" },
        // link: function ($scope, element) {
        //     element.parent().find('img').imagesLoaded(function () {
        //         // element.hide();
        //     });
        // }
    }
}]);

mainApp.directive('detailView', [
    function () {
        return {
            restrict: 'A', //E = element, A = attribute, C = class, M = comment
            link: function ($scope, element, attr) {
                if (attr.openDetailView) {
                    $scope[attr.openDetailView] = function (data) {
                        element.slideCarousel(data);
                    }
                }
            }
        }
    }
]);

mainApp.directive('sideNavMenu', [function () {
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment
        templateUrl: '/resources/components/side-nav-Menu.html',
    }
}]);

mainApp.directive('sideMenuBtn', [function () {
    return {
        restrict: 'A', //E = element, A = attribute, C = class, M = comment
        link: function ($scope, element, attr) {
            element.sideNav({ closeOnClick: true });
        }
    }
}]);

mainApp.directive('resize', ['$rootScope', '$window', function ($rootScope, $window) {
    return {
        restrict: 'A', //E = element, A = attribute, C = class, M = comment
        link: function ($scope, element, attrs) {
            angular.element($window).bind('resize', function () {
                $rootScope.$broadcast('resize');
            })
            var lastScrollTop = 0;
            angular.element($window).bind('scroll', function (event) {
                var st = $(this).scrollTop()
                if (st > lastScrollTop) {
                    $("#navigation-Menu").addClass('nav-small');
                    $("#btn-collapse").addClass('btn-collapse-small');

                }
                else if(st === 0){
                    $("#navigation-Menu").removeClass('nav-small');
                    $("#btn-collapse").removeClass('btn-collapse-small');
                }
                lastScrollTop = st;
            });

        }
    }
}]);

mainApp.directive('fancyBox', ['$compile', function ($compile) {
    return {
        restrict: 'A', //E = element, A = attribute, C = class, M = comment
        link: function ($scope, element, attrs) {
            $scope.openFancybox = function (fancyBoxArray, index) {
                $.fancybox.open(fancyBoxArray, {
                    openEffect: 'elastic',
                    closeEffect: 'elastic',
                    nextEffect: 'fade',
                    openSpeed: 600,
                    closeSpeed: 200,
                    afterShow: function () {
                        $('.fancybox-title.fancybox-title-inside-wrap a').click(function (event) {
                            $.fancybox.close();
                        })
                    },
                    index: index,
                    helpers: {
                        title: {
                            type: 'inside'
                        }
                    }
                });
            }
        }
    }
}]);

mainApp.directive('materializeSlider', function () {
    //directive witch listens to the ng-model and after model is initialized she creates the slider
    return {
        restrict: 'A', //E = element, A = attribute, C = class, M = comment
        require: '?ngModel',
        link: function ($scope, element, attrs, ngModel) {
            if (ngModel) {
                $scope.$watch(
                    function () { return ngModel.$modelValue; },
                    function (newValue, oldValue) {
                        if (newValue === true) {
                            element.slider({ full_width: true, interval: 3500 });
                        }
                    })
            }
        }
    }
})

mainApp.directive('googleMap', function () {
    //google maps
    return {
        restrict: 'E', //E = element, A = attribute, C = class, M = comment
        template: '<div><div>',
        link: function ($scope, element, attrs) {
            var LUSTRAL_LOCATION = new google.maps.LatLng(46.78702, 23.63782);

            var mapOptions = {
                zoom: 14,
                center: LUSTRAL_LOCATION,
                mapTypeId: google.maps.MapTypeId.TERRAIN
            }

            $scope.map = new google.maps.Map(element[0], mapOptions);

            var marker = new google.maps.Marker({
                position: LUSTRAL_LOCATION,
                map: $scope.map,
                title: 'Lustral'
            });
        }
    }
})

mainApp.factory('parchetCache', ['$cacheFactory', function ($cacheFactory) {
    return $cacheFactory('parchet', {'capacity': 1});
}]);

//application routing
mainApp.config(['$httpProvider', '$routeProvider', function ($httpProvider, $routeProvider) {
    $routeProvider
        .when('/gresie-faianta', {
            templateUrl: baseTemplateUrl + 'gresieSiFaiantaPage/gresieSiFaianta.html',
            controller: 'honeAndFaienceController',
            animation: 'slide'
        })
        .when('/gresie-faianta/:collection', {
            templateUrl: baseTemplateUrl + 'gresieSiFaiantaPage/gresieSiFaianta.html',
            controller: 'honeAndFaienceController',
            animation: 'slide',
            resolve: {
                collection: function ($location, $route) {
                    switch ($route.current.params.collection) {
                        case 'bucatarie':
                        case 'living':
                        case 'exterior':
                            break;
                        default:
                            $location.path('/gresie-faianta');
                    };
                }
            }
        })
        .when('/gresie-faianta/collection/:id', {
            templateUrl: baseTemplateUrl + 'gresieSiFaiantaDetailPage/gresieSiFaiantaDetailPage.html',
            controller: 'honeAndFaienceDetailController',
            animation: 'slide'
        })
        .when('/contact', {
            templateUrl: baseTemplateUrl + 'contactPage/contactPage.html',
            controller: 'contactController',
            animation: 'slide'
        })
        .when('/parchet', {
            templateUrl: baseTemplateUrl + 'parquetPage/parquetPage.html',
            controller: 'parquetController',
            animation: 'slide'
        })
        .when('/parchet/detalii/:id', {
            templateUrl: baseTemplateUrl + 'parquetPage/detail/parchetDetailsPage.html',
            controller: 'parchetDetailsController',
            animation: 'slide'
        })
        .when('/cazi-baie', {
            templateUrl: baseTemplateUrl + 'bathtubsPage/bathtubsPage.html',
            controller: 'bathtubsController',
            animation: 'slide'
        })
        .when('/mobilier', {
            templateUrl: baseTemplateUrl + 'mobPage/mobPage.html',
            controller: 'mobilierController',
            animation: 'slide'
        })
        .when('/mobilier/detalii/:id', {
            templateUrl: baseTemplateUrl + 'mobDetailsPage/mobDetailsPage.html',
            controller: 'mobDetailsController',
            animation: 'slide'
        })
        .otherwise({
            redirectTo: '/gresie-faianta'
        });

}]);