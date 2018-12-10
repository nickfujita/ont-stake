import {
  UPDATE_NETWORKS,
  UPDATE_ACCOUNT,
  DISCONNECT,
  RESET,
} from '../constants/actions';
import o3dapi from 'o3-dapi-core';
import o3dapiOnt from 'o3-dapi-ont';
import { replace } from 'react-router-redux';

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
    });
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
