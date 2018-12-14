import * as React from 'react';
import Modal from './Modal';
import CustomSlider from './CustomSlider';

interface Props {
  onClose?: any;
  activeStake: number;
}

interface State {
  amount: string;
}

const initialState = {
  amount: '0',
};

export default class WithdrawModal extends React.Component<Props, State> {

  state = initialState;

  render() {
    const { onClose, activeStake } = this.props;
    const { amount } = this.state;

    return (
      <Modal
        title={'Withdraw stake'}
        className='withdraw-stake-modal'
        onClose={() => onClose()}
      >
        <div className='info-container row'>
          <div className='description'>{'Please note:'}</div>
          <div className='row'>{'Activey staked ONT will be locked until the end of the round. It will continue to generate ONG and rewards. At the end of the round, you can withdraw the assets back to your wallet.'}</div>
          <div className='row'>{'Assets that are \'pending deposit\' will be withdrawable immidiately.'}</div>
        </div>
        <div className='amounts-container flex-container row'>
          <div className='flex-grow-container'>
            <div className='bold-text'>{'Amount'}</div>
            <div className='description'>{'Amount must be a multiple of 500'}</div>
          </div>
          <div className='amount'>{amount}</div>
        </div>

        <CustomSlider
          max={activeStake.toString()}
          step={'500'}
          onChange={amount => this.setState({amount})}
        />

        <div className='btn-container'>
          <div className='primary-btn'>
            {'WITHDRAW STAKE'}
          </div>
        </div>
      </Modal>
    );
  }
}
