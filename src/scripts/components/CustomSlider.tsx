import * as React from 'react';

interface Props {
  className?: string;
  defaultValue?: string;
  min?: string;
  max: string;
  step: string;
  onChange: any;
}

export default class CustomSlider extends React.Component<Props> {

  render() {
    const {
      defaultValue,
      onChange,
      min,
      max,
      step,
    } = this.props;

    return (
      <div className='custom-slider'>
        <input
          className='slider'
          type='range'
          min={min || '0'}
          max={max || '1'}
          step={step || '0.01'}
          defaultValue={defaultValue || '0'}
          onChange={e => {
            onChange(e.target.value);
          }}
        />
        <div className='flex-container'>
          <div className='flex-grow-container'>{min || '0'}</div>
          <div>{max || '0'}</div>
        </div>
      </div>
    );
  }
}
