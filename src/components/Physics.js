import Constants from '../Constant';

let pause = false;
let birdJump = 0;
let gravity = 0;
let scored = false;

export const stopGame = () => {
  gravity = 0;
  birdJump = 0;
  scored = false;
  pause = true;
};

export const startGame = () => {
  gravity = 0;
  birdJump = 0;
  scored = false;
  pause = false;
};

//random function to return values between min and max parameters
export const randomBetween = () => {
  const min = Constants.PIPE_MIN;
  const max = Constants.MAX_HEIGHT - Constants.GAP_SIZE;
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const GameControl = (entities, {touches, dispatch}) => {
  if (!pause) {
    Object.keys(entities).forEach(key => {
      const bird = entities['1'];
      const body = entities[key];
      if (body.name === 'floor') {
        // if floor, move the floor
        // check if bird collides with floor
        if (bird.position[1] + Constants.BIRD_HEIGHT / 2 >= body.position[1]) {
          dispatch({type: 'game-over'});
        }
        body.position[0] -= 2;
        if (body.position[0] <= -Constants.MAX_WIDTH) {
          body.position[0] = Constants.MAX_WIDTH;
        }
      } else if (body.name === 'pipe' && gravity !== 0) {
        // if pipe, move pipe
        if (
          bird.position[0] - Constants.BIRD_WIDTH / 2 >
            body.position[0] + Constants.PIPE_WIDTH &&
          !scored
        ) {
          scored = true;
          dispatch({type: 'score'});
        }
        // check if bird collides with pipes
        const bpx = bird.position[0];
        const bpy = bird.position[1];
        const dpx = body.position[0];
        if (
          bpx + Constants.BIRD_WIDTH / 2 >= dpx &&
          bpx - Constants.BIRD_WIDTH / 2 <= dpx + Constants.PIPE_WIDTH
        ) {
          if (
            bpy - Constants.BIRD_HEIGHT / 2 <= body.position[2] ||
            bpy + Constants.BIRD_HEIGHT / 2 >=
              body.position[2] + Constants.GAP_SIZE
          ) {
            dispatch({type: 'game-over'});
          }
        }

        // reset pipe if it is out of view
        if (body.position[0] <= -Constants.PIPE_WIDTH) {
          scored = false;
          body.position[2] = randomBetween();
          body.position[0] = Constants.MAX_WIDTH * 2 + Constants.PIPE_WIDTH / 2;
        }
        body.position[0] -= 2;
        return;
      } else {
        // if bird, apply gravity
        body.position[1] += gravity - birdJump;
        if (birdJump > 0) {
          birdJump--;
        }
      }
    });
  }

  touches.forEach(t => {
    if (gravity === 0) {
      gravity = 9.8;
    }

    if (!(entities['1'].position[1] < 50)) {
      birdJump = gravity * 2;
    }
  });

  return entities;
};
