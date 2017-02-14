import * as lib from '../dev'

const mockModule = resolve => ({ default: () => resolve() });
const cb = (x, md) => md();

describe('dev.index', () => {

    it('LazyCall', () =>

        new Promise((resolve) => {
            lib.LazyCall(new Promise(fullfil => fullfil(mockModule(resolve))));
        }),
    );

    it('LazyCall (rejected)', () =>

        new Promise((resolve, reject) => {
            lib.LazyCall(new Promise((ok, fullfil) => fullfil()))
            .catch((e) => {
                if (e.message === 'Dynamic page loading failed') resolve();
                else reject();
            });
        }),
    );

    it('RouteOnDemand', () =>

        new Promise((resolve) => {
            lib.RouteOnDemand(new Promise(fullfil => fullfil(mockModule(resolve))))(null, cb);
        }),
    );

    it('LazyRoute (loading priority)', () =>
        new Promise((resolve) => {
            const getModule = lib.LazyRoute(new Promise(fullfil => fullfil(mockModule(resolve))));
            setTimeout(
                () => getModule(null, cb)
                , 20,
            );
        }),
    );

    it('LazyRoute (fetch priority)', () =>

        new Promise((resolve) => {
            lib.LazyRoute(new Promise(fullfil => setTimeout(() => fullfil(mockModule(resolve)), 20)))(null, cb);
        }),
    );
});
