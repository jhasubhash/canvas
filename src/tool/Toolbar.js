import React from 'react';
import { observable, computed, action, decorate } from "mobx";
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
import SliderView from './customView/SliderView';
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
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
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
            <div className={styles.slider}>
            {this.enableStrokeSlider && <SliderView/>}
            {this.enableEraserSlider && <SliderView/>}
            {this.enableOpacitySlider && <SliderView/>}
            {this.enableColorPalette && <ColorPickerView/>}
            </div>
        </div>
    }
}
decorate(Toolbar, {
    enableStrokeSlider: observable,
    handleStrokeSlider: action
  });
export default withStyles(uiStyles)(Toolbar);