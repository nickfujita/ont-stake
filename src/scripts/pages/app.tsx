import * as React from 'react';
import { connect } from 'react-redux';
import * as dapi from '../actions/dapi';

class App extends React.Component<any, any> {

  constructor(props, state) {
    super(props, state);
    props.dispatch(dapi.init());
  }

  render() {
    return (
      <div className='index'>
        hello
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);
