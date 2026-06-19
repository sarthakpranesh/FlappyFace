"use strict";

import { makeMutable } from 'react-native-reanimated';
const sharedState = makeMutable({});
const getGameState = () => {
  'worklet';

  return sharedState.value;
};
const setGameState = updater => {
  'worklet';

  sharedState.value = typeof updater === 'function' ? updater(sharedState.value) : updater;
};
const gameState = {
  getGameState,
  setGameState
};
export default gameState;
//# sourceMappingURL=gameState.js.map