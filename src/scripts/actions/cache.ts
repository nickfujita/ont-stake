import { PUT_CACHE, RESET_CACHE } from '../constants/actions';

export function putCache(key: string, value: any) {
  return {
    type: PUT_CACHE,
    data: {
      key,
      value,
    },
  };
}

export function resetCache() {
  return {
    type: RESET_CACHE,
  };
}
