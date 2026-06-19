import { makeMutable } from 'react-native-reanimated';

const sharedState = makeMutable({});

const getGameState = () => {
  'worklet';
  return sharedState.value;
};

const setGameState = (updater: ((previousValue: any) => any) | any) => {
  'worklet';
  sharedState.value =
    typeof updater === 'function' ? updater(sharedState.value) : updater;
};

const gameState = {
  getGameState,
  setGameState,
};

export default gameState;
