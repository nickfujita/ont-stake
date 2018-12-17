import * as React from 'react';
import { shortAddr } from '../utils/account';
import { disconnect } from '../actions/dapi';
import { numberWithCommas } from '../utils/numbers';

interface Props {
  address: string;
  label: string;
  ontBalance: number;
  canDisconnect: boolean;
  dispatch: any;
}

export default class Account extends React.Component<Props, any> {

  render() {
    const { address, label, ontBalance, canDisconnect, dispatch } = this.props;
    return (
      <div className='account'>
        <div className='address'>{`${label} (${shortAddr(address)})`}</div>
        <div className='amount'>{`${numberWithCommas(ontBalance || 0)} ONT available`}</div>
        {canDisconnect ? (
          <div
            className='disconnect'
            onClick={() => dispatch(disconnect())}
          >
            {'Swap wallet'}
          </div>
        ) : ''}
      </div>
    );
  }
}
