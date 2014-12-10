(function () {
  'use strict';

  angular.module('app.organization', [
    'ngMessages',
    'ui.bootstrap',
    'ui.router',

    'dialogs.main',
    'dialogs.default-translations',

    'exceptionless.dialog',
    'exceptionless.organization',
    'exceptionless.pagination',
    'exceptionless.project',
    'exceptionless.projects',
    'exceptionless.refresh',
    'exceptionless.token',
    'exceptionless.user',
    'exceptionless.web-hook'
  ])
  .config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('app.organization', {
      abstract: true,
      url: '/organization',
      template: '<ui-view autoscroll="true" />'
    });

    $stateProvider.state('app.organization.list', {
      url: '/list',
      controller: 'organization.List',
      controllerAs: 'vm',
      templateUrl: 'app/organization/list/list.tpl.html'
    });

    $stateProvider.state('app.organization.manage', {
      url: '/:id/manage',
      controller: 'organization.Manage',
      controllerAs: 'vm',
      templateUrl: 'app/organization/manage/manage.tpl.html'
    });
  }]);
}());
