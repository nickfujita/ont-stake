import {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from '../../constants/actions';

const initialState = [];

export default function no(state = initialState, action) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return [
        ...state,
        action.data,
      ];
    case REMOVE_NOTIFICATION:
      return state.filter(({id}) => id !== action.data);
    default:
      return state;
  }
}
