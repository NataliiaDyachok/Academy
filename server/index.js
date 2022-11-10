const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

// =============================== LECTURE 3

// =============================== Home task 1

function splitNumber(num) {
  console.log(String(num).split('').join(' '));
}

// =============================== Home task 2

const keysForTrans = {
  M: 1000,
  CM: 900,
  D: 500,
  CD: 400,
  C: 100,
  XC: 90,
  L: 50,
  XL: 40,
  X: 10,
  IX: 9,
  V: 5,
  IV: 4,
  I: 1,
};

function toRoman(num) {
  let result = '';

  for (let i in keysForTrans) {
    while (num >= keysForTrans[i]) {
      result += i;
      num -= keysForTrans[i];
    }
  }
  return result;
}

function fromRoman(r) {
  let result = 0;
  const order = Object.keys(keysForTrans);
  const rom = Array.from(r);

  rom.forEach((e, i) => {
    if (i < rom.length - 1 && order.indexOf(e) > order.indexOf(rom[i + 1])) {
      result -= keysForTrans[e];
    } else {
      result += keysForTrans[e];
    }
  });
  return result;
}

function calcSumExpression(strExpr) {
  const arrExpr = strExpr.split('+').map((item) => item.trim());

  let sum = 0;
  arrExpr.forEach((elem) => {
    sum += fromRoman(elem);
  });

  return toRoman(sum);
}

// =============================== LECTURE 4

// =============================== Home task 1

function calcPerimeterAndAreaOfSquare(side) {
  console.log(
    `Perimeter of square with a side ${side} is ${
      side * 4
    } and area of square is ${side * side}`,
  );
}

// =============================== Home task 2

var multiply = function (num) {
  let privateCounter = num;

  return {
    double: function () {
      privateCounter *= 2;
      return privateCounter;
    },
    square: function () {
      privateCounter *= privateCounter;
      return privateCounter;
    },
  };
};

// =============================== Home task 3

function createBase(x) {
  let count = x;
  return function (y) {
    return count + y;
  };
}

function boot() {
  // server.listen(port, hostname, () => {
  //   console.log(`Server running at http://${hostname}:${port}/`);
  // });
  // console.log('=============================== LECTURE 3');
  // console.log('=============================== Home task 1');
  // splitNumber(25);
  // console.log('=============================== Home task 2');
  // console.log(toRoman(40));
  // console.log(fromRoman('IV'));
  // console.log(calcSumExpression('XX + XX  '));
  // console.log(calcSumExpression('X + IX'));
  // console.log('=============================== LECTURE 4');
  // console.log('=============================== Home task 1');
  // calcPerimeterAndAreaOfSquare(10);
  // console.log('=============================== Home task 2');
  // console.log(multiply(5).square());
  // console.log(multiply(5).double());
  // console.log('=============================== Home task 3');
  // let addSix = createBase(6);
  // console.log(addSix(10)); // 16
  // console.log(addSix(21)); // 27
}

boot();
