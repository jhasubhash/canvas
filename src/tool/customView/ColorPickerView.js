import React from 'react';
import { ChromePicker } from 'react-color';

export default class ColorPickerView extends React.Component {
    state = {
        background: this.props.getLastColor(),
    };
    handleChangeComplete = (color) => {
        this.props.setLastColor(color.rgb);
        this.props.loader.setStrokeColor(color.rgb);
        this.setState({ background: color.rgb });
    };
    handleChange = (color, event) => {
        this.setState({ background: color.rgb });
    };
    render() {
        return <ChromePicker 
            color={ this.state.background }
            onChange={ this.handleChange }
            onChangeComplete={ this.handleChangeComplete }
        />;
    }
}