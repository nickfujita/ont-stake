import {
  UPDATE_NODE_LIST,
} from '../../constants/actions';

const initialState = [];

export default function dapi(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NODE_LIST:
      return action.data;
    default:
      return state;
  }
}
