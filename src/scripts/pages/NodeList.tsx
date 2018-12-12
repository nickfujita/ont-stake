import * as React from 'react';
import { connect } from 'react-redux';
import ClassNames from 'classnames';
import { numberWithCommas } from '../utils/numbers';

interface Props {
  nodeList: any[];
  userStakes: any;
  router: any;
}

class NodeList extends React.Component<Props, any> {

  render() {
    const { replace } = this.props.router;
    return (
      <div className='node-list'>

        <div
          className='link'
          onClick={() => replace('/')}
        >
          {'< My stakes'}
        </div>

        {this.renderLegend()}

        {this.renderTable()}

      </div>
    );
  }

  renderLegend() {
    return (
      <div className='legend'>
        <div className='instruction'>{'Select a Consensus node to stake'}</div>
        <div className='legend-items'>
          <div className='legend-item purple'>{'Node owners'}</div>
          <div className='legend-item blue'>{'Others contributions'}</div>
          <div className='legend-item green'>{'Your contribution'}</div>
          <div className='legend-item grey'>{'Open'}</div>
        </div>
      </div>
    );
  }

  renderTable() {
    const { nodeList, userStakes } = this.props;
    return (
      <div className='table'>
        {this.renderTableHeader()}
        {nodeList.map(({
          name,
          userRewardsAllocation,
          maxStake,
          totalStake,
          ownerStake,
          usersStake,
          publicKey,
        }, index) => {
          const userStake = userStakes && userStakes[publicKey];
          const userActiveStake = (userStake && userStake.activeStake || 0);

          const ownerPercentage = ownerStake / maxStake;
          const usersPercentage = (usersStake - userActiveStake) / maxStake;
          const activeUserPercentage = userActiveStake / maxStake;
          const openPercentage = 1 - (totalStake / maxStake);

          return (
            <div
              key={'node' + index}
              className={ClassNames('table-item', {
                'even-row': index % 2 === 0,
                'odd-row': index % 2 !== 0
              })}
            >
              <div className='order'>{index + 1}</div>
              <div className='name'>{name}</div>
              <div className='rewards'>{userRewardsAllocation}</div>
              <div className='current-stake'>{`${numberWithCommas(totalStake)} / ${numberWithCommas(maxStake)} ONT`}</div>
              <div className='distribution'>
                <div className='purple' style={{flex: `${ownerPercentage * 100}%`}}/>
                <div className='blue' style={{flex: `${usersPercentage * 100}%`}}/>
                <div className='green' style={{flex: `${activeUserPercentage * 100}%`}}/>
                <div className='grey' style={{flex: `${openPercentage * 100}%`}}/>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  renderTableHeader() {
    return (
      <div className='table-header'>
        <div className='order'>{'#'}</div>
        <div className='name'>{'Name'}</div>
        <div className='rewards'>{'Rewards'}</div>
        <div className='current-stake'>{'Currently staked'}</div>
        <div className='distribution'>{'Distribution'}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    nodeList: state.dapi.nodeList,
    userStakes: state.account.stakes,
  };
}

export default connect(mapStateToProps)(NodeList);
