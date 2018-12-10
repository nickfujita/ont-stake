import * as React from 'react';

export default class HeaderTitle extends React.Component<any, any> {

  render() {
    return (
      <div className='header-title'>
        <div>{'Stakeology'}</div>
        <div>{'An Ontology staking app for O3'}</div>
      </div>
    );
  }
}
