var parquetModule = angular.module("parquetModule", []);

var parquetOptions = new HeightOptions(1.7);

var ajaxErrorCallback = function(error) {
	console.log('data:' + error.data + ' | status:' + error.status
			+ ' | message' + error.statusText);
}

parquetModule.directive('setParquetHeight', [ '$rootScope',
		function($rootScope) {
			return {
				restrict : 'A', // E = element, A = attribute, C = class, M =
				// comment
				link : function($scope, element, attrs) {
					parquetOptions.element = element;
					setCardHeight(parquetOptions);

					$rootScope.$on('resize', function(e, eArgs) {
						parquetOptions.element = element;
						setCardHeight(parquetOptions);
					})
				}
			}
		} ])

parquetModule.service('parquetService', [ '$http', function($http) {
	return {
		getParquet : function() {
			return $http.get('/parchet')
		}
	}
} ]);

parquetModule.controller('parquetController', [ '$scope', '$http',
		'parquetService', function($scope, $http, parquetService) {
			$scope.cardsList = [];
			$scope.fancyBoxArray = [];

			parquetService.getParquet().then(function(response) {
				$scope.cardsList = response.data;
				angular.forEach($scope.cardsList, function(value, key) {
					$scope.fancyBoxArray.push({
						href : value.url,
						title : ''
					});
				});
			}, ajaxErrorCallback);
		} ]);

parquetModule.directive('openModal', function() {
	return {
		restrict : 'A', // E = element, A = attribute, C = class, M = comment
		link : function($scope, element, attr) {
			if (attr.openParchetModal) {
				$scope[attr.openParchetModal] = function(data) {
					element.openModal();
				}
			}
		}
	}
});