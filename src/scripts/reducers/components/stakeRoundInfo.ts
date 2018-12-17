import {
  UPDATE_STAKE_ROUND_INFO,
} from '../../constants/actions';

const initialState = null;

export default function stakeRoundInfo(state = initialState, action) {
  switch (action.type) {
    case UPDATE_STAKE_ROUND_INFO:
      return action.data;
    default:
      return state;
  }
}
