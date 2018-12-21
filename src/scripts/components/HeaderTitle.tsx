import * as React from 'react';

export default class HeaderTitle extends React.Component<any, any> {

  render() {
    return (
      <div className='header-title'>
        <div className='logo-steak'/>
        <div className='title-container'>
          <div className='title'>{'STAKETOLOGY'}</div>
          <div className='subtitle'>{'An Ontology staking app by O3'}</div>
        </div>
      </div>
    );
  }
}
