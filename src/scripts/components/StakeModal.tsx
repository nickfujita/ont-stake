import * as React from 'react';
import Modal from './Modal';
import CustomSlider from './CustomSlider';
import { shortAddr } from '../utils/account';
import { numberWithCommas } from '../utils/numbers';
import { addStake } from '../actions/dapi';
import ClassNames from 'classnames';

interface Props {
  onClose?: any;
  nodeName: string;
  nodePublicKey: string;
  account: any;
  balance: number;
  maxStake: number;
  dispatch: any;
}

interface State {
  amount: string;
}

const initialState = {
  amount: '0',
};

export default class StakeModal extends React.Component<Props, State> {

  state = initialState;

  render() {
    const {
      onClose,
      nodeName,
      account,
      balance,
      maxStake,
      nodePublicKey,
      dispatch,
    } = this.props;
    const { amount } = this.state;

    return (
      <Modal
        title={'Stake Ontology!'}
        className='stake-modal'
        onClose={() => onClose()}
      >

        <div className='info-container row'>

          <div className='flex-container row'>
            <div className='flex-grow-container'>{'Node name:'}</div>
            <div className='bold-text'>{nodeName}</div>
          </div>

          <div className='flex-container row'>
            <div className='flex-grow-container'>{'Wallet:'}</div>
            <div className='bold-text'>{`${account ? account.label : ''} (${shortAddr(account ? account.address : '')})`}</div>
          </div>

          <div className='flex-container row'>
            <div className='flex-grow-container'>{'Balance:'}</div>
            <div className='bold-text'>{`${numberWithCommas(balance || 0)} ONT`}</div>
          </div>

          <div className='flex-container row-last'>
            <div className='flex-grow-container'>{'Max stake:'}</div>
            <div className='bold-text'>{`${numberWithCommas(maxStake || 0)} ONT`}</div>
          </div>

        </div>

        <div className='amounts-container flex-container row'>
          <div className='flex-grow-container'>
            <div className='bold-text'>{'Amount'}</div>
            <div className='description'>{'Amount must be a multiple of 500'}</div>
          </div>
          <div className='amount'>{amount}</div>
        </div>

        <CustomSlider
          max={(balance || 0).toString()}
          step={'500'}
          onChange={amount => this.setState({amount})}
        />

        <div className='btn-container'>
          <div
            className={ClassNames('primary-btn', {'disabled': Number(amount) === 0})}
            onClick={() => {
              if (Number(amount) > 0) {
                dispatch(addStake(nodePublicKey, Number(amount)));
                onClose();
              }
            }}
          >
            {'STAKE ONTOLOGY'}
          </div>
        </div>
      </Modal>
    );
  }
}
