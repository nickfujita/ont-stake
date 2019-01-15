import * as React from 'react';
import ClassNames from 'classnames';

export default function Help ({className}: {className?: string}) {
  return (
    <div className={ClassNames('help', className)}>
      <div className='description row'>{'Need help?'}</div>
      <div className='description row'>
        {'Check out our '}
        <a href='https://o3.network' className='link'>{'staking guide'}</a>
        {' for everything you need to know about staking ONT!'}
      </div>
    </div>
  );
}
