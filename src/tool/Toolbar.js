import React from 'react';
// import { observable, computed, action, decorate } from "mobx";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { withStyles } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';
import PaletteIcon from '@material-ui/icons/Palette';
import OpacityIcon from '@material-ui/icons/Opacity';
import DeleteIcon from '@material-ui/icons/Delete';
import ColorizeIcon from '@material-ui/icons/Colorize';
import Eraser from 'mdi-material-ui/Eraser';
import Shape from 'mdi-material-ui/Shape';
import StrokeSliderView from './customView/StrokeSliderView';
import EraserSliderView from './customView/EraserSliderView';
import OpacitySliderView from './customView/OpacitySliderView';
import ColorPickerView from './customView/ColorPickerView';
import styles from './Toolbar.css'

const uiStyles = (theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
      width: "fit-content",
    },
});

class Toolbar extends React.Component {
    enableStrokeSlider = false;
    enableOpacitySlider = false;
    enableEraserSlider = false;
    enableColorPalette = false;
    lastColor = null;

    constructor(props) {
        super(props);
        this.lastColor = props.loaderRef.getStrokeColor();
        this.lastStrokeWidth = props.loaderRef.getStrokeWidth();
        this.lastEraserWidth = props.loaderRef.getStrokeWidth();
        this.lastOpacity = props.loaderRef.getOpacity();
    }

    setLastColor = (val) => {
        this.lastColor = val;
    }

    getLastColor = () => {
        return this.lastColor;
    }

    setLastOpacity = (val) => {
        this.lastOpacity = val;
    }

    getLastOpacity = () => {
        return this.lastOpacity;
    }
    getLastEraserWidth = () =>{
        return this.lastEraserWidth;
    }
    getLastStrokeWidth = () =>{
        return this.lastStrokeWidth;
    }
    setLastEraserWidth = (val) =>{
        this.lastEraserWidth = val;
    }
    setLastStrokeWidth = (val) =>{
        this.lastStrokeWidth = val;
    }

    componentDidMount() {
    }

    componentWillMount() {
        document.addEventListener("mousedown", this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClick, false);
    }

    handleClick = (e) => {
        if(this.node.contains(e.target)){
            return;
        }
        this.handleClickOutside();
    }

    handleClickOutside() {
        this.enableStrokeSlider = false;
        this.enableOpacitySlider = false;
        this.enableEraserSlider = false;
        this.enableColorPalette = false;
        this.forceUpdate();
    }

    handleStrokeSlider = () => {
        this.enableStrokeSlider = !this.enableStrokeSlider;
        this.enableOpacitySlider = false;
        this.enableEraserSlider = false;
        this.enableColorPalette = false;
        this.forceUpdate();
    }
    handleOpacitySlider = () => {
        this.enableOpacitySlider = !this.enableOpacitySlider;
        this.enableStrokeSlider = false;
        this.enableEraserSlider = false;
        this.enableColorPalette = false;
        this.forceUpdate();
    }
    handleEraserSlider = () => {
        this.enableEraserSlider = !this.enableEraserSlider;
        this.enableStrokeSlider = false;
        this.enableOpacitySlider = false;
        this.enableColorPalette = false;
        this.forceUpdate();
    }
    handleColorPalette = () => {
        this.enableStrokeSlider = false;
        this.enableOpacitySlider = false;
        this.enableEraserSlider = false;
        this.enableColorPalette = !this.enableColorPalette;
        this.forceUpdate();
    }
    
    render(){
        const { classes } = this.props;
        return <div className={classes.root}>
            <ButtonGroup
                orientation="vertical"
                color="primary"
                aria-label="vertical outlined primary button group"
                variant="contained"
            >
                <Button title="Pen" onClick={this.handleStrokeSlider}><CreateIcon/></Button>
                <Button title="Eraser" onClick={this.handleEraserSlider}><Eraser/></Button>
                <Button title="Opacity" onClick={this.handleOpacitySlider}><OpacityIcon/></Button>
                <Button title="Color Palette" onClick={this.handleColorPalette}><PaletteIcon/></Button>
                <Button title="Color Picker"><ColorizeIcon/></Button>
                <Button title="Shapes"><Shape/></Button>
                <Button title="Clear Canvas"><DeleteIcon/></Button>
            </ButtonGroup>
            <div className={styles.slider} ref = {node => this.node = node}>
            {this.enableStrokeSlider && <StrokeSliderView 
                                            setLastColor = {this.setLastColor} 
                                            getLastColor = {this.getLastColor}
                                            setLastStrokeWidth = {this.setLastStrokeWidth}
                                            getLastStrokeWidth = {this.getLastStrokeWidth}
                                            loader = {this.props.loaderRef}
                                        />}
            {this.enableEraserSlider && <EraserSliderView 
                                            setLastEraserWidth = {this.setLastEraserWidth}
                                            getLastEraserWidth = {this.getLastEraserWidth}
                                            loader={this.props.loaderRef}
                                        />}
            {this.enableOpacitySlider && <OpacitySliderView 
                                            setLastOpacity = {this.setLastOpacity}
                                            getLastOpacity = {this.getLastOpacity}
                                            loader={this.props.loaderRef}
                                        />}
            {this.enableColorPalette && <ColorPickerView loader={this.props.loaderRef}/>}
            </div>
        </div>
    }
}

export default withStyles(uiStyles)(Toolbar);