import React from 'react';
// import { observable, computed, action, decorate } from "mobx";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { withStyles } from '@material-ui/core/styles';
import CreateIcon from '@material-ui/icons/Create';
import PaletteIcon from '@material-ui/icons/Palette';
import UndoIcon from '@material-ui/icons/Undo';
import PanToolIcon from '@material-ui/icons/PanTool';
/*import OpacityIcon from '@material-ui/icons/Opacity';
import ColorizeIcon from '@material-ui/icons/Colorize';
import Shape from 'mdi-material-ui/Shape';
import OpacitySliderView from './customView/OpacitySliderView';*/
import DeleteIcon from '@material-ui/icons/Delete';
import Eraser from 'mdi-material-ui/Eraser';
import StrokeSliderView from './customView/StrokeSliderView';
import EraserSliderView from './customView/EraserSliderView';
import ColorPickerView from './customView/ColorPickerView';
import './Toolbar.css'

const uiStyles = (theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      '& > *': {
        margin: theme.spacing(1),
      },
      width: 'fit-content'
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
        this.state = {
            view: 'undefined'
        };
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

    handleClearCanvas = () => {
        this.props.loaderRef.clearCanvas();
    }

    handleUndo = ()=> {
        this.props.loaderRef.undo();
    }

    handleChange = (event, nextView) => {
        if(nextView === 'Pan' && this.state.view !== 'Pan')
            this.handleStartPan();
        if(nextView !== 'Pan' && this.state.view === 'Pan')
            this.handleEndPan();
        if(nextView === 'Color Palette' || nextView === 'Clear Canvas')
            this.setState({ view: 'Pen'});
        else if(nextView !== null)
            this.setState({ view: nextView});
    };

    handleStartPan = () =>{
        this.props.loaderRef.startPan();
    }
    handleEndPan = () =>{
        this.props.loaderRef.endPan();
    }

    render(){
        const { classes } = this.props;
        return <div className={'rowC'}>
            <div className={classes.root}>
                <ToggleButtonGroup
                    orientation="vertical"
                    aria-label="vertical outlined primary button group"
                    variant="contained"
                    value={this.state.view} 
                    exclusive 
                    onChange={this.handleChange}
                >
                    <ToggleButton title="Pen" value="Pen" onClick={this.handleStrokeSlider} ><CreateIcon/></ToggleButton>
                    <ToggleButton title="Eraser" value="Eraser" onClick={this.handleEraserSlider}><Eraser/></ToggleButton>
                    {/*<ToggleButton title="Pan" value="Pan"><PanToolIcon/></ToggleButton>*/}
                    {/*<Button title="Opacity" onClick={this.handleOpacitySlider}><OpacityIcon/></Button>*/}
                    <ToggleButton title="Color Palette" value="Color Palette" onClick={this.handleColorPalette}><PaletteIcon/></ToggleButton>
                    {/*<Button title="Color Picker"><ColorizeIcon/></Button>
                    <Button title="Shapes"><Shape/></Button>*/}
                    <ToggleButton title="Clear Canvas" value="Clear Canvas" onClick={this.handleClearCanvas} ><DeleteIcon/></ToggleButton>
                </ToggleButtonGroup>
                <ToggleButtonGroup
                    orientation="vertical"
                    aria-label="vertical outlined primary button group"
                    variant="contained"
                >
                    <ToggleButton title="Undo" onClick={this.handleUndo}><UndoIcon/></ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div className={'sliderC'} ref = {node => this.node = node}>
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
                {/*this.enableOpacitySlider && <OpacitySliderView 
                                                setLastOpacity = {this.setLastOpacity}
                                                getLastOpacity = {this.getLastOpacity}
                                                loader={this.props.loaderRef}
                />*/}
                {this.enableColorPalette && <ColorPickerView 
                                                setLastColor = {this.setLastColor} 
                                                getLastColor = {this.getLastColor}
                                                loader={this.props.loaderRef}
                                            />}
            </div>
        </div>
    }
}

export default withStyles(uiStyles)(Toolbar);