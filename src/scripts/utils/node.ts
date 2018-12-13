export function getNodeDistro(node, userStakes) {
  const {
    maxStake = 1,
    totalStake = 0,
    ownerStake = 0,
    usersStake = 0,
    publicKey,
  } = node;

  const userStake = userStakes && userStakes[publicKey];
  const activeUserStake = (userStake && userStake.activeStake || 0);
  const activeUserPendingStake = (userStake && userStake.pendingStake || 0);

  const ownerPercentage = ownerStake / maxStake;
  const usersPercentage = (usersStake - activeUserStake) / maxStake;
  const activeUserPercentage = activeUserStake / maxStake;
  const openPercentage = 1 - (totalStake / maxStake);

  return {
    ...node,
    activeUserStake,
    activeUserPendingStake,
    ownerPercentage,
    usersPercentage,
    activeUserPercentage,
    openPercentage,
  };
}
