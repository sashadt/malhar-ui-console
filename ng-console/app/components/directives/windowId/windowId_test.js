/*
* Copyright (c) 2013 DataTorrent, Inc. ALL Rights Reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/* global describe, before, beforeEach, after, afterEach, inject, it, expect, module */

'use strict';

describe('Directive: windowId', function () {

  var element, scope, rootScope, isoScope, compile, relativeTimestamp;

  beforeEach(module('templates-main'));

  beforeEach(function() {
    // define mock objects here
  });

  // load the directive's module
  beforeEach(module('app.components.directives.windowId'));

  beforeEach(inject(function ($compile, $rootScope, $filter) {
    // Cache these for reuse    
    rootScope = $rootScope;
    compile = $compile;
    relativeTimestamp = $filter('relativeTimestamp');

    // Other setup, e.g. helper functions, etc.

    // Set up the outer scope
    scope = $rootScope.$new();
    scope.myWindowId = {
      timestamp: new Date(),
      offset: 1000
    };

    // Define and compile the element
    element = angular.element('<div window-id="myWindowId"></div>');
    element = compile(element)(scope);
    scope.$digest();
    isoScope = element.isolateScope();
  }));

  it('should put the offset in the element', function() {
    expect( $.trim(element.text()) ).toEqual('1000');
  });

  it('should add a tooltip attribute when timestamp is defined', function() {
    expect(element.find('span').attr('tooltip')).toEqual(relativeTimestamp(scope.myWindowId.timestamp));
    delete scope.myWindowId.timestamp;
    scope.$digest();
    expect(element.find('span').attr('tooltip')).toBeFalsy();
  });

});