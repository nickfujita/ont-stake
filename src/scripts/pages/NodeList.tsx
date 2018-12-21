import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import ClassNames from 'classnames';
import { numberWithCommas, formatPercent } from '../utils/numbers';
import StakeDistroBar from '../components/StakeDistroBar';
import { getCache } from '../utils/cache';
import { getNodeDistro } from '../utils/node';
import Tooltip from '../components/Tooltip';

interface Props {
  nodeList: any[];
  account: any;
  cache: any;
  router: any;
  dispatch: any;
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
          {'＜  My stakes'}
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
    const { nodeList, account, cache, dispatch } = this.props;
    const userStakes = getCache(cache, account, 'stakes');

    return (
      <div className='table'>
        {this.renderTableHeader()}
        {nodeList.map((node, index) => {
          const {
            userRewardsAllocation,
            totalStake,
            maxStake,
            ownerPercentage,
            usersPercentage,
            activeUserPercentage,
            openPercentage,
            name,
            publicKey,

            activeUserStake,
            activeUserPendingStake,
          } = getNodeDistro(node, userStakes);

          const totalActiveUserStake = activeUserStake + activeUserPendingStake;

          return (
            <div
              key={'node' + index}
              className={ClassNames('table-item', {
                'even-row': index % 2 === 0,
                'odd-row': index % 2 !== 0,
              })}
              onClick={() => dispatch(push(`/node/${publicKey}`))}
            >
              <div className='order'>{index + 1}</div>
              <div className='name'>{name}</div>
              <div className='rewards'>{formatPercent(userRewardsAllocation)}</div>
              <div className='current-stake'>
                {numberWithCommas(totalStake)}
                {totalActiveUserStake ? [
                  <div key='1'>{'\xa0(\xa0'}</div>,
                  <div key='2' className='my-stake'>{numberWithCommas(totalActiveUserStake)}</div>,
                  <div key='3'>{'\xa0)'}</div>,
                ] : ''}
              </div>
              <StakeDistroBar
                className='distribution'
                ownerPercentage={ownerPercentage}
                usersPercentage={usersPercentage}
                activeUserPercentage={activeUserPercentage}
                openPercentage={openPercentage}
              />
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
        <div className='rewards'>
          <Tooltip
            className='rewards-info'
            title='Contributor rewards'
            description='The percentage of fees that are rewarded to contributors who have a stake in the node.'
          />
          {'Rewards'}
        </div>
        <div className='current-stake'>
          <Tooltip
            className='current-stake-info'
            title='Currently staked'
            description='The amount of Ontology currently staked in the node by its owners, other contributors and you.'
          />
          {'Currently staked'}
        </div>
        <div className='distribution'>{'Distribution'}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    nodeList: state.nodeList,
    account: state.account,
    cache: state.cache,
  };
}

export default connect(mapStateToProps)(NodeList);
