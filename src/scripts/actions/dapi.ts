import {
  UPDATE_NETWORKS,
  UPDATE_ACCOUNT,
  DISCONNECT,
  RESET,
  UPDATE_STAKE_ROUND_INFO,
  UPDATE_NODE_LIST,
} from '../constants/actions';
import o3dapi from 'o3-dapi-core';
import o3dapiOnt from 'o3-dapi-ont';
import { replace } from 'react-router-redux';
import { putCache } from './cache';

export function init() {
  return dispatch => {
    o3dapi.initPlugins([o3dapiOnt]);
    o3dapi.ONT.addEventListener(o3dapi.ONT.Constants.EventName.READY, () => {
      o3dapi.ONT.getNetworks()
      .then(networks => {
        dispatch({
          type: UPDATE_NETWORKS,
          data: networks,
        });
      });
      dispatch(updateStakeRoundInfo());
      dispatch(updateNodeList());
    });
  };
}

export function updateStakeRoundInfo() {
  return dispatch => {
    o3dapi.ONT.stake.getStakeRoundInfo({network: 'MainNet'})
    .then(data => {
      dispatch({
        type: UPDATE_STAKE_ROUND_INFO,
        data,
      });
    })
    .catch(() => {});
  };
}

export function updateNodeList() {
  return dispatch => {
    o3dapi.ONT.stake.getNodeList({network: 'MainNet'})
    .then(data => {
      dispatch({
        type: UPDATE_NODE_LIST,
        data: data.nodes,
      });
    })
    .catch(() => {});
  };
}

export function connect() {
  return dispatch => {
    o3dapi.ONT.getAccount()
    .then(account => {
      dispatch({
        type: UPDATE_ACCOUNT,
        data: account,
      });
      dispatch(getBalances(account.address));
      dispatch(getTotalStake(account.address));
      dispatch(getRewards(account.address));
      dispatch(getUnclaimed(account.address));
      dispatch(getStakes(account.address));
    })
    .catch(() => {});
  };
}

export function disconnect() {
  return dispatch => {
    o3dapi.ONT.disconnect()
    .then(res => {
      dispatch({
        type: DISCONNECT,
      });
      dispatch(replace('/'));
    })
    .catch(() => {});
  };
}

export function reset() {
  return dispatch => {
    dispatch(replace('/'));
    dispatch({type: RESET});
  };
}

export function getBalances(address: string) {
  return dispatch => {
    o3dapi.ONT.assets.getBalance({
      network: 'MainNet',
      address,
    })
    .then(data => {
      dispatch(putCache(`${address}_balances`, data));
    })
    .catch(() => {});
  };
}

export function getTotalStake(address: string) {
  return dispatch => {
    o3dapi.ONT.stake.getTotalStake({
      network: 'MainNet',
      address,
    })
    .then(data => {
      dispatch(putCache(`${address}_total_stake`, data));
    })
    .catch(() => {});
  };
}

export function getRewards(address: string) {
  return dispatch => {
    o3dapi.ONT.stake.getStakedClaimableOngRewards({
      network: 'MainNet',
      address,
    })
    .then(data => {
      dispatch(putCache(`${address}_rewards`, data));
    })
    .catch(() => {});
  };
}

export function getUnclaimed(address: string) {
  return dispatch => {
    o3dapi.ONT.stake.getStakedClaimableOng({
      network: 'MainNet',
      address,
    })
    .then(data => {
      dispatch(putCache(`${address}_unclaimed`, data));
    })
    .catch(() => {});
  };
}

export function getStakes(address: string) {
  return (dispatch, getState) => {
    const { nodeList } = getState();

    let promise = Promise.resolve(nodeList);
    if (!nodeList) {
      promise = o3dapi.ONT.stake.getNodeList({network: 'MainNet'})
      .then(data => data.nodes);
    }

    promise.then(nodeList => {
      return Promise.all(nodeList.map(({publicKey}) => {
        return o3dapi.ONT.stake.getNodeStakeInfo({
          network: 'MainNet',
          address,
          nodePublicKey: publicKey,
        });
      }));
    })
    .then(data => data.filter(({
      activeStake,
      pendingStake,
      pendingWithdrawStake,
      withdrawableStake,
    }) => (
      activeStake > 0 ||
      pendingStake > 0 ||
      pendingWithdrawStake > 0 ||
      withdrawableStake > 0
    )))
    .then(data => data.reduce((accum, item: any) => {
      accum[item.publicKey] = item;
      return accum;
    }, {}))
    .then(data => {
      dispatch(putCache(`${address}_stakes`, data));
    })
    .catch(err => {});
  };
}
