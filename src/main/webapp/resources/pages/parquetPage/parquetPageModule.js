var parquetModule = angular.module("parquetModule", []);

var parquetOptions = new HeightOptions(1.7);

var ajaxErrorCallback = function (error) {
    console.log('data:' + error.data + ' | status:' + error.status
        + ' | message' + error.statusText);
}

parquetModule.directive('setParquetHeight', ['$rootScope',
    function ($rootScope) {
        return {
            restrict: 'A', // E = element, A = attribute, C = class, M =
            // comment
            link: function ($scope, element, attrs) {
                parquetOptions.element = element;
                setCardHeight(parquetOptions);

                $rootScope.$on('resize', function (e, eArgs) {
                    parquetOptions.element = element;
                    setCardHeight(parquetOptions);
                })
            }
        }
    }])

parquetModule.service('parquetService', ['$http', function ($http) {
    var notNull = function (item) {
        return item != null;
    }

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

    }

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
    'parquetService', function ($scope, $http, parquetService) {
        $scope.sortOptions = [{id: null, value: 'Alege...'}, {id: 1, value: 'Pret crescator'}, {id: 2, value: 'Pret descrescator'}];
        $scope.sortValue = null;
        $scope.producerOptions = [{id: null, value: 'Producator'}, {id: 'KAINDL', value: 'Kaindl'}, {id: 'EGGER', value: 'Egger'}, {
            id: 'EUROWOOD',
            value: 'Eurowood'
        }];
        $scope.producerValues = [];
        $scope.widthOptions = [{id: null, value: 'Grosime'}, {id: 8, value: '8 mm'}, {id: 10, value: '10 mm'}, {id: 11, value: '11 mm'}, {
            id: 12,
            value: '12 mm'
        }];
        $scope.codeValue = null;
        $scope.widthValues = [];
        $scope.classOptions = [{id: null, value: 'Clasa trafic'}, {id: 31, value: 'Cl31'}, {id: 32, value: 'Cl32'}, {id: 33, value: 'Cl33'}];
        $scope.classValues = [];
        $scope.cardsList = [];
        $scope.fancyBoxArray = [];

        $scope.currentPage = 1;
        $scope.allPagesDownloaded = false;
        $scope.listIsEmpty = false;
        $scope.lastFilterUsed = null;

        this.time = null;
        var me = this;

        var getParchet = function () {
            return parquetService.getParquet($scope.sortValue, $scope.producerValues, $scope.widthValues, $scope.classValues, $scope.currentPage, $scope.codeValue);
        }

        $scope.updateSort = function (timeout) {
            $scope.initializeParchet(timeout);
        }

        $scope.updateProducerFilter = function (timeout) {
            if ($scope.producerValues[0] != null) {
                $scope.initializeParchet(timeout);
            }
        }

        $scope.updateWidthFilter = function (timeout) {
            if ($scope.widthValues[0] != null) {
                $scope.initializeParchet(timeout);
            }
        }

        $scope.updateNameFilter = function (timeout) {
            $scope.initializeParchet(timeout);
        }

        $scope.updateClassFilter = function (timeout) {
            if ($scope.classValues[0] != null) {
                $scope.initializeParchet(timeout);
            }
        }

        $scope.nextPage = function () {
            if (!$scope.allPagesDownloaded) {
                getParchet().then(function (response) {
                    $scope.currentPage++;
                    var data = response.data;
                    if (data.length == 0) {
                        $scope.allPagesDownloaded = true;
                        return;
                    } else {
                        $scope.cardsList = $scope.cardsList.concat(response.data);
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
                $scope.currentPage = 1;
                getParchet().then(function (response) {
                    $scope.cardsList = response.data;
                    if (response.data.length == 0) {
                        $scope.listIsEmpty = true;
                    } else {
                        $scope.listIsEmpty = false;
                    }
                }, ajaxErrorCallback);
                me.time = null;
            }, delay);

        };

        $scope.initializeParchet(0);

    }]);

parquetModule.directive('openModal', function () {
    return {
        restrict: 'A', // E = element, A = attribute, C = class, M = comment
        link: function ($scope, element, attr) {
            if (attr.openParchetModal) {
                $scope[attr.openParchetModal] = function (data) {
                    element.openModal();
                }
            }
        }
    }
});
