var parquetModule = angular.module('parquetModule', []);

var ajaxErrorCallback = function (error) {
    console.log('data:' + error.data + ' | status:' + error.status
        + ' | message' + error.statusText);
};

// parquetModule.factory('parchetCache', ['$cacheFactory', function ($cacheFactory) {
//     return $cacheFactory('parchet', {'capacity': 1});
// }]);

parquetModule.service('parquetService', ['$http', function ($http) {
    var notNull = function (item) {
        return item != null;
    };

    var createJsonBody = function (sort, producers, widths, classes, page, code) {
        producers = producers.filter(notNull);
        widths = widths.filter(notNull);
        classes = classes.filter(notNull);

        return {
            'producers': producers,
            'sort': sort,
            'widths': widths,
            'classes': classes,
            'page': page,
            'name': code
        };

    };

    return {
        getParquet: function (sort, producers, widths, classes, page, code) {
            return $http({
                url: '/parchet',
                data: createJsonBody(sort, producers, widths, classes, page, code),
                method: 'POST'
            })
                .error(ajaxErrorCallback);
        }
    }
}]);

parquetModule.controller('parquetController', ['$scope', '$http',
    'parquetService', 'cacheService', '$timeout', '$q', function ($scope, $http, parquetService, cacheService, $timeout, $q) {
        $scope.sortValue = null;
        $scope.producerValues = [];
        $scope.codeValue = null;
        $scope.widthValues = [];
        $scope.classValues = [];
        $scope.cardsList = [];
        $scope.currentPage = 1;
        $scope.listIsEmpty = false;
        $scope.canLoadNextPage = true;
        $scope.isPageReady = false;
        $scope.scrollPos = 0;

        this.time = null;
        var me = this;

        $(window).on('scroll', function () {
            if ($scope.okSaveScroll) { // false between $routeChangeStart and $routeChangeSuccess
                $scope.scrollPos = $(window).scrollTop();
            }
        });



        var updateCache = function () {
            cacheService.put('parchetCache',
                {
                    'currentPage': $scope.currentPage,
                    'cardsList': $scope.cardsList, 'codeValue': $scope.codeValue,
                    'classValues': $scope.classValues,
                    'widthValues': $scope.widthValues,
                    'producerValues': $scope.producerValues,
                    'sortValue': $scope.sortValue,
                    'canLoadNextPage': $scope.canLoadNextPage,
                    'listIsEmpty': $scope.listIsEmpty,
                    'isPageReady': $scope.isPageReady,
                    'scrollPos': $scope.scrollPos
                });
        };

        var getParchet = function () {
            return parquetService.getParquet($scope.sortValue, $scope.producerValues, $scope.widthValues, $scope.classValues, $scope.currentPage, $scope.codeValue);
        };

        $scope.updateSort = function (timeout) {
            $scope.initializeParchet(timeout);
        };

        $scope.updateFilter = function (timeout) {
            $scope.initializeParchet(timeout);
        };

        // $scope.updateProducerFilter = function (timeout) {
        // var oldVInList = $scope.oldProducerValues[0] === null;
        // var newVInList = $scope.producerValues[0] === null;
        // if (oldVInList == newVInList) { // it was existing in the both, or not at all
        //     $scope.initializeParchet(timeout);
        // }
        // $scope.oldProducerValues = $scope.producerValues;
        // $scope.initializeParchet(timeout);
        // };



        $scope.nextPage = function () {
            if ($scope.canLoadNextPage) {
                $scope.canLoadNextPage = false;
                $scope.currentPage++;
                getParchet().then(function (response) {
                    var data = response.data;
                    if (data.length == 30) { //TODO be aware of this hardcoded - page size
                        $scope.canLoadNextPage = true;
                    }
                    $scope.cardsList = $scope.cardsList.concat(response.data);
                });
            }

        };

        $scope.initializeParchet = function (delay, delayOnCards) {
            // daca load parchet e programata sa execute functia din timeout atunci oprim executia functiei din timeout
            if (me.time) {
                clearTimeout(me.time);
            }
            // salvez o noua referinta la urmatoru timeout ca sa ii pot da clear in caz ca mai dai click pe ceva in urmatoarele 2 secunde
            me.time = setTimeout(function () {
                $scope.isPageReady = false;
                $scope.currentPage = 1;

                if (delayOnCards == null) {
                    delayOnCards = 200;
                }

                var getParchetFuture = getParchet();
                var timeoutFuture = $timeout(function () {
                }, delayOnCards);

                $q.all([timeoutFuture, getParchetFuture]).then(function(data) {
                    var response = data[1];
                    $scope.cardsList = response.data;
                    $scope.listIsEmpty = response.data.length == 0;
                    if (response.data.length == 30) { //TODO be aware
                        $scope.canLoadNextPage = true;
                    }
                    $scope.isPageReady = true;
                });
                me.time = null;

            }, delay);
        };
        var cachedScope = cacheService.get('parchetCache');

        if (cachedScope == undefined) { // nothing in cache
            $scope.initializeParchet(0, 0);
        } else {
            for (var key in cachedScope) {
                $scope[key] = cachedScope[key];
            }
        }

        $scope.$on('$locationChangeStart', function (event) {
            $scope.okSaveScroll = false;
            if (!$scope.listIsEmpty) {
                updateCache();
            }
        });

        $scope.$on('$routeChangeSuccess', function () {
            $timeout(function () { // wait for DOM, then restore scroll position
                $(window).scrollTop($scope.scrollPos);
                $scope.okSaveScroll = true;
            }); // no parameter, wait for DOM
        });

    }]);

// parquetModule.directive('openModal', function () {
//     return {
//         restrict: 'A', // E = element, A = attribute, C = class, M = comment
//         link: function ($scope, element, attr) {
//             if (attr.openParchetModal) {
//                 $scope[attr.openParchetModal] = function (data) {
//                     element.openModal();
//                 }
//             }
//         }
//     }
// });
var parchetDetailsModule = angular.module("parchetDetailsModule", []);
var ajaxErrorCallback = function (error) {
    console.log('data:' + error.data + ' | status:' + error.status + ' | message' + error.statusText);
};

parchetDetailsModule.service('parchetDetailsService', ['$http', function ($http) {
    return {
        getDetailsData: function (id) {
            return $http.get('/parchet/detalii/' + id)
        }
    }
}]);

parchetDetailsModule.controller('parchetDetailsController', ['$scope', '$routeParams', 'parchetDetailsService',
    function ($scope, $routeParams, parchetDetailsService) {
        $scope.fancyBoxSliderArray = [];
        $scope.imagesArray = [];

        parchetDetailsService.getDetailsData($routeParams.id).then(function (response) {
            $scope.details = response.data;
            $scope.initSlider = true;

            for (var i = 1; i <= $scope.details.images; i++) {
                $scope.fancyBoxSliderArray.push({href: $scope.details.baseUrl + i + '.jpg', title: ''});
                $scope.imagesArray.push($scope.details.baseUrl + + i + '.jpg');
            }

            var trafficClass = $scope.details.trafficClass;
            if (trafficClass.includes('31')) {
                $scope.trafficTooltip = 'Clasa 31 (echivalent AC3) se preteaza la zone comerciale cu trafic usor sau la zone rezidentiale cu trafic intens (holuri, sala de oaspeti).';
            } else if (trafficClass.includes('32')) {
                $scope.trafficTooltip = 'Clasa 32 (echivalent AC4) se preteaza la zone comerciale cu trafic mediu precum restaurante, birouri.';
            } else if (trafficClass.includes('33')) {
                $scope.trafficTooltip = 'Clasa 33 (echivalent AC5) se preteaza la zone cu trafic intens pentru zone comerciale, mall-uri, magazine.';
            }
            $scope.materialTooltip = 'HDF (High Density Fiberboard), material net superior MDF';
        }, ajaxErrorCallback)
    }
]);
var mobilierModule = angular.module("mobilierModule", []);

var ajaxErrorCallback = function (error) {
    console.log('data:' + error.data + ' | status:' + error.status + ' | message' + error.statusText);
};

mobilierModule.service('mobilierService', ['$http', function ($http) {
    return {
        getMobilier: function () {
            return $http.get('/mobilier')
        }
    }
}]);

mobilierModule.controller('mobilierController', ['$scope', '$http', 'mobilierService', 'cacheService', '$timeout', function ($scope, $http, mobilierService, cacheService, $timeout) {
    $scope.cardsList = [];
    $scope.fancyBoxArray = [];
    $scope.scrollPos = 0;

    $(window).on('scroll', function () {
        if ($scope.okSaveScroll) { // false between $routeChangeStart and $routeChangeSuccess
            $scope.scrollPos = $(window).scrollTop();
        }
    });

    var updateCache = function () {
        cacheService.put('mobCache',
            {
                'cardsList': $scope.cardsList,
                'scrollPos': $scope.scrollPos
            });
    }

    var cachedScope = cacheService.get('mobCache');

    if (cachedScope != undefined) { // nothing in cache
        for (var key in cachedScope) {
            $scope[key] = cachedScope[key];
        }
    } else {
        mobilierService.getMobilier().then(function (response) {
            $scope.cardsList = response.data;
            angular.forEach($scope.cardsList, function (value, key) {
                $scope.fancyBoxArray.push({href: value.url, title: ''});
            });
        }, ajaxErrorCallback);
    }

    $scope.$on('$locationChangeStart', function (event) {
        $scope.okSaveScroll = false;
        if (!$scope.listIsEmpty) {
            updateCache();
        }
    });

    $scope.$on('$routeChangeSuccess', function () {
        $timeout(function () { // wait for DOM, then restore scroll position
            $(window).scrollTop($scope.scrollPos);
            $scope.okSaveScroll = true;
        }); // no parameter, wait for DOM
    });

}]);
var mobDetailsModule = angular.module("mobDetailsModule", []);
var ajaxErrorCallback = function (error) {
    console.log('data:' + error.data + ' | status:' + error.status + ' | message' + error.statusText);
}

mobDetailsModule.service('mobDetailsService', ['$http', function ($http) {
    return {
        getDetailView: function (id) {
            return $http.get('/mobilier/detalii/' + id)
        }
    }
}])

mobDetailsModule.controller('mobDetailsController', ['$scope', '$routeParams', 'mobDetailsService',
    function ($scope, $routeParams, mobDetailsService) {
        $scope.images = [];
        $scope.items = [];
        $scope.fancyBoxArray = [];

        mobDetailsService.getDetailView($routeParams.id).then(function (response) {
            $scope.initSlider = true;
            $scope.details = response.data;
            var imagesCount = $scope.details.imagesCount;
            for (var i = 1; i <= imagesCount; i++) {
                var url = $scope.details.baseUrl + '/' + i + '.jpg';
                $scope.images.push(url);
                $scope.fancyBoxArray.push({ href: url, title: '' });
            }
            $scope.items = response.data.items;

        }, ajaxErrorCallback)
    }
]);
var honeAndFaienceModule = angular.module("honeAndFaienceModule", []);

var ajaxErrorCallback = function (error) {
    console.log('data:' + error.data + ' | status:' + error.status + ' | message' + error.statusText);
}

honeAndFaienceModule.service('honeAndFaienceService', ['$http', function ($http) {
    var createReuqestBody = function (name, sortValue, materialValues, designValues, roomValues, page) {
        var json = {};
        json.name = name;
        json.sort = sortValue;
        json.page = page;
        json.materialFilter = {};
        json.roomFilter = {};
        json.designFilter = {};

        angular.forEach(materialValues, function (material) {
            if (material != null) {
                json.materialFilter[material] = true;
            }
        });
        angular.forEach(roomValues, function (room) {
            if (room != null) {
                json.roomFilter[room] = true;
            }
        });
        angular.forEach(designValues, function (design) {
            if (design != null) {
                json.designFilter[design] = true;
            }
        });
        return json;
    };
    return {
        getGresie: function (name, sortValue, materialValues, designValues, roomValues, page) {
            return $http({
                url: '/gresie-faianta',
                data: createReuqestBody(name, sortValue, materialValues, designValues, roomValues, page),
                method: 'POST'
            })
                .error(ajaxErrorCallback);
        }
    }
}]);

honeAndFaienceModule.controller('honeAndFaienceController', ['$scope', '$routeParams', 'honeAndFaienceService', 'cacheService', '$timeout', '$q',
    function ($scope, $routeParams, gresieService, cacheService, $timeout, $q) {
        $scope.cardsList = [];
        $scope.sortValue = null;
        $scope.materialValues = [];
        $scope.designValues = [];
        $scope.roomValues = [];
        $scope.nameValue = null;
        $scope.listIsEmpty = false;
        $scope.canLoadNextPage = true;
        $scope.isPageReady = false;
        $scope.scrollPos = 0;
        $scope.currentPage = 1;
        this.time = null;
        var me = this;

        $(window).on('scroll', function () {
            if ($scope.okSaveScroll) { // false between $routeChangeStart and $routeChangeSuccess
                $scope.scrollPos = $(window).scrollTop();
            }
        });

        var getGresie = function () {
            return gresieService.getGresie($scope.nameValue, $scope.sortValue, $scope.materialValues, $scope.designValues, $scope.roomValues, $scope.currentPage);
        };

        $scope.initializeGresie = function (delay, delayOnCards) {
            // daca load parchet e programata sa execute functia din timeout atunci oprim executia functiei din timeout
            if (me.time) {
                clearTimeout(me.time);
            }
            if (delayOnCards == null) {
                delayOnCards = 200;
            }
            // salvez o noua referinta la urmatoru timeout ca sa ii pot da clear in caz ca mai dai click pe ceva in urmatoarele 2 secunde
            me.time = setTimeout(function () {
                $scope.isPageReady = false;
                $scope.currentPage = 1;
                $scope.cardsList = [];
                var getGresieFuture = getGresie();
                var timeoutFuture = $timeout(function () {
                }, delayOnCards);

                $q.all([timeoutFuture, getGresieFuture]).then(function(data) {
                    var response = data[1];
                    $scope.cardsList = response.data;
                    $scope.listIsEmpty = response.data.length == 0;
                    if (response.data.length == 30) { //TODO be aware
                        $scope.canLoadNextPage = true;
                    }
                    $scope.isPageReady = true;
                });

                me.time = null;

            }, delay);
        };

        var cachedScope = cacheService.get('gresieCache');

        if (cachedScope == undefined) { // nothing in cache
            $scope.initializeGresie(0, 0);
        } else {
            for (var key in cachedScope) {
                $scope[key] = cachedScope[key];
            }
        }

        $scope.nextPage = function () {
            if ($scope.canLoadNextPage) {
                $scope.canLoadNextPage = false;
                $scope.currentPage++;
                getGresie().then(function (response) {
                    var data = response.data;
                    if (data.length == 30) { //TODO be aware of this hardcoded - page size
                        $scope.canLoadNextPage = true;
                    }
                    $scope.cardsList = $scope.cardsList.concat(response.data);
                });
            }

        };

        var updateCache = function () {
            cacheService.put('gresieCache',
                {
                    'currentPage': $scope.currentPage,
                    'cardsList': $scope.cardsList,
                    'sortValue': $scope.sortValue,
                    'canLoadNextPage': $scope.canLoadNextPage,
                    'listIsEmpty': $scope.listIsEmpty,
                    'isPageReady': $scope.isPageReady,
                    'scrollPos': $scope.scrollPos,
                    'materialValues': $scope.materialValues,
                    'designValues': $scope.designValues,
                    'roomValues': $scope.roomValues,
                    'nameValue': $scope.nameValue
                });
        };


        $scope.$on('$locationChangeStart', function (event) {
            $scope.okSaveScroll = false;
            if (!$scope.listIsEmpty) {
                updateCache();
            }
        });

        $scope.$on('$routeChangeSuccess', function () {
            $timeout(function () { // wait for DOM, then restore scroll position
                $(window).scrollTop($scope.scrollPos);
                $scope.okSaveScroll = true;
            }); // no parameter, wait for DOM
        });


        $scope.updateFilter = function (timeout) {
            $scope.initializeGresie(timeout);
        };

        $scope.updateSort = function (timeout) {
            $scope.initializeGresie(timeout);
        };


    }
]);
var honeAndFaienceDetailModule = angular.module("honeAndFaienceDetailModule", []);
var ajaxErrorCallback = function (error) {
    console.log('data:' + error.data + ' | status:' + error.status + ' | message' + error.statusText);
};


honeAndFaienceDetailModule.service('honeAndFaienceDetailService', ['$http', function ($http) {
    return {
        getDetailView: function (id) {
            return $http.get('/gresie-faianta/' + id)
        }
    }
}]);

honeAndFaienceDetailModule.controller('honeAndFaienceDetailController', ['$scope', '$routeParams', 'honeAndFaienceDetailService',
    function ($scope, $routeParams, honeAndFaienceDetailService) {
        $scope.presentationSlides = [];
        $scope.itemsImages = [];
        $scope.fancyBoxItemsArray = [];
        $scope.fancyBoxSliderArray = [];
        $scope.items = [];

        honeAndFaienceDetailService.getDetailView($routeParams.id).then(function (response) {
            var details = response.data;
            $scope.details = details;
            $scope.items = details.items;
            for (var i = 1; i <= details.images; i++) {
                var url = details.baseUrl + i + '.jpg';
                $scope.presentationSlides.push(url);
                $scope.fancyBoxSliderArray.push({href: url, title: ''});
            }

            for (var i = 1; i<= details.items.length; i++) {
                var url = details.baseItemsUrl + i + '.jpg';
                $scope.itemsImages.push(url);
                $scope.fancyBoxItemsArray.push({href: url, title: ''});
            }

            $scope.initSlider = true;
            $scope.thumbneilsList = details.items;
        });
    }
]);
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
                fancyArray.push({href: card.baseUrl + i + '.jpg', title: 'Cada ' + card.name});
            }
            $scope.fancyBoxArray.push(fancyArray);
        });
    }, ajaxErrorCallback);
}]);

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

mainApp.directive('deliveryInfo', ['$timeout',
    function ($timeout) {
        return {
            restrict: 'A', //E = element, A = attribute, C = class, M = comment
            link: function ($scope, element, attr) {
                $timeout(function () {
                    $scope.showDelivery = true;
                }, 5000);
                $scope.hideDelivery = function() {
                    $scope.showDelivery = false;
                    var deliveryContainer = angular.element('#delivery');
                    deliveryContainer.removeClass("long-animation");
                    $timeout(function () {
                        deliveryContainer.css('display', 'none');

                    }, 300);

                }

            }
        }
    }
]);