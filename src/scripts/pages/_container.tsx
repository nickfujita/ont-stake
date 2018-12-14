import * as React from 'react';
import { connect } from 'react-redux';
import * as dapi from '../actions/dapi';
import Notification from '../components/Notification';

class Container extends React.Component<any, any> {

  constructor(props, state) {
    super(props, state);
    props.dispatch(dapi.init());
  }

  render() {
    const {
      children,
      dispatch,
      notifications,
    } = this.props;
    return (
      <div className='app_content'>
        {children}
        <div className='notifications-container'>
          {notifications.map(({id, title, description}) => (
            <Notification
              key={'notification' + id}
              dispatch={dispatch}
              title={title}
              description={description}
              id={id}
            />
          ))}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Container);
