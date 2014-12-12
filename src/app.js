(function () {
  'use strict';

  angular.module('app', [
    'angular-filters',
    'angular-loading-bar',
    'angular-rickshaw',
    'angular-stripe',
    'cfp.hotkeys',
    'checklist-model',
    'debounce',
    'ngAnimate',
    'restangular',
    'satellizer',
    'ui.bootstrap',
    'ui.gravatar',
    'ui.utils',
    'ui.router',

    'dialogs.main',
    'dialogs.default-translations',

    'exceptionless.auth',
    'exceptionless.auto-active',
    'exceptionless.billing',
    'exceptionless.date-filter',
    'exceptionless.event',
    'exceptionless.events',
    'exceptionless.filter',
    'exceptionless.notification',
    'exceptionless.project-filter',
    'exceptionless.refresh',
    'exceptionless.search-filter',
    'exceptionless.signalr',
    'exceptionless.stack',
    'exceptionless.stacks',
    'exceptionless.stat',
    'exceptionless.ui-nav',
    'exceptionless.ui-scroll',
    'exceptionless.ui-shift',
    'exceptionless.ui-toggle-class',
    'exceptionless.user',
    'app.account',
    'app.admin',
    'app.auth',
    'app.config',
    'app.event',
    'app.organization',
    'app.project',
    'app.stack'
  ])
  .config(['$stateProvider', '$uiViewScrollProvider', '$urlRouterProvider', 'dialogsProvider', 'RestangularProvider', 'BASE_URL', 'stripeProvider', 'STRIPE_PUBLISHABLE_KEY', function ($stateProvider, $uiViewScrollProvider, $urlRouterProvider, dialogsProvider, RestangularProvider, BASE_URL, stripeProvider, STRIPE_PUBLISHABLE_KEY) {
    $uiViewScrollProvider.useAnchorScroll();

    dialogsProvider.setSize('md');

    RestangularProvider.setBaseUrl(BASE_URL);
    RestangularProvider.setFullResponse(true);

    stripeProvider.setPublishableKey(STRIPE_PUBLISHABLE_KEY);

    $urlRouterProvider.otherwise('/type/error/dashboard');
    $stateProvider.state('app', {
      abstract: true,
      templateUrl: 'app/app.tpl.html',
      controller: 'App',
      controllerAs: 'appVm'
    });

    $stateProvider.state('app.dashboard', {
      url: '/dashboard',
      controller: 'app.Dashboard',
      controllerAs: 'vm',
      templateUrl: 'app/dashboard.tpl.html',
      onEnter: ['filterService', function (filterService) {
        filterService.setOrganizationId(null, true);
        filterService.setProjectId(null, true);
      }]
    });

    $stateProvider.state('app.project-dashboard', {
      url: '/project/:projectId/dashboard',
      controller: 'app.Dashboard',
      controllerAs: 'vm',
      templateUrl: 'app/dashboard.tpl.html',
      onEnter: ['$stateParams', 'filterService', function ($stateParams, filterService) {
        filterService.setProjectId($stateParams.projectId, true);
      }]
    });

    $stateProvider.state('app.project-type-dashboard', {
      url: '/project/:projectId/:type/dashboard',
      controller: 'app.Dashboard',
      controllerAs: 'vm',
      templateUrl: 'app/dashboard.tpl.html',
      onEnter: ['$stateParams', 'filterService', function ($stateParams, filterService) {
        filterService.setProjectId($stateParams.projectId, true);
        filterService.setEventType($stateParams.type, true);
      }],
      onExit: ['filterService', function (filterService) {
        filterService.setEventType(null, true);
      }]
    });

    $stateProvider.state('app.organization-dashboard', {
      url: '/organization/:organizationId/dashboard',
      controller: 'app.Dashboard',
      controllerAs: 'vm',
      templateUrl: 'app/dashboard.tpl.html',
      onEnter: ['$stateParams', 'filterService', function ($stateParams, filterService) {
        filterService.setOrganizationId($stateParams.organizationId, true);
        filterService.setEventType(null, true);
      }]
    });

    $stateProvider.state('app.organization-type-dashboard', {
      url: '/organization/:organizationId/:type/dashboard',
      controller: 'app.Dashboard',
      controllerAs: 'vm',
      templateUrl: 'app/dashboard.tpl.html',
      onEnter: ['$stateParams', 'filterService', function ($stateParams, filterService) {
        filterService.setOrganizationId($stateParams.organizationId, true);
        filterService.setEventType($stateParams.type, true);
      }],
      onExit: ['filterService', function (filterService) {
        filterService.setEventType(null, true);
      }]
    });

    $stateProvider.state('app.type-dashboard', {
      url: '/type/:type/dashboard',
      controller: 'app.Dashboard',
      controllerAs: 'vm',
      templateUrl: 'app/dashboard.tpl.html',
      onEnter: ['$stateParams', 'filterService', function ($stateParams, filterService) {
        filterService.setOrganizationId(null, true);
        filterService.setProjectId(null, true);
        filterService.setEventType($stateParams.type, true);
      }],
      onExit: ['filterService', function (filterService) {
        filterService.setEventType(null, true);
      }]
    });

    $stateProvider.state('app.frequent', {
      url: '/frequent',
      controller: 'app.Frequent',
      controllerAs: 'vm',
      templateUrl: 'app/frequent.tpl.html',
      onEnter: ['filterService', function (filterService) {
        filterService.setOrganizationId(null, true);
        filterService.setProjectId(null, true);
      }]
    });

    $stateProvider.state('app.project-frequent', {
      url: '/project/:projectId/frequent',
      controller: 'app.Frequent',
      controllerAs: 'vm',
      templateUrl: 'app/frequent.tpl.html',
      onEnter: ['$stateParams', 'filterService', function ($stateParams, filterService) {
        filterService.setProjectId($stateParams.projectId, true);
      }]
    });

    $stateProvider.state('app.project-type-frequent', {
      url: '/project/:projectId/:type/frequent',
      controller: 'app.Frequent',
      controllerAs: 'vm',
      templateUrl: 'app/frequent.tpl.html',
      onEnter: ['$stateParams', 'filterService', function ($stateParams, filterService) {
        filterService.setProjectId($stateParams.projectId, true);
        filterService.setEventType($stateParams.type, true);
      }],
      onExit: ['filterService', function (filterService) {
        filterService.setEventType(null, true);
      }]
    });

    $stateProvider.state('app.organization-frequent', {
      url: '/organization/:organizationId/frequent',
      controller: 'app.Frequent',
      controllerAs: 'vm',
      templateUrl: 'app/frequent.tpl.html',
      onEnter: ['$stateParams', 'filterService', function ($stateParams, filterService) {
        filterService.setOrganizationId($stateParams.organizationId, true);
      }]
    });

    $stateProvider.state('app.organization-type-frequent', {
      url: '/organization/:organizationId/:type/frequent',
      controller: 'app.Frequent',
      controllerAs: 'vm',
      templateUrl: 'app/frequent.tpl.html',
      onEnter: ['$stateParams', 'filterService', function ($stateParams, filterService) {
        filterService.setOrganizationId($stateParams.organizationId, true);
        filterService.setEventType($stateParams.type, true);
      }],
      onExit: ['filterService', function (filterService) {
        filterService.setEventType(null, true);
      }]
    });

    $stateProvider.state('app.type-frequent', {
      url: '/type/:type/frequent',
      controller: 'app.Frequent',
      controllerAs: 'vm',
      templateUrl: 'app/frequent.tpl.html',
      onEnter: ['$stateParams', 'filterService', function ($stateParams, filterService) {
        filterService.setOrganizationId(null, true);
        filterService.setProjectId(null, true);
        filterService.setEventType($stateParams.type, true);
      }],
      onExit: ['filterService', function (filterService) {
        filterService.setEventType(null, true);
      }]
    });

    $stateProvider.state('app.new', {
      url: '/new',
      controller: 'app.New',
      controllerAs: 'vm',
      templateUrl: 'app/new.tpl.html',
      onEnter: ['filterService', function (filterService) {
        filterService.setOrganizationId(null, true);
        filterService.setProjectId(null, true);
      }]
    });

    $stateProvider.state('app.project-new', {
      url: '/project/:projectId/new',
      controller: 'app.New',
      controllerAs: 'vm',
      templateUrl: 'app/new.tpl.html',
      onEnter: ['$stateParams', 'filterService', function ($stateParams, filterService) {
        filterService.setProjectId($stateParams.projectId, true);
      }]
    });

    $stateProvider.state('app.project-type-new', {
      url: '/project/:projectId/:type/new',
      controller: 'app.New',
      controllerAs: 'vm',
      templateUrl: 'app/new.tpl.html',
      onEnter: ['$stateParams', 'filterService', function ($stateParams, filterService) {
        filterService.setProjectId($stateParams.projectId, true);
        filterService.setEventType($stateParams.type, true);
      }],
      onExit: ['filterService', function (filterService) {
        filterService.setEventType(null, true);
      }]
    });

    $stateProvider.state('app.organization-new', {
      url: '/organization/:organizationId/new',
      controller: 'app.New',
      controllerAs: 'vm',
      templateUrl: 'app/new.tpl.html',
      onEnter: ['$stateParams', 'filterService', function ($stateParams, filterService) {
        filterService.setOrganizationId($stateParams.organizationId, true);
      }]
    });

    $stateProvider.state('app.organization-type-new', {
      url: '/organization/:organizationId/:type/new',
      controller: 'app.New',
      controllerAs: 'vm',
      templateUrl: 'app/new.tpl.html',
      onEnter: ['$stateParams', 'filterService', function ($stateParams, filterService) {
        filterService.setOrganizationId($stateParams.organizationId, true);
        filterService.setEventType($stateParams.type, true);
      }],
      onExit: ['filterService', function (filterService) {
        filterService.setEventType(null, true);
      }]
    });

    $stateProvider.state('app.type-new', {
      url: '/type/:type/new',
      controller: 'app.New',
      controllerAs: 'vm',
      templateUrl: 'app/new.tpl.html',
      onEnter: ['$stateParams', 'filterService', function ($stateParams, filterService) {
        filterService.setOrganizationId(null, true);
        filterService.setProjectId(null, true);
        filterService.setEventType($stateParams.type, true);
      }],
      onExit: ['filterService', function (filterService) {
        filterService.setEventType(null, true);
      }]
    });

    $stateProvider.state('app.recent', {
      url: '/recent',
      controller: 'app.Recent',
      controllerAs: 'vm',
      templateUrl: 'app/recent.tpl.html',
      onEnter: ['filterService', function (filterService) {
        filterService.setOrganizationId(null, true);
        filterService.setProjectId(null, true);
      }]
    });

    $stateProvider.state('app.project-recent', {
      url: '/project/:projectId/recent',
      controller: 'app.Recent',
      controllerAs: 'vm',
      templateUrl: 'app/recent.tpl.html',
      onEnter: ['$stateParams', 'filterService', function ($stateParams, filterService) {
        filterService.setProjectId($stateParams.projectId, true);
      }]
    });

    $stateProvider.state('app.project-type-recent', {
      url: '/project/:projectId/:type/recent',
      controller: 'app.Recent',
      controllerAs: 'vm',
      templateUrl: 'app/recent.tpl.html',
      onEnter: ['$stateParams', 'filterService', function ($stateParams, filterService) {
        filterService.setProjectId($stateParams.projectId, true);
        filterService.setEventType($stateParams.type, true);
      }],
      onExit: ['filterService', function (filterService) {
        filterService.setEventType(null, true);
      }]
    });

    $stateProvider.state('app.organization-recent', {
      url: '/organization/:organizationId/recent',
      controller: 'app.Recent',
      controllerAs: 'vm',
      templateUrl: 'app/recent.tpl.html',
      onEnter: ['$stateParams', 'filterService', function ($stateParams, filterService) {
        filterService.setOrganizationId($stateParams.organizationId, true);
      }]
    });

    $stateProvider.state('app.organization-type-recent', {
      url: '/organization/:organizationId/:type/recent',
      controller: 'app.Recent',
      controllerAs: 'vm',
      templateUrl: 'app/recent.tpl.html',
      onEnter: ['$stateParams', 'filterService', function ($stateParams, filterService) {
        filterService.setOrganizationId($stateParams.organizationId, true);
        filterService.setEventType($stateParams.type, true);
      }],
      onExit: ['filterService', function (filterService) {
        filterService.setEventType(null, true);
      }]
    });

    $stateProvider.state('app.type-recent', {
      url: '/type/:type/recent',
      controller: 'app.Recent',
      controllerAs: 'vm',
      templateUrl: 'app/recent.tpl.html',
      onEnter: ['$stateParams', 'filterService', function ($stateParams, filterService) {
        filterService.setOrganizationId(null, true);
        filterService.setProjectId(null, true);
        filterService.setEventType($stateParams.type, true);
      }],
      onExit: ['filterService', function (filterService) {
        filterService.setEventType(null, true);
      }]
    });
  }]);
}());
