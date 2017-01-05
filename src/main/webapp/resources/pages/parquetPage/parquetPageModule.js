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

    var createJsonBody = function (sort, producers, widths, classes) {
        producers = producers.filter(notNull);
        widths = widths.filter(notNull);
        classes = classes.filter(notNull);

        return {
            'producers': producers,
            'sort': sort,
            'widths': widths,
            'classes': classes
        };

    }

    return {
        getParquet: function (sort, producers, widths, classes) {
            return $http({
                url: '/parchet',
                data: createJsonBody(sort, producers, widths, classes),
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
        $scope.widthValues = [];
        $scope.classOptions = [{id: null, value: 'Clasa trafic'}, {id: 31, value: 'Cl31'}, {id: 32, value: 'Cl32'}, {id: 33, value: 'Cl33'}];
        $scope.classValues = [];
        $scope.cardsList = [];
        $scope.fancyBoxArray = [];

        this.time = null;
        var me = this;

        var initializeParchet = function () {
            parquetService.getParquet($scope.sortValue, $scope.producerValues, $scope.widthValues, $scope.classValues).then(function (response) {
                $scope.cardsList = response.data;
                angular.forEach($scope.cardsList, function (value, key) {
                    $scope.fancyBoxArray.push({
                        href: value.url,
                        title: ''
                    });
                });
            }, ajaxErrorCallback);
        }

        $scope.loadParchet = function (delay) {
            // daca load parchet e programata sa execute functia din timeout atunci oprim executia functiei din timeout
            if (me.time) {
                clearTimeout(me.time);
            }
            // salvez o noua referinta la urmatoru timeout ca sa ii pot da clear in caz ca mai dai click pe ceva in urmatoarele 2 secunde
            me.time = setTimeout(function () {
                initializeParchet();
                me.time = null
            }, delay);

        };

        initializeParchet();

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
