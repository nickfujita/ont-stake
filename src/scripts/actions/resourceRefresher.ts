let queue = {};
let interval;

const MAX_REFRESH_INTERVAL = 5000;

export function addCaller(key, call) {
  return dispatch => {
    if (!interval) {
      interval = setInterval(() => dispatch(executeCalls()), MAX_REFRESH_INTERVAL);
    }
    const entry = queue[key];

    // caller already exists but is disabled
    // check to see last time called, and if it was too recent, just mark as not disabled
    // it will be called on next execution cycle
    if (entry && Date.now() - entry.lastCalled < MAX_REFRESH_INTERVAL) {
      queue[key]  = {...queue[key], disabled: false};
      return Promise.resolve();
    }

    queue[key]  = {...queue[key], call, disabled: false, lastCalled: Date.now()};
    return dispatch(call);
  };
}

export function disableCaller(key) {
  if (queue[key]) {
    queue[key] = {...queue[key], disabled: true};
  }
}

// export function removeCaller(key) {
//   delete neoQueue[key];
// }

export function executeCalls() {
  return dispatch => {
    Object.keys(queue).forEach(key => {
      const entry = queue[key];
      const {
        call,
        lastCalled,
        disabled,
      } = entry;

      // if the last time caller was called is less than the max allowed interval, skip
      // also skip if caller is disabled
      if (!entry || disabled || Date.now() - lastCalled < MAX_REFRESH_INTERVAL) {
        return;
      }

      // update the last called time, and execute call
      queue[key] = {...entry, lastCalled: Date.now()};
      return dispatch(call);
    });
  };
}

export function clearCalls() {
  queue = {};
  interval && clearTimeout(interval)
}
