import {
  UPDATE_NETWORKS,
  UPDATE_STAKE_ROUND_INFO,
  UPDATE_NODE_LIST,
} from '../../constants/actions';

const initialState = {
  networks: [],
  stakeRoundInfo: null,
  nodeList: [],
};

export default function dapi(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NETWORKS:
      return {
        ...state,
        networks: action.data,
      };
    case UPDATE_STAKE_ROUND_INFO:
      return {
        ...state,
        stakeRoundInfo: action.data,
      };
    case UPDATE_NODE_LIST:
      return {
        ...state,
        nodeList: action.data,
      };
    default:
      return state;
  }
}
