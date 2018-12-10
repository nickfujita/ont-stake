import * as React from 'react';
import { shortAddr } from '../utils/account';

interface Props {
  address: string;
  label: string;
  ontBalance: number;
  canDisconnect: boolean;
  onDisconnect: () => {};
}

export default class Account extends React.Component<Props, any> {

  render() {
    const { address, label, ontBalance, canDisconnect } = this.props;
    return (
      <div className='account'>
        <div>{`${label} (${shortAddr(address)})`}</div>
        <div>{`${ontBalance || 0} ONT available`}</div>
        {canDisconnect ? (
          <div>{'Disconnect Wallet'}</div>
        ) : ''}
      </div>
    );
  }
}
