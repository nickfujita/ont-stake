import * as React from 'react';
import ClassNames from 'classnames';

interface Props {
  // remainingBlocks: number;
}

export default class StakeTotals extends React.Component<Props, any> {

  render() {
    return (
      <div className='stake-totals-container'>
        {this.renderTotalStake()}
        {this.renderClaims()}
        {this.renderHelp()}
      </div>
    );
  }

  renderTotalStake() {
    return (
      <div className='total-stake'>
        <div className='description'>{'Total in contract:'}</div>
        <div className='total'>{`${false ? '' : '0'} ONT`}</div>
      </div>
    );
  }

  renderClaims() {
    return (
      <div className='claims'>
        <div className={ClassNames('row', {'empty': true})}>
          <div className='text-container'>
            <div className='description'>{'Profits'}</div>
            <div className='row'>{`${false ? '' : '0'} ONG`}</div>
          </div>
          <div className='primary-btn'>
            {'Redeem'}
          </div>
        </div>
        <div className={ClassNames('row', {'empty': true})}>
          <div className='text-container'>
            <div className='description'>{'Unbound ONG'}</div>
            <div className='row'>{`${false ? '' : '0'} ONG`}</div>
          </div>
          <div className='primary-btn'>
            {'Claim'}
          </div>
        </div>
      </div>
    );
  }

  renderHelp() {
    return (
      <div className='help'>
        {'Please read the '}
        <a href='https://o3.network' className='link'>{'help documents '}</a>
        {'for more information'}
      </div>
    );
  }
}
