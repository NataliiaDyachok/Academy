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

// =============================== LECTURE 5

// =============================== Home task 1

function checkIsEmpty(obj) {
  for (var key in obj) {
    return false;
  }
  return true;
}

// =============================== Home task 2

function compareObjects(obj1, obj2) {
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return false;
  }
  if (obj1 === undefined || obj2 === undefined) {
    return false;
  }
  if (obj1 === null || obj2 === null) {
    return false;
  }

  if (Object.keys(obj1).length !== Object.keys(obj2).length) {
    return false;
  }

  return Object.keys({ ...obj1, ...obj2 }).every((key) => {
    if (obj1.hasOwnProperty(key) !== obj2.hasOwnProperty(key)) return false;

    switch (typeof obj1[key]) {
      case 'object':
        if (
          obj1[key] instanceof Date &&
          obj2[key] instanceof Date &&
          String(obj1[key]) !== String(obj2[key])
        )
          return false;

        // if (!Object.compare(obj1[key], obj2[key])) return false;
        return compareObjects(obj1[key], obj2[key]);
        break;
      case 'function':
        if (
          typeof obj2[key] === 'undefined' ||
          obj1[key].toString() !== obj2[key].toString()
        )
          return false;
        else return true;
        break;
      default:
        return obj1[key] === obj2[key];
    }
  });
}

// =============================== Home task 3
function findCrossObjects(obj1, obj2) {
  let crossFilds = [];

  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return crossFilds;
  }
  if (obj1 === undefined || obj2 === undefined) {
    return crossFilds;
  }
  if (obj1 === null || obj2 === null) {
    return crossFilds;
  }

  const checkData = (key, data1, data2) => {
    switch (typeof data1) {
      case 'object':
        if (
          data1 instanceof Date &&
          data2 instanceof Date &&
          String(data1) === String(data2)
        ) {
          crossFilds.push(key);
        } else if (
          data1 instanceof Array &&
          data2 instanceof Array &&
          String(data1) === String(data2)
        ) {
          crossFilds.push(key);
        } else
          Object.keys({ ...data1 }).every((keyIn) => {
            checkData(keyIn, data1[keyIn], data2[keyIn]);
            return true;
          });
        break;
      case 'function':
        if (
          typeof data2 !== 'undefined' &&
          data1.toString() === data2.toString()
        )
          crossFilds.push(key);
        break;
      default:
        if (data1 === data2) {
          crossFilds.push(key);
        }
    }
  };

  Object.keys({ ...obj1 }).every((key) => {
    checkData(key, obj1[key], obj2[key]);
    return true;
  });

  return crossFilds;
}

function findVAlueForKey(obj, key) {
  if (!key in obj) return 'Key Error';

  return obj[key];
}

// =============================== Home task 2

function Circle(x, y, r) {
  this.x = x;
  this.y = y;
  this.r = r;

  this.getAreaCircle = function () {
    return Math.PI * Math.pow(this.r, 2);
  };

  this.getPerimeterCircle = function () {
    return 2 * Math.PI * this.r;
  };
}

function getAreaOfIntersectionOfCircles(firstСircle, secondCircle) {
  let distance = Math.sqrt(
    Math.pow(firstСircle.x - secondCircle.x, 2) +
      Math.pow(firstСircle.y - secondCircle.y, 2),
  );

  if (distance >= firstСircle.r + secondCircle.r) {
    return 0;
  } else if (distance + secondCircle.r <= firstСircle.r) {
    return secondCircle.getAreaCircle();
  } else if (distance + firstСircle.r <= secondCircle.r) {
    return firstСircle.getAreaCircle();
  } else {
    const F1 =
      2 *
      Math.acos(
        (firstСircle.r * firstСircle.r -
          secondCircle.r * secondCircle.r +
          distance * distance) /
          (2 * firstСircle.r * distance),
      );
    const F2 =
      2 *
      Math.acos(
        (secondCircle.r * secondCircle.r -
          firstСircle.r * firstСircle.r +
          distance * distance) /
          (2 * secondCircle.r * distance),
      );

    const S1 = (firstСircle.r * firstСircle.r * (F1 - Math.sin(F1))) / 2;
    const S2 = (secondCircle.r * secondCircle.r * (F2 - Math.sin(F2))) / 2;

    return S1 + S2;
  }
}

// =============================== Home task 2

function checkPointForCoircle(circle, point) {
  return (
    Math.pow(point.x - circle.x, 2) + Math.pow(point.y - circle.y, 2) <=
    Math.pow(circle.r, 2)
  );
}

// =============================== LECTURE 6

// =============================== Home task 1

function multiplyMatrix(A, B) {
  let rowsA = A.length,
    colsA = A[0].length,
    rowsB = B.length,
    colsB = B[0].length,
    C = [];

  if (colsA != rowsB) return false;
  for (let i = 0; i < rowsA; i++) C[i] = [];
  for (let k = 0; k < colsB; k++) {
    for (let i = 0; i < rowsA; i++) {
      let t = 0;
      for (let j = 0; j < rowsB; j++) {
        t += A[i][j] * B[j][k];
      }
      C[i][k] = t;
    }
  }
  return C;
}

// =============================== Home task 3

function myReduce(arr) {
  let sum = 0;
  for (var i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
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

  console.log('=============================== LECTURE 5');
  console.log('=============================== Home task 1');
  const objForCheck = {};
  console.log(
    `The object ${JSON.stringify(objForCheck)} ${
      checkIsEmpty(objForCheck) ? `is empty ` : `isn\'t empty`
    }`,
  );

  const obj1 = {
    prop1: 'value1',
    prop2: 'value2',
    prop3: 'value3',
    prop4: {
      subProp1: 'sub value1',
      subProp2: {
        subSubProp1: 'sub sub value1',
        subSubProp2: [1, 2, 4, 5],
      },
    },
    prop5: 1000,
    prop6: new Date(2016, 2, 10),
    prop7: (obj) => {
      for (var key in obj) {
        return false;
      }
      return true;
    },
  };

  var obj2 = {
    prop5: 1000,
    prop3: 'value3',
    prop1: 'value1',
    prop2: 'value2',
    prop6: new Date('2016/03/10'),
    prop4: {
      subProp2: {
        subSubProp1: 'sub sub value1',
        subSubProp2: [1, 2, 4, 5],
      },
      subProp1: 'sub value1',
    },
    prop7: (obj) => {
      for (var key in obj) {
        return false;
      }
      return true;
    },
  };
  console.log(compareObjects(obj1, obj2));

  console.log(findCrossObjects(obj1, obj2));

  console.log(findVAlueForKey(obj1, 'prop4'));

  console.log('=============================== Home task 2');

  const firstСircle = new Circle(20, 50, 15);
  const secondCircle = new Circle(30, 55, 40);
  console.log(
    `Area of intersection of circles: ${getAreaOfIntersectionOfCircles(
      firstСircle,
      secondCircle,
    ).toFixed(2)}`,
  );

  console.log('=============================== Home task 3');

  checkPointForCoircle(firstСircle, { x: 25, y: 60 })
    ? console.log('The point belongs to the circle')
    : console.log('The point does not belongs to the circle');

  console.log('=============================== LECTURE 6');
  console.log('=============================== Home task 1');

  const M = 3;
  const N = 4;
  const Q = 5;

  var arrA = new Array(M); // `M`
  for (var i = 0; i < M; i++) {
    arrA[i] = [0, 1, 1, 0]; //  `N`
  }
  console.log(arrA);

  var arrB = new Array(N); // `N`
  for (var i = 0; i < N; i++) {
    arrB[i] = [0, 1, 1, 0, 0]; // `Q`
  }
  console.log(arrB);

  console.log(multiplyMatrix(arrA, arrB));

  console.log('=============================== Home task 2');

  const arr = [1, 2, 2, 3, 3, 3];
  const set = new Set(arr);
  console.log(set);

  console.log('=============================== Home task 3');

  console.log(myReduce(arr));
}

boot();
