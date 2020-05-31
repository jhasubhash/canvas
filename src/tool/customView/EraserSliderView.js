import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    height: '100%',
  },
});

function valuetext(value) {
  return `${value}`;
}

export default function EraserSliderView(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.getLastEraserWidth());
  const whiteColor = {'r':255,'g':255,'b':255,'a':1};
  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    props.loader.setStrokeWidth(newValue);
  };

  React.useEffect(function() {
    props.loader.setStrokeColor(whiteColor);
    props.loader.setStrokeWidth(props.getLastEraserWidth());
    return function cleanup() {
      props.setLastEraserWidth(props.loader.getStrokeWidth());
    }
  }, [props, whiteColor]);

  return (
    <div className={classes.root}>
        <Slider
        defaultValue={value}
        orientation="vertical"
        value={typeof value === 'number' ? value : 0}
        onChange={handleSliderChange}
        aria-labelledby="vertical-slider"
        getAriaValueText={valuetext}
        step={0.25}
        min={0.25}
        max={100}
        valueLabelDisplay="auto"
        />
    </div>
  );
}
