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

export default function StrokeSliderView(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.getLastStrokeWidth());
  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    props.loader.setStrokeWidth(newValue);
  };

  React.useEffect(function() {
    props.loader.setStrokeColor(props.getLastColor());
    props.loader.setStrokeWidth(props.getLastStrokeWidth());
    return function cleanup() {
      props.setLastColor(props.loader.getStrokeColor());
      props.setLastStrokeWidth(props.loader.getStrokeWidth());
    }
  }, [props]);

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
