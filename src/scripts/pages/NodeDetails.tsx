import * as React from 'react';
import { connect } from 'react-redux';
import { numberWithCommas, formatPercent } from '../utils/numbers';
import Account from '../components/Account';
import { getCache } from '../utils/cache';
import StakeDistroBar from '../components/StakeDistroBar';
import { getNodeDistro } from '../utils/node';
import StakeDistroPortion from '../components/StakeDistroPortion';
import NextRound from '../components/NextRound';
import Help from '../components/Help';
import Connect from '../components/Connect';
import ClassNames from 'classnames';

interface Props {
  nodeDetails: any;
  nodeList: any[];
  router: any;
  account: any;
  dispatch: any;
  cache: any;
  stakeRoundInfo: any;
  params: any;
}

class NodeDetails extends React.Component<Props, any> {

  render() {
    const { nodeList, cache, account, stakeRoundInfo, params } = this.props;
    const { publicKey } = params;
    const userStakes = getCache(cache, account, 'stakes');
    const userStake = userStakes && userStakes[publicKey];
    const {details = {}, index = 0} = nodeList.reduce((accum, node, index) => {
      if (accum.details) {
        return accum;
      }

      if (node.publicKey === publicKey) {
        return {
          details: node,
          index,
        };
      }

      return accum;
    }, {});

    const node = getNodeDistro(details, userStakes);

    return (
      <div className='node-details'>

        {this.renderHeader()}

        <div className='content-container'>
          {this.renderNodeInfo({
            node,
            index,
            remainingBlocks: stakeRoundInfo && stakeRoundInfo.remainingBlocks,
          })}

          {this.renderUserStake({userStake})}
        </div>

      </div>
    );
  }

  renderHeader() {
    const { dispatch, router, account, cache } = this.props;
    const address = account && account.address;
    const label = account && account.label;
    const balances = getCache(cache, account, 'balances');
    const { goBack } = router;

    return (
      <div className='header'>

        <div
          className='link'
          onClick={() => goBack()}
        >
          {'< Back'}
        </div>

        {!address ? <Connect dispatch={dispatch} /> : (
          <Account
            address={address}
            label={label}
            ontBalance={balances && balances.ont}
            canDisconnect={false}
            dispatch={dispatch}
          />
        )}

      </div>
    );
  }

  renderNodeInfo({node, index, remainingBlocks}) {
    const {
      userRewardsAllocation,
      totalStake,
      maxStake,
      ownerStake,
      ownerPercentage,
      usersStake,
      activeUserStake,
      usersPercentage,
      activeUserPercentage,
      openPercentage,
      stakePercentFilled,
      name,
    } = node;

    return node && (
      <div className='node-info'>

        <div className='info-header'>
          <div className='focus-text'>{name}</div>
          <div className='flex-container row'>
            <div className='flex-grow-container'>{'Rank'}</div>
            <div>{index + 1}</div>
          </div>
          <div className='flex-container row'>
            <div className='flex-grow-container'>{'Contributor rewards'}</div>
            <div>{formatPercent(userRewardsAllocation)}</div>
          </div>
        </div>

        <div className='distro-info'>

          <div className='focus-text'>{`${formatPercent(stakePercentFilled)} staked`}</div>

          <div className='row'>{`${numberWithCommas(totalStake)} / ${numberWithCommas(maxStake)} ONT`}</div>

          <div className='row stake-distro-container'>
            <StakeDistroBar
              ownerPercentage={ownerPercentage}
              usersPercentage={usersPercentage}
              activeUserPercentage={activeUserPercentage}
              openPercentage={openPercentage}
            />
            <div className='flex-container row'>
              <div className='flex-grow-container'>{'0'}</div>
              <div>{numberWithCommas(maxStake)}</div>
            </div>
          </div>

          <StakeDistroPortion
            className='row'
            color='purple'
            label='Node owners'
            amount={ownerStake}
            percentage={ownerPercentage}
          />

          <StakeDistroPortion
            className='row'
            color='blue'
            label='Other contributions'
            amount={usersStake}
            percentage={usersPercentage}
          />

          <StakeDistroPortion
            className='row'
            color='green'
            label='Your contributions'
            amount={activeUserStake}
            percentage={activeUserPercentage}
          />

          <StakeDistroPortion
            className='row'
            color='grey'
            label='Open'
            amount={maxStake - totalStake}
            percentage={openPercentage}
          />

        </div>

        <NextRound remainingBlocks={remainingBlocks}/>

        <Help/>

      </div>
    );
  }

  renderUserStake({userStake = {}}: {userStake: any}) {
    const {
      activeStake = 0,
      pendingStake = 0,
      pendingWithdrawStake = 0,
      withdrawableStake = 0,
    } = userStake;

    return (
      <div className='user-stake'>

        <div className='flex-container row'>
          <div className='flex-grow-container'>
            <div className='section-description'>{'Your contribution'}</div>
            <div className='focus-text'>{`${activeStake + pendingStake} ONT`}</div>
          </div>
          <div className='primary-btn stake-ont'>{'STAKE ONT'}</div>
        </div>

        <div className='staked-section'>
          <div className={ClassNames('flex-container row', {'disabled': activeStake === 0})}>
            <div className='flex-grow-container'>
              <div className='bold-text'>{'Active'}</div>
              <div className='description'>{'Actively staked in the current round and generating rewards.'}</div>
            </div>
            <div className='bold-text'>{`${activeStake} ONT`}</div>
          </div>

          <div className={ClassNames('flex-container row', {'disabled': pendingStake === 0})}>
            <div className='flex-grow-container'>
              <div className='bold-text'>{'Pending deposit'}</div>
              <div className='description'>{'Waiting to be staked at the start of the next round.'}</div>
            </div>
            <div className='bold-text'>{`${pendingStake} ONT`}</div>
          </div>

          <div className={ClassNames('flex-container row', {'disabled': pendingWithdrawStake === 0})}>
            <div className='flex-grow-container'>
              <div className='bold-text'>{'Pending withdraw'}</div>
              <div className='description'>{'After applying to withdrawl, actively staked ONT will be locked until the end of the current round, will continut to generate rewards until then.'}</div>
            </div>
            <div className='bold-text'>{`${pendingWithdrawStake} ONT`}</div>
          </div>

          <div className={ClassNames('row', {'disabled': activeStake + pendingStake === 0})}>
            <div className='request-withdraw-btn primary-btn'>
              {'Request withdraw'}
            </div>
          </div>

        </div>

        <div className={ClassNames({'disabled': withdrawableStake === 0})}>
          <div className='flex-container row'>
            <div className='flex-grow-container'>
              <div className='bold-text'>{'Withdrawable'}</div>
              <div className='description'>{'Not staked and waiting to be withdrawn to your wallet.'}</div>
            </div>
            <div className='bold-text'>{`${withdrawableStake} ONT`}</div>
          </div>

          <div className='withdraw-btn primary-btn'>{'Send to wallet'}</div>
        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    nodeDetails,
    nodeList,
    account,
    cache,
    stakeRoundInfo,
  } = state;

  return {
    nodeDetails,
    nodeList,
    account,
    cache,
    stakeRoundInfo,
  };
}

export default connect(mapStateToProps)(NodeDetails);
