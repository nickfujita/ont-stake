import * as React from 'react';
import classNames from 'classnames';

export default function Modal(props) {
  const { logo, title, children, className, onClose, id, unclosable } = props;

  return (
    <div
      id={id}
      className={classNames('modal', className, {
        'no-title': !logo && !title,
      })}
    >
      <div className='content-container'>
        <div className='content-header'>
          {logo && <div className={classNames(logo, 'logo')} />}
          <div className='title'>{title}</div>
          {!unclosable && <div className='close logo-times' onClick={() => onClose()} />}
        </div>
        <div className='content-body'>
          {children}
        </div>
      </div>
      <div className='modal-overlay'/>
    </div>
  );
}
