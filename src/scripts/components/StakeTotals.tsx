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

interface State {
  isClaimingOng: boolean;
  isClaimingRewards: boolean;
}

const initialState = {
  isClaimingOng: false,
  isClaimingRewards: false,
};

export default class StakeTotals extends React.Component<Props, State> {

  state = initialState;

  componentWillUpdate(nextProps) {
    const {
      isClaimingOng,
      isClaimingRewards,
    } = this.state;

    if (isClaimingOng && nextProps.unclaimed !== this.props.unclaimed) {
      this.setState({isClaimingOng: false});
    }

    if (isClaimingRewards && nextProps.rewards !== this.props.rewards) {
      this.setState({isClaimingRewards: false});
    }
  }

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
    const {
      isClaimingOng,
      isClaimingRewards,
    } = this.state;

    const parsedRewards = Number(rewards);
    const parsedUnclaimed = Number(unclaimed);

    return (
      <div className='claims'>
        <div className='row'>
          <div className='text-container'>
            <div className='description'>{'Profits'}</div>
            <div className='row'>{`${isClaimingRewards || !parsedRewards ? '0' : rewards} ONG`}</div>
          </div>
          <div
            className={ClassNames('primary-btn', {
              'disabled': !parsedRewards || isClaimingRewards,
            })}
            onClick={() => {
              if (!isClaimingRewards && parsedRewards) {
                dispatch(claimRewards());
                this.setState({isClaimingRewards: true});
              }
            }}
          >
            {'Redeem'}
          </div>
        </div>
        <div className='row'>
          <div className='text-container'>
            <div className='description'>{'Unbound ONG'}</div>
            <div className='row'>{`${isClaimingOng || !parsedUnclaimed ? '0' : unclaimed} ONG`}</div>
          </div>
          <div
            className={ClassNames('primary-btn', {
              'disabled': !parsedUnclaimed || isClaimingOng,
            })}
            onClick={() => {
              if (!isClaimingOng && parsedUnclaimed) {
                dispatch(claimOng());
                this.setState({isClaimingOng: true});
              }
            }}
          >
            {'Claim'}
          </div>
        </div>
      </div>
    );
  }
}
