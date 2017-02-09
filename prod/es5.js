'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var importModuleFailure = function importModuleFailure(error) {
  throw new Error('Dynamic loading failed', error);
};

var LazyModule = function () {
  function LazyModule(si) {
    _classCallCheck(this, LazyModule);

    si.then(this.doLoaded.bind(this), importModuleFailure);
    this.module = null;
    this.callback = null;
  }

  _createClass(LazyModule, [{
    key: 'doLoaded',
    value: function doLoaded(module) {
      this.module = module;
      if (this.callback != null) {
        this.callback(null, module.default);
      }
    }
  }, {
    key: 'getModule',
    value: function getModule(location, cb) {
      // getComponent
      this.callback = cb;
      if (this.module != null) {
        cb(null, this.module.default);
      }
    }
  }]);

  return LazyModule;
}();

/**
 * This helper supplies an object suitable for getComponent property
 * of a dynamic route definition.
 * In details:
 * -------
 * It initializes the module loading during the initial call. The
 * module itself will be supplied just after loading (in a case when
 * it was required BEFORE the loading finished) or at once (in a case
 * when it was required AFTER the loading finished)
 * @param  {[promise]} si) [returned by System.import of the requited route]
 * @return {[function]}     [getComponent(location, cb)]
 * @example
 *  getComponent: LazyRoute(System.import('./About'))
 */


var LazyRoute = exports.LazyRoute = function LazyRoute(si) {
  var lm = new LazyModule(si);
  return lm.getModule.bind(lm);
};

/**
 * Helps to load a module as a separate bundle. Runs the default export as
 * a function just after loading.
 * @param  {[promise]} si) [returned by System.import of the requited route]
 * @return {[function]}     [getComponent(location, cb)]
 * @example
 *  LazyCall(System.import('./app'));
 */
var LazyCall = exports.LazyCall = function LazyCall(si) {
  si.then(function (module) {
    return module.default();
  }, importModuleFailure);
};

/**
 * Helps to load a route as a separate bundle.
 * @param  {[promise]} si) [returned by System.import of the requited route]
 * @return {[function]}     [getComponent(location, cb)]
 * @example
 *  getComponent: RouteOnDemand(System.import('./Home'))
 */
var RouteOnDemand = exports.RouteOnDemand = function RouteOnDemand(si) {
  return function (location, cb) {
    var importRouteSuccess = function importRouteSuccess(cb) {
      return function (module) {
        return cb(null, module.default);
      };
    };
    si.then(importRouteSuccess(cb), importModuleFailure);
  };
};