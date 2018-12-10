import * as React from 'react';
import { connect } from '../actions/dapi';

interface Props {
  dispatch: any;
}

export default class Connect extends React.Component<Props, any> {

  render() {
    const { dispatch } = this.props;
    return (
      <div
        className='connect-o3'
        onClick={() => dispatch(connect)}
      />
    );
  }
}
