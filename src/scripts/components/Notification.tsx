import * as React from 'react';
import ClassNames from 'classnames';
import { removeNotification } from '../actions/notifications';

interface Props {
  dispatch: any;
  title: string;
  description: string;
  id: number;
}

interface State {
  isLeaving: boolean;
}

const initialState = {
  isLeaving: false,
};

export default class Notification extends React.Component<Props, State> {

  state = initialState;

  componentDidMount() {
    setTimeout(() => {
      this.setState({isLeaving: true});
    }, 4000);
  }

  render() {
    const { dispatch, title, description, id } = this.props;
    const { isLeaving } = this.state;

    return (
      <div className={ClassNames('notification', {'leaving': isLeaving})}>
        <div className='logo-steak' />
        <div className='information-container'>
          <div className='title'>{title}</div>
          <div className='description'>{description}</div>
        </div>
        <div
          className='close'
          onClick={() => dispatch(removeNotification(id))}
        >
          {'x'}
        </div>
      </div>
    );
  }
}
