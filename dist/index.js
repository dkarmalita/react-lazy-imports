'use strict';var _createClass=function(){function a(b,c){for(var e,d=0;d<c.length;d++)e=c[d],e.enumerable=e.enumerable||!1,e.configurable=!0,'value'in e&&(e.writable=!0),Object.defineProperty(b,e.key,e)}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}();Object.defineProperty(exports,'__esModule',{value:!0});function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError('Cannot call a class as a function')}var importModuleFailure=function(a){throw new Error('Dynamic page loading failed',a)},importModuleSuccess=exports.importModuleSuccess=function(a){return a.default()},importRouteSuccess=exports.importRouteSuccess=function(a){return function(b){return a(null,b.default)}},LazyModule=function(){function a(b){_classCallCheck(this,a),b.then(this.doLoaded.bind(this),importModuleFailure),this.module=null,this.callback=null}return _createClass(a,[{key:'doLoaded',value:function doLoaded(b){this.module=b,null!=this.callback&&this.callback(null,b.default)}},{key:'getModule',value:function getModule(b,c){this.callback=c,null!=this.module&&c(null,this.module.default)}}]),a}(),LazyRoute=exports.LazyRoute=function(a){var b=new LazyModule(a);return b.getModule.bind(b)},LazyCall=exports.LazyCall=function(a){return a.then(importModuleSuccess,importModuleFailure)},RouteOnDemand=exports.RouteOnDemand=function(a){return function(b,c){a.then(importRouteSuccess(c),importModuleFailure)}};