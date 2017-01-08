var parquetModule = angular.module("parquetModule", []);

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
                .error(function (data, status, headers, config) {
                    console.log('error:' + status);
                });
        }
    }
}]);

parquetModule.controller('parquetController', ['$scope', '$http',
    'parquetService', 'parchetCache', '$timeout', function ($scope, $http, parquetService, parchetCache, $timeout) {
        // $scope.sortOptions = [{id: null, value: 'Alege...'}, {id: 1, value: 'Pret crescator'}, {id: 2, value: 'Pret descrescator'}];
        $scope.sortValue = null;
        $scope.producerOptions = [{id: null, value: 'Producator'}, {id: 'KAINDL', value: 'Kaindl'}, {id: 'EGGER', value: 'Egger'}];
        $scope.producerValues = [];
        $scope.oldProducerValues = [];
        $scope.widthOptions = [{id: null, value: 'Grosime'}, {id: 8, value: '8 mm'}, {id: 10, value: '10 mm'}, {id: 11, value: '11 mm'}, {
            id: 12,
            value: '12 mm'
        }];

        $scope.codeValue = null;
        $scope.widthValues = [];
        $scope.oldWidthValues = [];
        $scope.classOptions = [{id: null, value: 'Clasa trafic'}, {id: 31, value: 'Cl31'}, {id: 32, value: 'Cl32'}, {id: 33, value: 'Cl33'}];
        $scope.classValues = [];
        $scope.oldClassValues = [];
        $scope.cardsList = [];
        $scope.fancyBoxArray = [];
        $scope.currentPage = 1;
        $scope.listIsEmpty = false;
        $scope.canLoadNextPage = true;
        $scope.isPageReady = false;
        $scope.scrollPos = 0;

        this.time = null;
        var me = this;

        $(window).on('scroll', function() {
            if ($scope.okSaveScroll) { // false between $routeChangeStart and $routeChangeSuccess
                $scope.scrollPos = $(window).scrollTop();
            }
        });

        $scope.scrollClear = function(path) {
            $scope.scrollPos = 0;
        }

        var updateCache = function () {
            parchetCache.put('parchetContext',
                {
                    'currentPage': $scope.currentPage, 'fancyBoxArray': $scope.fancyBoxArray,
                    'cardsList': $scope.cardsList, 'codeValue': $scope.codeValue,
                    'classValues': $scope.classValues, 'oldClassValues': $scope.oldClassValues,
                    'widthValues': $scope.widthValues, 'oldWidthValues': $scope.oldWidthValues,
                    'producerValues': $scope.producerValues, 'oldProducerValues': $scope.oldProducerValues,
                    'sortValue': $scope.sortValue,
                    'canLoadNextPage': $scope.canLoadNextPage,
                    'listIsEmpty': $scope.listIsEmpty,
                    'isPageReady': $scope.isPageReady,
                    'scrollPos' : $scope.scrollPos
                });
        }

        var getParchet = function () {
            return parquetService.getParquet($scope.sortValue, $scope.producerValues, $scope.widthValues, $scope.classValues, $scope.currentPage, $scope.codeValue);
        };

        $scope.updateSort = function (timeout) {
            $scope.initializeParchet(timeout);
        };

        $scope.updateProducerFilter = function (timeout) {
            var oldVInList = $scope.oldProducerValues[0] === null;
            var newVInList = $scope.producerValues[0] === null;
            if (oldVInList == newVInList) { // it was existing in the both, or not at all
                $scope.initializeParchet(timeout);
            }
            $scope.oldProducerValues = $scope.producerValues;
        };

        $scope.updateWidthFilter = function (timeout) {
            var oldVInList = $scope.oldWidthValues[0] === null;
            var newVInList = $scope.widthValues[0] === null;
            if (oldVInList == newVInList) { // it was existing in the both, or not at all
                $scope.initializeParchet(timeout);
            }
            $scope.oldWidthValues = $scope.widthValues;
        };

        $scope.updateClassFilter = function (timeout) {
            var oldVInList = $scope.oldClassValues[0] === null;
            var newVInList = $scope.classValues[0] === null;
            if (oldVInList == newVInList) { // it was existing in the both, or not at all
                $scope.initializeParchet(timeout);
            }
            $scope.oldClassValues = $scope.classValues;
        }
        ;
        $scope.updateNameFilter = function (timeout) {
            $scope.initializeParchet(timeout);
        };


        $scope.nextPage = function () {
            if ($scope.canLoadNextPage) {
                $scope.canLoadNextPage = false;
                $scope.currentPage++;
                getParchet().then(function (response) {
                    var data = response.data;
                    if (data.length < 25) { //TODO be aware of this hardcoded - page size

                    } else {
                        $scope.cardsList = $scope.cardsList.concat(response.data);
                        $scope.canLoadNextPage = true;
                    }
                });
            }

        };

        $scope.initializeParchet = function (delay) {
            // daca load parchet e programata sa execute functia din timeout atunci oprim executia functiei din timeout
            if (me.time) {
                clearTimeout(me.time);
            }
            // salvez o noua referinta la urmatoru timeout ca sa ii pot da clear in caz ca mai dai click pe ceva in urmatoarele 2 secunde
            me.time = setTimeout(function () {
                $scope.isPageReady = false;
                $scope.currentPage = 1;
                getParchet().then(function (response) {
                    $scope.cardsList = response.data;
                    $scope.listIsEmpty = response.data.length == 0;
                    $scope.isPageReady = true;
                }, ajaxErrorCallback);
                me.time = null;

            }, delay);

        };
        var cachedScope = parchetCache.get('parchetContext');

        if (cachedScope == undefined) { // nothing in cache
            $scope.initializeParchet(0);
        } else {
            for (var key in cachedScope) {
               $scope[key] = cachedScope[key];
            };
        }

        $scope.$on('$locationChangeStart', function (event) {
            $scope.okSaveScroll = false;
            if (!$scope.listIsEmpty) {
                updateCache();
            }
        });

        $scope.$on('$routeChangeSuccess', function() {
            $timeout(function() { // wait for DOM, then restore scroll position
                $(window).scrollTop($scope.scrollPos);
                $scope.okSaveScroll = true;
            }); // no parameter, wait for DOM
        });

    }]);


parquetModule.directive('backImg', function () {
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
