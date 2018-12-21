import * as React from 'react';
import { push } from 'react-router-redux';
import { SHRUG } from '../constants/strings';
import StakeCard from './StakeCard';

interface Props {
  dispatch: any;
  nodeList: any[];
  stakes: any;
}

export default class StakedNodes extends React.Component<Props, any> {

  render() {
    const { stakes, dispatch } = this.props;

    return (
      <div className='staked-nodes-container'>

        <div className='staked-nodes-header'>
          <div className='title'>{'Staked Nodes'}</div>
          <div
            className='primary-btn'
            onClick={() => dispatch(push('/nodelist'))}
          >
            {'+ Create New Stake'}
          </div>
        </div>

        {!Object.keys(stakes).length ? this.renderEmpty() : this.renderStakes()}

        <div
          className='link'
          onClick={() => dispatch(push('/nodelist'))}
        >
          {'View all consensus nodes >'}
        </div>

      </div>
    );
  }

  renderEmpty() {
    return (
      <div className='empty-stake'>
        <div className='shrug row'>{SHRUG}</div>
        <div className='row'>{'You currently have no ONT staked'}</div>
      </div>
    );
  }

  renderStakes() {
    const { stakes, nodeList, dispatch } = this.props;

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
            onClick={() => dispatch(push(`/node/${node.publicKey}`))}
          />
        ))}
      </div>
    );
  }
}
