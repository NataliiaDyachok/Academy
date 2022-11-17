// const readline = require('node:readline/promises');
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });

function generateRandomInteger(min, max) {
  return Math.random() * (max - min) + min;
}

async function bootAsyncAwait() {
  const buyer = await rl.question('Input buyer, please! ');
  const product = await rl.question('Input product, please! ');
  const cost = generateRandomInteger(10, 500).toFixed(2);
  console.log(
    `Dear ${buyer}!\n Thank you for your purchase in our shop \n ${product} costs just ${cost}`,
  );
  console.log(`Have a nice day!`);
  rl.close();
}

function boot() {
  let ourBuyer = '';
  let ourProduct = '';
  rl.question('Input buyer, please! ')
    .then((buyer) => {
      ourBuyer = buyer;
      return rl.question('Input product, please! ');
    })
    .then((product) => {
      ourProduct = product;
      return generateRandomInteger(10, 500).toFixed(2);
    })
    .then((cost) =>
      console.log(
        `Dear ${ourBuyer}!\n Thank you for your purchase in our shop \n ${ourProduct} costs just ${cost}`,
        `Have a nice day!`,
      ),
    )
    .then(() => rl.close());
}

function bootCallBack() {
  let ourBuyer = '';
  let ourProduct = '';
  let ourCost = 0;

  rl.question('Input buyer, please! ', (buyer) => {
    ourBuyer = buyer;
    rl.question('Input product, please! ', (product) => {
      ourProduct = product;
      ourCost = generateRandomInteger(10, 500).toFixed(2);
      console.log(
        `Dear ${ourBuyer}!\n Thank you for your purchase in our shop \n ${ourProduct} costs just ${ourCost} \n`,
        `Have a nice day!`,
      );
      rl.close();
    });
  });
}

// boot();
// bootAsyncAwait();
bootCallBack();
