export function getCache(cache, account, key) {
  return cache[`${account && account.address}_${key}`] || {};
}
