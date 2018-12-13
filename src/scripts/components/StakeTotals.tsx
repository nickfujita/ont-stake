import * as React from 'react';
import ClassNames from 'classnames';
import Help from './Help';

interface Props {
  totalStake: number;
  rewards: number;
  unclaimed: number;
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
    const { rewards, unclaimed } = this.props;

    return (
      <div className='claims'>
        <div className={ClassNames('row', {'empty': !rewards})}>
          <div className='text-container'>
            <div className='description'>{'Profits'}</div>
            <div className='row'>{`${rewards || '0'} ONG`}</div>
          </div>
          <div className='primary-btn'>
            {'Redeem'}
          </div>
        </div>
        <div className={ClassNames('row', {'empty': !unclaimed})}>
          <div className='text-container'>
            <div className='description'>{'Unbound ONG'}</div>
            <div className='row'>{`${unclaimed || '0'} ONG`}</div>
          </div>
          <div className='primary-btn'>
            {'Claim'}
          </div>
        </div>
      </div>
    );
  }
}
