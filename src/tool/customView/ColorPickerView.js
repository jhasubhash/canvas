import React from 'react';
import { ChromePicker } from 'react-color';

export default class ColorPickerView extends React.Component {
    color = "#ffffffff";//value.rgb;  
    state = {
        background: this.color,
    };
    handleChangeComplete = (color) => {
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