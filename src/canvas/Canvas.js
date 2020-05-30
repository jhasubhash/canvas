import React from 'react';
import {CanvasModel} from './CanvasModel';
import logo from '../logo.svg';

export default class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.canvasModel = new CanvasModel();
    }

    componentDidMount() {
        const canvas = this.canvasRef.current
        this.canvasModel.loadCanvasKit(canvas);
    }

    render(){
        return <div>
        <img src={logo} className="App-logo" alt="logo" />
        <canvas width="300" height="300" ref={this.canvasRef} />
        </div>
    }
}