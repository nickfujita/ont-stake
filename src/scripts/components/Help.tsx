import * as React from 'react';
import ClassNames from 'classnames';

export default function Help ({className}: {className?: string}) {
  return (
    <div className={ClassNames('help', className)}>
      {'Please read the '}
      <a href='https://o3.network' className='link'>{'help documents '}</a>
      {'for more information'}
    </div>
  );
}
