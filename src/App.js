import React from 'react';
import './App.css';
import Canvas from "./canvas/Canvas";
import Toolbar from "./tool/Toolbar";

export default class App extends React.Component{

  render() {
    return <div>
      <div className='toolbar'>
      <Toolbar/>
      </div>
      <div className='canvas'>
      <Canvas/>
      </div>
    </div>
  };
}
