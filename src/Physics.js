import Matter from 'matter-js';
import Constants from './Constant';
import Pipes from './Pipe';
import PipeTop from './PipeTop';

let pipes = 0;
let pipeDeleted = 0;
let pause = false;

export const resetPipes = () => {
  pipes = 0;
  pipeDeleted = 0;
};

export const stopGame = () => {
  pause = true;
};

export const startGame = () => {
  pause = false;
};

//random function to return values between min and max parameters
export const randomBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

//returns an array of heights of two pipes (one pair of pipes)
export const generatePipes = () => {
  //gives me random height between 100 and (heightOfDisplay/2)-100
  let topPipeHeight = randomBetween(100, Constants.MAX_HEIGHT / 2 - 100);
  //heightOfDisplay-topPipeHeight-GapSize
  let bottomPipeHeight =
    Constants.MAX_HEIGHT - topPipeHeight - Constants.GAP_SIZE;
  let sizes = [topPipeHeight, bottomPipeHeight];

  if (Math.random() < 0.5) {
    sizes = sizes.reverse();
  }

  return sizes;
};

export const addPipesAtLocation = (x, world, entities) => {
  let [pipe1Height, pipe2Height] = generatePipes();

  let pipe1Top = Matter.Bodies.rectangle(
    x,
    pipe1Height / 2,
    Constants.PIPE_WIDTH,
    pipe1Height,
    {
      isStatic: true,
    },
  );

  let pipe1 = Matter.Bodies.rectangle(
    x,
    pipe1Height + Constants.GAP_SIZE + pipe2Height / 2 - 50,
    Constants.PIPE_WIDTH,
    pipe2Height,
    {
      isStatic: true,
    },
  );

  Matter.World.add(world, [pipe1, pipe1Top]);
  entities['pipe' + (pipes + 1)] = {
    body: pipe1,
    renderer: Pipes,
    scored: false,
  };
  entities['pipe' + (pipes + 1) + 'Top'] = {
    body: pipe1Top,
    renderer: PipeTop,
    scored: false,
  };

  pipes += 1;
};

const Physics = (entities, {touches, time, dispatch}) => {
  if (!pause) {
    let engine = entities.physics.engine;
    let bird = entities.bird.body;
    let world = entities.physics.world;

    let hadTouches = false;
    touches.forEach(t => {
      if (!hadTouches) {
        if (world.gravity.y === 0.0) {
          world.gravity.y = 1.2;
          addPipesAtLocation(
            Constants.MAX_WIDTH * 2 - Constants.PIPE_WIDTH,
            world,
            entities,
          );
          addPipesAtLocation(
            Constants.MAX_WIDTH * 3 - Constants.PIPE_WIDTH,
            world,
            entities,
          );
        }
        if (!(bird.position.y < 20)) {
          Matter.Body.setVelocity(bird, {
            x: bird.velocity.x,
            y: -16,
          });
        }
      }
    });

    Matter.Engine.update(engine, time.delta);

    Object.keys(entities).forEach(key => {
      if (key.indexOf('pipe') === 0 && entities.hasOwnProperty(key)) {
        Matter.Body.translate(entities[key].body, {x: -2, y: 0});
        if (key.indexOf('Top') !== -1) {
          if (
            entities[key].body.position.x < bird.position.x &&
            !entities[key].scored
          ) {
            entities[key].scored = true;
            dispatch({type: 'score'});
          }

          if (
            entities[key].body.position.x <=
            (-1 * Constants.PIPE_WIDTH) / 2
          ) {
            pipeDeleted = pipeDeleted + 1;
            delete entities['pipe' + pipeDeleted + 'Top'];
            delete entities['pipe' + pipeDeleted];

            addPipesAtLocation(Constants.MAX_WIDTH * 2, world, entities);
          }
        }
      } else if (key.indexOf('floor') === 0) {
        if (entities[key].body.position.x <= (-1 * Constants.MAX_WIDTH) / 2) {
          Matter.Body.setPosition(entities[key].body, {
            x: Constants.MAX_WIDTH + Constants.MAX_WIDTH / 2,
            y: entities[key].body.position.y,
          });
        } else {
          Matter.Body.translate(entities[key].body, {x: -2, y: 0});
        }
      }
    });

    return entities;
  }
};

export default Physics;
