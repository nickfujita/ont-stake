import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from '../constants/actions';

export function addNotification(id, title, description) {
  return {
    type: ADD_NOTIFICATION,
    data: {
      id,
      title,
      description,
    },
  };
}

export function removeNotification(id: number) {
  return {
    type: REMOVE_NOTIFICATION,
    data: id,
  };
}
