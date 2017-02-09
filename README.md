# React Lazy Imports helper

## Abstract

This tiny library made to support `System.import` and `require.insure` operations in ReactJS based applications with Webpack bundler involved. 

For now, it supports the following cases:

* While the application is initially loaded.
* While some route has to get a separate bundle and be loaded on demand.
* While some route has to get a separate bundle and be loaded "behind the scene".

## Installation

`npm i -S react-lazy-imports`

## Examples

* Splash screen
_index.jsx_
```js
// All of the imported above here will be included in the main,
// initially loading, bundle. Other parts will be moved
// out to a lazy-loading, dynamic bundle.
import React from 'react';
import { render } from 'react-dom';

import { LazyCall } from 'react-lazy-imports';

// The only custom layout which acts as a "splash-screen"
// till the whole application loaded. It's a good idea to make
// it as simple as possible.
import Splash from './pages/InitialLayout.page'

LazyCall(System.import('./app'))

render(
    <Splash/>,
    document.getElementById('root')
)
```

* Dinamic routing
_routes.jsx_
```
import React from 'react';
import { Router, Redirect } from 'react-router';
import { browserHistory } from 'react-router';

import { LazyRoute, RouteOnDemand } from 'react-lazy-imports';

import App from './App';

const routes = {
  component: App,
  childRoutes: [
    {
      path: '/',

      // This route will be loaded only if it'll be required.
      getComponent: RouteOnDemand(System.import('./Home'))
    },
    {
      path: 'about',

      // This route will be loaded just after the initial 
      // part of the application, "behinde the scene".
      getComponent: LazyRoute(System.import('./About'))
    },
    {
      path: '*',
      onEnter: (nextState, replaceState) => replaceState(
        { nextPathname: nextState.location.pathname }, 
        '/'
      )
    }
  ]
};

export default () => <Router history={browserHistory} routes={routes} />;
```
