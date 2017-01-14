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
        // 'ngAnimate',
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
        template: '\<div class=\"preloader-wrapper-container\">\n    <div class=\"vertical-center-in-display-table\">\n        <div class=\"preloader-wrapper big active\">\n            <div class=\"spinner-layer spinner-blue-only\">\n                <div class=\"circle-clipper left\">\n                    <div class=\"circle\"></div>\n                </div>\n                <div class=\"gap-patch\">\n                    <div class=\"circle\"></div>\n                </div>\n                <div class=\"circle-clipper right\">\n                    <div class=\"circle\"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>'
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

// mainApp.directive('sideNavMenu', [function () {
//     return {
//         restrict: 'E', //E = element, A = attribute, C = class, M = comment
//         templateUrl: '/resources/components/side-nav-Menu.html',
//     }
// }]);

mainApp.directive('sideMenuBtn', [function () {
    return {
        restrict: 'A', //E = element, A = attribute, C = class, M = comment
        link: function ($scope, element, attr) {
            element.sideNav({ closeOnClick: true });
        }
    }
}]);

// mainApp.directive('resize', ['$rootScope', '$window', function ($rootScope, $window) {
//     return {
//         restrict: 'A', //E = element, A = attribute, C = class, M = comment
//         link: function ($scope, element, attrs) {
//             angular.element($window).bind('resize', function () {
//                 $rootScope.$broadcast('resize');
//             })
//             var lastScrollTop = 0;
//             angular.element($window).bind('scroll', function (event) {
//                 var st = $(this).scrollTop()
//                 if (st > lastScrollTop) {
//                     $("#navigation-Menu").addClass('nav-small');
//                     $("#btn-collapse").addClass('btn-collapse-small');
//
//                 }
//                 else if(st === 0){
//                     $("#navigation-Menu").removeClass('nav-small');
//                     $("#btn-collapse").removeClass('btn-collapse-small');
//                 }
//                 lastScrollTop = st;
//             });
//
//         }
//     }
// }]);

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

mainApp.factory('cacheService', ['$cacheFactory', function ($cacheFactory) {
    return $cacheFactory('cacheService', {'capacity': 1});
}]);

mainApp.directive('backImg', function () {
    return function (scope, element, attrs) {
        attrs.$observe('backImg', function (value) {
            element.css({
                'background-image': 'url(' + value + ')',
                // 'background-image': 'url(images/goodImg.jpg)',
                'background-size': 'cover'
            });
        });
    };
});

mainApp.directive('backColor', function () {
    return function (scope, element, attrs) {
        attrs.$observe('backColor', function (value) {
            element.css({
                'background-color': value
            });
        });
    };
});

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

//application routing
mainApp.config(['$httpProvider', '$routeProvider', function ($httpProvider, $routeProvider) {
    $routeProvider
        .when('/gresie-faianta', {
            templateUrl: baseTemplateUrl + 'gresieSiFaiantaPage/gresieSiFaianta.html',
            controller: 'honeAndFaienceController',
            animation: 'slide'
        })
        .when('/gresie-faianta/detalii/:id', {
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
            templateUrl: baseTemplateUrl + 'mobPage/detail/mobDetailsPage.html',
            controller: 'mobDetailsController',
            animation: 'slide'
        })
        .otherwise({
            redirectTo: '/gresie-faianta'
        });

}]);