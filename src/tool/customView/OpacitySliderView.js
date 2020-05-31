import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    height: 250,
  },
});

function valuetext(value) {
  return `${value}`;
}

export default function OpacitySliderView(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.getLastOpacity());

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    props.loader.setOpacity(newValue);
  };

  React.useEffect(function() {
    props.loader.setOpacity(props.getLastOpacity());
    return function cleanup() {
      props.getLastOpacity(props.loader.getOpacity());
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
