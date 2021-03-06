'use strict';

var softEtherAdminApp = angular.module('softEtherAdminApp', [
    'ngRoute',
    'commonModule',
    'dashboardModule',
    'serverModule',
    'configModule',
    'hubsModule'
]);

softEtherAdminApp.config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');

        $routeProvider.otherwise({redirectTo: '/dashboard'});
    }
]);

softEtherAdminApp.controller('HeaderController', function ($scope, $http) {
    var self = this;
    self.loading = true;
    
    $http.get('api/server/info').then(function(response) {
        var data = response.data;
        self.hostName = data['Host Name'];
        self.version = data['Version'];
    }, function (reason) {
        console.log(reason);        
        self.hostName = '-unknown-';
    }).finally(function () {
        self.loading = false;
    });

    // console.log($scope);
});

softEtherAdminApp.controller('SidebarController', function ($scope, $location) {
    var self = this;
    self.navData = [
        {
            isActive: false,
            path: 'dashboard',
            icon: 'pe-7s-graph',
            text: 'Dashboard'
        },
        {
            isActive: false,
            path: 'server',
            icon: 'pe-7s-server',
            text: 'Server'
        },
        {
            isActive: false,
            path: 'hubs',
            icon: 'pe-7s-share',
            text: 'Hubs'
        },
        {
            isActive: false,
            path: 'config',
            icon: 'pe-7s-config',
            text: 'Config'
        }
    ];

    $scope.$on('$locationChangeSuccess', function(event) {
        var path = $location.path();
        for (let i = 0; i < self.navData.length; i++) {
            if (path.startsWith('/' + self.navData[i].path)) {
                self.navData[i].isActive = true;
            }
            else {
                self.navData[i].isActive = false;
            }
        }
    });
});
