import { ADD_NOTIFICATION, REMOVE_NOTIFICATION } from '../constants/actions';

export function addNotification(id, title, description, removalTimer?) {
  return dispatch => {
    dispatch({
      type: ADD_NOTIFICATION,
      data: {
        id,
        title,
        description,
      },
    });

    removalTimer && setTimeout(() => {
      dispatch(removeNotification(id));
    }, removalTimer);
  };
}

export function removeNotification(id: number) {
  return {
    type: REMOVE_NOTIFICATION,
    data: id,
  };
}
