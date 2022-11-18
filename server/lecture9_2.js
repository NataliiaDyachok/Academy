const readline = require('node:readline/promises');
const { stdin: input, stdout: output } = require('process');

const rl = readline.createInterface({ input, output });

async function boot() {
  const day = await rl.question('What is day today? ');
  try {
    let { schedule } = await import('./lecture9_2_' + day + '.js');
    console.log(schedule);
    rl.close();
  } catch {
    console.log('Attention, you entered the wrong day!');
    rl.close();
  }
}

boot();
