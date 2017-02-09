const importModuleFailure = (error) => {
    throw new Error('Dynamic loading failed', error)
};

class LazyModule {

  constructor(si){
    si.then( this.doLoaded.bind(this), importModuleFailure );
    this.module = null;
    this.callback = null;
  }

  doLoaded(module){
    this.module = module;
    if(this.callback != null){
      this.callback(null, module.default)
    }
  }

  getModule(location, cb) {   // getComponent
    this.callback = cb;
    if(this.module != null){
      cb(null, this.module.default)
    }
  }
}

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
export const LazyRoute = (si) => {
  const lm = new LazyModule(si);
  return lm.getModule.bind(lm);
}

/**
 * Helps to load a module as a separate bundle. Runs the default export as
 * a function just after loading.
 * @param  {[promise]} si) [returned by System.import of the requited route]
 * @return {[function]}     [getComponent(location, cb)]
 * @example
 *  LazyCall(System.import('./app'));
 */
export const LazyCall = (si) => {
  si.then( (module) => module.default(), importModuleFailure );
}

/**
 * Helps to load a route as a separate bundle.
 * @param  {[promise]} si) [returned by System.import of the requited route]
 * @return {[function]}     [getComponent(location, cb)]
 * @example
 *  getComponent: RouteOnDemand(System.import('./Home'))
 */
export const RouteOnDemand = (si) => (location, cb) => {
  const importRouteSuccess = (cb) => (module) => cb(null, module.default);
  si.then( importRouteSuccess(cb), importModuleFailure );
}
