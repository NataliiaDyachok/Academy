const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });

const { calcExpr: calcExpressionFromModule } = require('./lecture9_calculator');

async function boot() {
  const expr = await rl.question('Input expression to evaluate, please! ');

  const resObj = calcExpressionFromModule(expr);
  if (!resObj.correct) {
    console.log(` ${resObj.msg}`);
  } else console.log(`The result is: ${resObj.result}`);
  rl.close();
}

boot();
