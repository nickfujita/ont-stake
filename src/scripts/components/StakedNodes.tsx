import * as React from 'react';
import { SHRUG } from '../constants/strings';
import StakeCard from './StakeCard';

interface Props {
  nodeList: any[];
  stakes: any;
}

export default class StakedNodes extends React.Component<Props, any> {

  render() {
    const { stakes } = this.props;

    return (
      <div className='staked-nodes-container'>
        <div className='title'>{'Staked Nodes'}</div>
        {!stakes ? this.renderEmpty() : this.renderStakes()}
        {stakes ? (
          <div
            className='link'
          >
            {'View all consensus nodes >'}
          </div>
        ) : ''}
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
    const { stakes, nodeList } = this.props;

    const nodes = nodeList.reduce((accum, node) => {
      const stake = stakes[node.publicKey];
      if (stake) {
        accum.push({
          node,
          stake,
        });
      }
      return accum;
    }, []);

    return (
      <div className='stake-list'>
        {nodes.map(({node, stake}, index) => (
          <StakeCard
            key={node.publicKey + index}
            node={node}
            stake={stake}
          />
        ))}
      </div>
    );
  }
}
