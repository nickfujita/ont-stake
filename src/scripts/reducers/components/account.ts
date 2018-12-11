import {
  UPDATE_ACCOUNT,
  DISCONNECT,
  UPDATE_ACCOUNT_BALANCE,
  UPDATE_ACCOUNT_TOTAL_STAKE,
  UPDATE_ACCOUNT_STAKE_REWARDS,
  UPDATE_ACCOUNT_UNCLAIMED,
  UPDATE_ACCOUNT_STAKES,
} from '../../constants/actions';

const initialState = {
  details: null,
  balances: null,
  totalStake: null,
  rewards: null,
  unclaimed: null,
  stakes: null,
};

export default function account(state = initialState, action) {
  switch (action.type) {
    case UPDATE_ACCOUNT:
      return {
        ...state,
        details: action.data,
      };
    case DISCONNECT:
      return initialState;
    case UPDATE_ACCOUNT_BALANCE:
      return {
        ...state,
        balances: action.data,
      };
    case UPDATE_ACCOUNT_TOTAL_STAKE:
      return {
        ...state,
        totalStake: action.data,
      };
    case UPDATE_ACCOUNT_STAKE_REWARDS:
      return {
        ...state,
        rewards: action.data,
      };
    case UPDATE_ACCOUNT_UNCLAIMED:
      return {
        ...state,
        unclaimed: action.data,
      };
    case UPDATE_ACCOUNT_STAKES :
      return {
        ...state,
        stakes: action.data,
      };
    default:
      return state;
  }
}
