import {
  UPDATE_NETWORKS,
  DISCONNECT,
  RESET,
} from '../../constants/actions';

const initialState = {
  networks: [],
  pendingCompileDetails: null,
  compileDetails: null,
  pendingDeployDetails: null,
  deployDetails: null,
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
    default:
      return state;
  }
}
