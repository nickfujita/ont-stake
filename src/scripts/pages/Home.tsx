import * as React from 'react';
import { connect } from 'react-redux';
import * as dapi from '../actions/dapi';
import HeaderTitle from '../components/HeaderTitle';
import Connect from '../components/Connect';
import Account from '../components/Account';
import NextRound from '../components/NextRound';
import StakeTotals from '../components/StakeTotals';
import StakedNodes from '../components/StakedNodes';

class App extends React.Component<any, any> {

  constructor(props, state) {
    super(props, state);
    props.dispatch(dapi.init());
  }

  render() {
    return (
      <div className='home'>
        {this.renderHeader()}
        <div className='body-container'>
          {this.renderLeft()}
          {this.renderright()}
        </div>
      </div>
    );
  }

  renderHeader() {
    const { account, balances, dispatch } = this.props;
    return (
      <div className='header'>
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

  renderLeft() {
    const { dapi } = this.props;
    const { stakeRoundInfo } = dapi;
    return (
      <div className='left-side'>
        <NextRound remainingBlocks={stakeRoundInfo && stakeRoundInfo.remainingBlocks}/>
        <StakeTotals />
      </div>
    );
  }

  renderright() {
    return (
      <div className='right-side'>
        <StakedNodes />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(App);
