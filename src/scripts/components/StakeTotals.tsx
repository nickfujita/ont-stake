import * as React from 'react';
import ClassNames from 'classnames';
import Help from './Help';
import { claimRewards, claimOng } from '../actions/dapi';
import { numberWithCommas } from '../utils/numbers';

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
        <div className='description'>{'TOTAL STAKE'}</div>
        <div className='total-container'>
          <div className='total'>{numberWithCommas(totalStake) || '0'}</div>
          <div>{'ONT'}</div>
        </div>
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
            <div className='description'>{'STAKE REWARDS'}</div>
            <div className='row'>{`${isClaimingRewards || !parsedRewards ? '0' : rewards} ONG`}</div>
          </div>
          <div
            className={ClassNames('primary-btn', {
              'disabled': !parsedRewards || isClaimingRewards,
            })}
            onClick={() => {
              if (!isClaimingRewards && parsedRewards) {
                dispatch(claimRewards())
                .then(result => {
                  result && this.setState({isClaimingRewards: true});
                });
              }
            }}
          >
            {'Redeem'}
          </div>
        </div>
        <div className='row'>
          <div className='text-container'>
            <div className='description'>{'UNCLAIMED ONG'}</div>
            <div className='row'>{`${isClaimingOng || !parsedUnclaimed ? '0' : unclaimed} ONG`}</div>
          </div>
          <div
            className={ClassNames('primary-btn', {
              'disabled': !parsedUnclaimed || isClaimingOng,
            })}
            onClick={() => {
              if (!isClaimingOng && parsedUnclaimed) {
                dispatch(claimOng())
                .then(result => {
                  result && this.setState({isClaimingOng: true});
                });
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
