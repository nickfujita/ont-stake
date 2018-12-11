import {
  UPDATE_NETWORKS,
  DISCONNECT,
  RESET,
  UPDATE_STAKE_ROUND_INFO,
} from '../../constants/actions';

const initialState = {
  networks: [],
  stakeRoundInfo: null,
};

export default function dapi(state = initialState, action) {
  switch (action.type) {
    case RESET:
    case DISCONNECT:
      return {
        ...initialState,
        networks: state.networks,
      };
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
    default:
      return state;
  }
}
