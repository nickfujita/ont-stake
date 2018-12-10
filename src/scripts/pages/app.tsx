import * as React from 'react';
import { connect } from 'react-redux';
import * as dapi from '../actions/dapi';
import HeaderTitle from '../components/HeaderTitle';
import Connect from '../components/Connect';
import Account from '../components/Account';

class App extends React.Component<any, any> {

  constructor(props, state) {
    super(props, state);
    props.dispatch(dapi.init());
  }

  render() {
    return (
      <div className='index'>
        {this.renderHeader()}
      </div>
    );
  }

  renderHeader() {
    const { account, balances, dispatch } = this.props;
    return (
      <div>
        <HeaderTitle/>
        {!account ? <Connect dispatch={dispatch} /> : (
          <Account
            address={account.address}
            label={account.label}
            ontBalance={balances.ont}
            canDisconnect={true}
            onDisconnect={() => dispatch(dapi.disconnect())}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);
