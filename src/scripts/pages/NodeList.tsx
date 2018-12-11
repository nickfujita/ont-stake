import * as React from 'react';
import { connect } from 'react-redux';

class NodeList extends React.Component<any, any> {

  render() {
    return (
      <div className='node-list'>
        <div>
          <div>{'<'}</div>
          <div>{'<'}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    nodeList: state.dapi.nodeList,
  };
}

export default connect(mapStateToProps)(NodeList);
