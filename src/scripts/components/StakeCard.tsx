import * as React from 'react';
import ClassNames from 'classnames';
import { numberWithCommas, formatPercent } from '../utils/numbers';

interface Props {
  node: any;
  stake: any;
  onClick: any;
}

export default class StakeTotals extends React.Component<Props, any> {

  render() {
    const { node, stake, onClick } = this.props;
    const { name, userRewardsAllocation } = node;
    const {
      activeStake,
      pendingStake,
      pendingWithdrawStake,
      withdrawableStake,
    } = stake;

    const myStake = activeStake + pendingStake;

    let actionText;
    if (withdrawableStake) {
      actionText = `Withdrawable: ${numberWithCommas(withdrawableStake)} ONT`;
    } else if (pendingWithdrawStake) {
      actionText = `Pending withdraw: ${numberWithCommas(pendingWithdrawStake)} ONT`;
    } else if (pendingStake) {
      actionText = `Pending deposit: ${numberWithCommas(pendingStake)} ONT`;
    }

    return (
      <div
        className='stake-card'
        onClick={onClick}
      >

        <div className='flex-grow-container'>
          <div className='name'>{name}</div>
          <div className='stake-amounts'>
            <div className='my-stake'>{`My stake: ${numberWithCommas(myStake)}`}</div>
            <div className='active-stake'>{`(Active: ${numberWithCommas(activeStake)} ONT)`}</div>
          </div>
        </div>

        <div className='action-container'>
          <div className='contrib-percentage'>
            <div className='logo-info' />
            <div className='description'>{`Contributor rewards: ${formatPercent(userRewardsAllocation)}`}</div>
          </div>
          <div
            className={ClassNames('action-text', {
              withdraw: withdrawableStake,
              'logo-check': !actionText,
            })}
          >
            {actionText || ''}
          </div>
        </div>
      </div>
    );
  }
}
