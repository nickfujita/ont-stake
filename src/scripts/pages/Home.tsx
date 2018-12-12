import * as React from 'react';
import { connect } from 'react-redux';
import * as dapi from '../actions/dapi';
import HeaderTitle from '../components/HeaderTitle';
import Connect from '../components/Connect';
import Account from '../components/Account';
import NextRound from '../components/NextRound';
import StakeTotals from '../components/StakeTotals';
import StakedNodes from '../components/StakedNodes';

class Home extends React.Component<any, any> {

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
          {this.renderRight()}
        </div>
      </div>
    );
  }

  renderHeader() {
    const { account, dispatch } = this.props;
    const { details, balances } = account;
    return (
      <div className='header'>
        <HeaderTitle/>
        {!details ? <Connect dispatch={dispatch} /> : (
          <Account
            address={details.address}
            label={details.label}
            ontBalance={balances && balances.ont}
            canDisconnect={true}
            dispatch={dispatch}
          />
        )}
      </div>
    );
  }

  renderLeft() {
    const { dapi, account } = this.props;
    const { stakeRoundInfo } = dapi;
    const { totalStake, rewards, unclaimed } = account;
    return (
      <div className='left-side'>
        <NextRound remainingBlocks={stakeRoundInfo && stakeRoundInfo.remainingBlocks}/>
        <StakeTotals
          totalStake={totalStake && totalStake.amount}
          rewards={rewards && rewards.amount}
          unclaimed={unclaimed && unclaimed.amount}
        />
      </div>
    );
  }

  renderRight() {
    const { dapi, account, dispatch } = this.props;
    const { nodeList } = dapi;
    const { stakes } = account;

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
