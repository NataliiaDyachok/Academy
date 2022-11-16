const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });

let globalPoints = 0;

function generateRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getAnswer = async () => {
  const answer = await rl.question('Input number, please! ');

  if (!isNaN(Number(answer))) {
    const randomNumber = generateRandomInteger(1, 6);

    if (randomNumber - Number(answer) === 0) {
      globalPoints = globalPoints + 2;
      console.log(`You won! You earned 2 points!`);
    } else if (
      randomNumber - Number(answer) <= 1 &&
      randomNumber - Number(answer) >= -1
    ) {
      globalPoints = globalPoints + 1;
      console.log(
        `The random number is: ${randomNumber}... You won! You earned 1 point!`,
      );
    } else {
      console.log(
        `The random number is: ${randomNumber}... You didn't guess... Try again!`,
      );
    }
    return true;
  } else {
    console.log(`Game Over. Your points are counted ${globalPoints}`);
    return false;
  }
};

async function boot() {
  while (await getAnswer()) {
    console.log(`Your points are counted ${globalPoints}`);
  }
  rl.close();
}

boot();
