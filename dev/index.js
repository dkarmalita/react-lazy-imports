const importModuleFailure = (err) => {
    throw new Error('Dynamic page loading failed', err);
};

export const importModuleSuccess = module => module.default();

export const importRouteSuccess = cb => module => cb(null, module.default);


class LazyModule {
    constructor(systemImport) {
        systemImport.then(this.doLoaded.bind(this), importModuleFailure);
        this.module = null;
        this.callback = null;
    }

    doLoaded(module) {
        this.module = module;
        if (this.callback != null) {
            this.callback(null, module.default);
        }
    }

    getModule(location, cb) {
        this.callback = cb;
        if (this.module != null) {
            cb(null, this.module.default);
        }
    }
}

/**
 * Supplies an object suitable for getComponent property of a dynamic route
 * definition.
 *
 * In details:
 * -------
 * It initializes the module loading during the initial call. The
 * module itself will be supplied just after loading (in a case when
 * it was required BEFORE the loading finished) or at once (in a case
 * when it was required AFTER the loading finished)
 * @param  {[promise]} systemImport) [returned by System.import of the requited route]
 * @return {[function]}     [getComponent(location, cb)]
 * @example getComponent: LazyRoute(System.import('./About'))
 */
export const LazyRoute = (systemImport) => {
    const lm = new LazyModule(systemImport);

    return lm.getModule.bind(lm);
};

/**
 * Helps to load a module as a separate bundle. Runs the default export as
 * a function just after loading.
 * @param  {[promise]} systemImport) [returned by System.import of the requited route]
 * @return {[function]}     [getComponent(location, cb)]
 * @example LazyCall(System.import('./app'));
 */
export const LazyCall = systemImport => systemImport.then(importModuleSuccess, importModuleFailure);

/**
 * Helps to load a route as a separate bundle.
 * @param  {[promise]} systemImport) [returned by System.import of the requited route]
 * @return {[function]}     [getComponent(location, cb)]
 * @example getComponent: RouteOnDemand(System.import('./Home'))
 */
export const RouteOnDemand = systemImport => (location, callback) => {
    systemImport.then(importRouteSuccess(callback), importModuleFailure);
};

