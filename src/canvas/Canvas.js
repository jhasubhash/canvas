import React from 'react';
import {CanvasModel} from './CanvasModel';
import logo from '../logo.svg';
import "./Canvas.css"

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
        <canvas className="canvas" id="canvas" ref={this.canvasRef} />
        </div>
    }
}