import * as React from 'react';
import ClassNames from 'classnames';

interface Props {
  title: string;
  description: string;
  iconClass?: string;
  className?: string;
}

interface State {
  isActive: boolean;
}

const initialState = {
  isActive: false,
};

export default class Tooltip extends React.Component<Props, State> {

  state = initialState;

  render() {
    const {
      title,
      description,
      iconClass,
      className,
    } = this.props;

    const { isActive } = this.state;

    return (
      <div
        className={ClassNames('tooltip', className)}
      >
        <div
          className={ClassNames('icon', iconClass || 'logo-info')}
          onMouseOver={() => {
            this.setState({isActive: true});
          }}
          onMouseLeave={() => {
            this.setState({isActive: false});
          }}
        />

        {isActive ? (
          <div className='popup-container'>
            <div className='title'>{title}</div>
            <div className='description'>{description}</div>
          </div>
        ) : ''}

      </div>
    );
  }
}
