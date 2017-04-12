import React, {Component} from 'react'

/**
 * Takes Systam.import promise and return the component loaded. Till the component is loaded,
 * the null (which is an acceptable react component) is returning. After the loading finished,
 * the component will be updated with loaded one.
 * ------------------------------------------------------------------------------------------
 * @param  {[ Promise   ]} systemImport [ returneb by System.import ]
 * @return {[ Component ]}              [ null till the component is loaded and the component after it ]
 * @example
 *   const someComponent = LazyComponent(System.import('./component.jsx'))
 *   render(<someComponent/>)
 */
const test = ()=> 12
export const LazyComponent = (systemImport) => () => { // eslint-disable-line react/display-name
  class LC extends Component {
    constructor(props){
      // var t0 = performance.now();
      super(props)
      systemImport.then(
        module => {
          this.render = () => module.default()
          this.updater.enqueueForceUpdate(this)
          // refs:
          // https://github.com/facebook/react/blob/v0.14.7/src/isomorphic/modern/class/ReactComponent.js#L96
          // http://reactkungfu.com/2016/03/dive-into-react-codebase-handling-state-changes/
        },
        error => {throw new Error('LazyComponent loading failed', error)}
      )
      // var t1 = performance.now();
      // console.log("LazyComponent was created in " + (t1 - t0) + " milliseconds.");
    }
    render = () => null
  }
  return <LC/>
}

export default LazyComponent;
