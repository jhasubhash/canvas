import React from 'react';
import {CanvasModel} from './CanvasModel';
import './Canvas.css'

export default class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.canvasRef = React.createRef();
        this.canvasModel = new CanvasModel();
    }

    componentDidMount() {
        const canvas = this.canvasRef.current
        this.canvasModel.loadCanvasKit(canvas, this.props.loaderRef);
    }

    render(){
        return <div>
        <canvas className="canvas" id="canvas" ref={this.canvasRef} />
        </div>
    }
}