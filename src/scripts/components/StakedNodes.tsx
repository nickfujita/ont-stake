import * as React from 'react';
import { SHRUG } from '../constants/strings';

interface Props {
  // remainingBlocks: number;
}

export default class StakedNodes extends React.Component<Props, any> {

  render() {
    // const { remainingBlocks } = this.props;

    return (
      <div className='staked-nodes-container'>
        <div className='title'>{'Staked Nodes'}</div>
        {!false ? this.renderEmpty() : this.renderStakes()}
      </div>
    );
  }

  renderEmpty() {
    return (
      <div className='empty-stake'>
        <div className='empty-text-container'>
          <div className='shrug row'>{SHRUG}</div>
          <div className='row'>{'You currently have no ONT staked'}</div>
          <a href='https://o3.network' className='row link'>{'Learn more about staking Ontology'}</a>
        </div>
        <div
          className='primary-btn'
        >
          {'Create Stake'}
        </div>
      </div>
    );
  }

  renderStakes() {
    return (
      <div className='empty-stake'>
        <div className='shrug'>{SHRUG}</div>
        <div>{'You currently have no ONT staked'}</div>
        <a href='https://o3.network' className='link'>{'Learn more about staking Ontology'}</a>
        <div
          className='primary-btn'
        >
          {'Create Stake'}
        </div>
      </div>
    );
  }
}
