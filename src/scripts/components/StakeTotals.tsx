import * as React from 'react';
import ClassNames from 'classnames';
import Help from './Help';
import { claimRewards, claimOng } from '../actions/dapi';

interface Props {
  totalStake: number;
  rewards: number;
  unclaimed: number;
  dispatch: any;
}

export default class StakeTotals extends React.Component<Props, any> {

  render() {
    return (
      <div className='stake-totals-container'>
        {this.renderTotalStake()}
        {this.renderClaims()}
        <Help/>
      </div>
    );
  }

  renderTotalStake() {
    const { totalStake } = this.props;

    return (
      <div className='total-stake'>
        <div className='description'>{'Total in contract:'}</div>
        <div className='total'>{`${totalStake || '0'} ONT`}</div>
      </div>
    );
  }

  renderClaims() {
    const { rewards, unclaimed, dispatch } = this.props;
    debugger;
    return (
      <div className='claims'>
        <div className='row'>
          <div className='text-container'>
            <div className='description'>{'Profits'}</div>
            <div className='row'>{`${rewards || '0'} ONG`}</div>
          </div>
          <div
            className={ClassNames('primary-btn', {'disabled': !rewards})}
            onClick={() => rewards && dispatch(claimRewards())}
          >
            {'Redeem'}
          </div>
        </div>
        <div className='row'>
          <div className='text-container'>
            <div className='description'>{'Unbound ONG'}</div>
            <div className='row'>{`${unclaimed || '0'} ONG`}</div>
          </div>
          <div
            className={ClassNames('primary-btn', {'disabled': !unclaimed})}
            onClick={() => unclaimed && dispatch(claimOng())}
          >
            {'Claim'}
          </div>
        </div>
      </div>
    );
  }
}
