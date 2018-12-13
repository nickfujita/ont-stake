import { PUT_CACHE, RESET_CACHE } from '../../constants/actions';

const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case PUT_CACHE:
      return {
        ...state,
        [action.data.key]: action.data.value,
      };
    case RESET_CACHE:
      return initialState;
    default:
      return state;
  }
}
