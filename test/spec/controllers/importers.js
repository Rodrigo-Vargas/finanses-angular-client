'use strict';

describe('Controller: ImportersCtrl', function () {

  // load the controller's module
  beforeEach(module('finansesApp'));

  var ImportersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ImportersCtrl = $controller('ImportersCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(ImportersCtrl.awesomeThings.length).toBe(3);
  });
});
