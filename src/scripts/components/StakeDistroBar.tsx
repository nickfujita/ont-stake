import * as React from 'react';
import ClassNames from 'classnames';

interface StakeDistroBarInputs {
  className?: string;
  ownerPercentage: number;
  usersPercentage: number;
  activeUserPercentage: number;
  openPercentage: number;
}

export default function StakeDistroBar ({
  className,
  ownerPercentage = 0,
  usersPercentage = 0,
  activeUserPercentage = 0,
  openPercentage = 0,
}: StakeDistroBarInputs) {
  return (
    <div className={ClassNames('stake-distro-bar', className)}>
      <div className='purple' style={{flex: `${ownerPercentage * 100}%`}}/>
      <div className='blue' style={{flex: `${usersPercentage * 100}%`}}/>
      <div className='green' style={{flex: `${activeUserPercentage * 100}%`}}/>
      <div className='grey' style={{flex: `${openPercentage * 100}%`}}/>
    </div>
  );
}
