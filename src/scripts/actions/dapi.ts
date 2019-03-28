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
import { addNotification, removeNotification } from './notifications';
import { getCache } from '../utils/cache';

export function init() {
  return (dispatch, getState) => {
    o3dapi.initPlugins([o3dapiOnt]);

    const timeout = setTimeout(() => {
      if (!o3dapi.isAvailable) {
        dispatch(replace('unsupported'));
      }
    }, 1000);

    o3dapi.ONT.addEventListener(o3dapi.ONT.Constants.EventName.READY, provider => {
      const { routing } = getState();
      if (
        provider &&
        Array.isArray(provider.compatibility) &&
        provider.compatibility.includes('ONT-STAKING')
      ) {
        clearTimeout(timeout);
        if (routing.locationBeforeTransitions.pathname === 'unsupported') {
          dispatch(replace('/'));
        }
        o3dapi.ONT.getNetworks()
        .then(networks => {
          dispatch({
            type: UPDATE_NETWORKS,
            data: networks,
          });
        });
        dispatch(updateStakeRoundInfo());
        dispatch(updateNodeList());
        dispatch(connect());
        dispatch(startDataRefresher());
      } else {
        dispatch(replace('unsupported'));
      }
    });

    o3dapi.ONT.addEventListener(o3dapi.ONT.Constants.EventName.DISCONNECTED, () => {
      dispatch({type: DISCONNECT});
    });
  };
}

function startDataRefresher() {
  return (dispatch, getState) => {
    setInterval(() => {
      dispatch(updateStakeRoundInfo());
      dispatch(updateNodeList());

      const address = getState().account.address;
      if (address) {
        dispatch(getBalances(address));
        dispatch(getTotalStake(address));
        dispatch(getRewards(address));
        dispatch(getUnclaimed(address));
        dispatch(getStakes(address));
      }
    }, 10000);
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
      dispatch(connect());
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

    let consensusNodeData;
    let consensusNodes;
    let candidateNodes;
    promise.then(nodeList => {

      consensusNodes = nodeList.filter(({isConsensusNode}) => isConsensusNode);
      candidateNodes = nodeList.filter(({isConsensusNode}) => !isConsensusNode);

      return Promise.all(consensusNodes.map(({publicKey}) => {
        return o3dapi.ONT.stake.getNodeStakeInfo({
          network: 'MainNet',
          address,
          nodePublicKey: publicKey,
        });
      }));
    })
    .then(data => {
      consensusNodeData = data;
      dispatch(cookStakes(address, data));
      return Promise.all(candidateNodes.map(({publicKey}) => {
        return o3dapi.ONT.stake.getNodeStakeInfo({
          network: 'MainNet',
          address,
          nodePublicKey: publicKey,
        });
      }));
    })
    .then(data => {
      dispatch(cookStakes(address, [...consensusNodeData, ...data]));
    })
    .catch(err => {});
  };
}

function cookStakes(address, data) {
  return dispatch => {
    const filteredData = data.filter(({
      activeStake,
      pendingStake,
      pendingWithdrawStake,
      withdrawableStake,
    }) => (
      activeStake > 0 ||
      pendingStake > 0 ||
      pendingWithdrawStake > 0 ||
      withdrawableStake > 0
    ));

    const dataMap = filteredData.reduce((accum, item: any) => {
      accum[item.publicKey] = item;
      return accum;
    }, {});

    dispatch(putCache(`${address}_stakes`, dataMap));
  };
}

export function claimRewards() {
  return (dispatch, getState) => {
    const { account, cache } = getState();
    const rewardAmount = getCache(cache, account, 'rewards').amount;
    return o3dapi.ONT.stake.claimStakedOngRewards({
      network: 'MainNet',
    })
    .then(() => {
      dispatch(addNotification(
        Date.now(),
        'Profits redeemed',
        `${rewardAmount} ONG has been sent to your wallet address. It will arrive shortly`,
        4500,
      ));

      setTimeout(() => {
        account && dispatch(getRewards(account.address));
      }, 90000);

      return true;
    })
    .catch(() => false);
  };
}

export function claimOng() {
  return (dispatch, getState) => {
    const { account, cache } = getState();
    const unclaimedAmount = getCache(cache, account, 'unclaimed').amount;
    return o3dapi.ONT.stake.claimStakedOng({
      network: 'MainNet',
    })
    .then(() => {
      dispatch(addNotification(
        Date.now(),
        'Profits redeemed',
        `${unclaimedAmount} ONG has been sent to your wallet address. It will arrive shortly`,
        4500,
      ));

      setTimeout(() => {
        account && dispatch(getUnclaimed(account.address));
      }, 90000);

      return true;
    })
    .catch(() => false);
  };
}

export function addStake(nodePublicKey, amount) {
  return (dispatch, getState) => {
    const { account } = getState();
    o3dapi.ONT.stake.addStake({
      network: 'MainNet',
      nodePublicKey,
      amount,
    })
    .then(() => {
      dispatch(addNotification(
        Date.now(),
        'Stake submitted',
        `${amount} ONT has been submitted for staking, it will be moved to pending deposit shortly.`,
        4500,
      ));

      setTimeout(() => {
        if (account) {
          dispatch(updateStakeRoundInfo());
          dispatch(updateNodeList());
          dispatch(getBalances(account.address));
          dispatch(getTotalStake(account.address));
          dispatch(getStakes(account.address));
        }
      }, 90000);
    })
    .catch(() => {});
  };
}

export function requestStakeWithdraw(nodePublicKey, amount) {
  return (dispatch, getState) => {
    const { account } = getState();
    o3dapi.ONT.stake.requestStakeWithdraw({
      network: 'MainNet',
      nodePublicKey,
      amount,
    })
    .then(() => {
      dispatch(addNotification(
        Date.now(),
        'Stake withdraw request submitted',
        `${amount} ONT has been requested to be withdrawn.`,
        4500,
      ));

      setTimeout(() => {
        if (account) {
          dispatch(updateStakeRoundInfo());
          dispatch(updateNodeList());
          dispatch(getBalances(account.address));
          dispatch(getTotalStake(account.address));
          dispatch(getStakes(account.address));
        }
      }, 90000);
    })
    .catch(() => {});
  };
}

export function withdrawStake(nodePublicKey, amount) {
  return (dispatch, getState) => {
    const { account } = getState();
    return o3dapi.ONT.stake.withdrawStake({
      network: 'MainNet',
      nodePublicKey,
      amount,
    })
    .then(() => {
      dispatch(addNotification(
        Date.now(),
        'Stake withdraw submitted',
        `${amount} ONT will be credited to your wallet shortly.`,
        4500,
      ));

      setTimeout(() => {
        if (account) {
          dispatch(updateStakeRoundInfo());
          dispatch(updateNodeList());
          dispatch(getBalances(account.address));
          dispatch(getTotalStake(account.address));
          dispatch(getStakes(account.address));
        }
      }, 90000);

      return true;
    })
    .catch(() => false);
  };
}
