import * as React from 'react';
import { connect } from 'react-redux';
import HeaderTitle from '../components/HeaderTitle';
import Connect from '../components/Connect';
import Account from '../components/Account';
import NextRound from '../components/NextRound';
import StakeTotals from '../components/StakeTotals';
import StakedNodes from '../components/StakedNodes';
import { getCache } from '../utils/cache';

class Home extends React.Component<any, any> {

  render() {
    return (
      <div className='home'>
        {this.renderHeader()}
        <div className='body-container'>
          {this.renderLeft()}
          {this.renderRight()}
        </div>
      </div>
    );
  }

  renderHeader() {
    const { dispatch, account, cache } = this.props;
    const address = account && account.address;
    const label = account && account.label;
    const balances = getCache(cache, account, 'balances');

    return (
      <div className='header'>
        <HeaderTitle/>
        {!address ? <Connect dispatch={dispatch} /> : (
          <Account
            address={address}
            label={label}
            ontBalance={balances.ont}
            canDisconnect={true}
            dispatch={dispatch}
          />
        )}
      </div>
    );
  }

  renderLeft() {
    const { stakeRoundInfo, account, cache, dispatch } = this.props;
    const totalStake = getCache(cache, account, 'total_stake');
    const rewards = getCache(cache, account, 'rewards');
    const unclaimed = getCache(cache, account, 'unclaimed');

    return (
      <div className='left-side'>
        <NextRound remainingBlocks={stakeRoundInfo && stakeRoundInfo.remainingBlocks}/>
        <StakeTotals
          totalStake={totalStake.amount}
          rewards={rewards.amount}
          unclaimed={unclaimed.amount}
          dispatch={dispatch}
        />
      </div>
    );
  }

  renderRight() {
    const { nodeList, account, cache, dispatch } = this.props;
    const stakes = getCache(cache, account, 'stakes');

    return (
      <div className='right-side'>
        <StakedNodes
          dispatch={dispatch}
          nodeList={nodeList}
          stakes={stakes}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Home);
