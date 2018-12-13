import {
  UPDATE_NETWORKS,
} from '../../constants/actions';

const initialState = [];

export default function dapi(state = initialState, action) {
  switch (action.type) {
    case UPDATE_NETWORKS:
      return action.data;
    default:
      return state;
  }
}
