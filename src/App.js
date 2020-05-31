import React from 'react';
import './App.css';
import Canvas from "./canvas/Canvas";
import Toolbar from "./tool/Toolbar";
import {loader} from './core/Loader';

export default class App extends React.Component{

  render() {
    return <div>
      <div className='toolbar'>
      <Toolbar loaderRef={loader}/>
      </div>
      <div className='canvas'>
      <Canvas loaderRef={loader}/>
      </div>
    </div>
  };
}
