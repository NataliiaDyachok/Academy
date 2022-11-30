interface TokenizerInterface {
  token: string | undefined | number;
  next: Function;  
}

interface CoefficientsInterface {
  get: Function;
  set: Function;
  forEach: Function;
  toString: Function;
  toPowerOf: Function;
  multiply: Function;
  divide: Function;
  add: Function
}

function makeTokenizerTs(source: string): TokenizerInterface {
  let c: string, i: number;
  let tokenizer: TokenizerInterface;
  i = 0; // The index of the current character.
  c = source.charAt(i); // The current character.
  function consumeChar(): string {
    // Move to next c, return previous c.
    let prevC = c;
    i += 1;
    c = source.charAt(i);
    return prevC;
  }
  tokenizer = {
    token: '',
    next: function (): void {
      let str: string;
      while (c === ' ') {
        // Skip spaces
        consumeChar();
      }
      if (!c) {
        tokenizer.token = undefined; // End of source
      } else if (c >= '0' && c <= '9') {
        // number
        str = consumeChar(); // First digit
        while (c >= '0' && c <= '9') {
          // Look for more digits.
          str += consumeChar();
        }
        tokenizer.token = Number(str);
      } else if (c === 'x') {
        tokenizer.token = consumeChar();
      } else {
        // single-character operator
        tokenizer.token = consumeChar();
      }
    },
  };
  tokenizer.next(); // Load first token.
  return tokenizer;
}
function makeCoefficientsTs(): CoefficientsInterface {
  // Make like an array but can have -ve indexes
  let min = 0,
    max = 0,
    c = {};
  return {
    get: function (i: number) {
      return c[i] || 0;
    },
    set: function (i: number, value: number | string) {
      c[i] = value;
      min = Math.min(i, min);
      max = Math.max(i + 1, max);
      return this; // for chaining
    },
    forEach: function (callback: Function) {
      let i: number;
      for (i = min; i < max; i += 1) {
        if (this.get(i)) {
          callback(this.get(i), i);
        }
      }
    },
    toString: function (): string {
      let result = '',
        first = true;
      this.forEach(function (val: number, power: number) {
        result += val < 0 || first ? '' : '+';
        first = false;
        result += val === 1 && power !== 0 ? '' : val;
        if (power) {
          result += 'x';
          if (power !== 1) {
            result += '^' + power;
          }
        }
      });
      return result;
    },
    toPowerOf: function (power: number) {
      if (power === 0) {
        return makeCoefficientsTs().set(0, 1); // Anything ^0 = 1
      }
      if (power === 1) {
        return this;
      }
      if (power < 0) {
        throw 'cannot raise to negative powers';
      }
      return this.multiply(this.toPowerOf(power - 1));
    },
    multiply: function (coefficients: CoefficientsInterface) {
      let result = makeCoefficientsTs();
      this.forEach(function (a: number, i: number) {
        coefficients.forEach(function (b: number, j: number) {
          result.set(i + j, result.get(i + j) + a * b);
        });
      });
      return result;
    },
    divide: function (coefficients: CoefficientsInterface): CoefficientsInterface {
      // Division is hard, for example we cannot do infinite series like:
      // 1/(1 + x^2) = sum_(n=0 to infinity) 1/2 x^n ((-i)^n + i^n)
      // So we do a few easy cases only.
      let that = this,
        result = makeCoefficientsTs(),
        done: boolean;
      coefficients.forEach(function (value: number, pow: number) {
        that.forEach(function (value2: number, pow2: number) {
          result.set(pow2 - pow, value2 / value);
        });
        if (done) {
          throw 'cannot divide by ' + coefficients.toString();
        }
        done = true;
      });
      return result;
    },
    add: function (coefficients: CoefficientsInterface, op: string) {
      let result = makeCoefficientsTs();
      this.forEach(function (value: number | string, i: number) {
        result.set(value, i);
      });
      let operation  = op === '-' ? -1 : 1;
      coefficients.forEach(function (value: number, i: number) {
        result.set(i, result.get(i) + value * operation);
      });
      return result;
    },
  };
}
// let evaluateSumTs; // Called recursively
function evaluateTermTs(tokenizer: TokenizerInterface) {
  let result: CoefficientsInterface | boolean;

  if (tokenizer.token === '(') {
    tokenizer.next();
    result = evaluateSumTs(tokenizer);
    
    let newToken = tokenizer.token;
    if (newToken !== ')') {
      throw ') missing';
    }
    tokenizer.next();
  } else if (typeof tokenizer.token === 'number') {
    result = makeCoefficientsTs().set(0, tokenizer.token);
    tokenizer.next();
  } else if (tokenizer.token === 'x') {
    tokenizer.next();
    result = makeCoefficientsTs().set(1, 1); // x^1
  } else {
    return false; // Not a 'term'
  }
  return result;
}
function evaluatePowerTs(tokenizer: TokenizerInterface) {
  let result: CoefficientsInterface | boolean;
  result = evaluateTermTs(tokenizer);
  if (tokenizer.token === '^' && typeof result !== 'boolean') {
    tokenizer.next();
    if (typeof tokenizer.token !== 'number') {
      throw 'number expected after ^';
    }
    result = result.toPowerOf(tokenizer.token);
    tokenizer.next();
  }
  return result;
}
function evaluateProductTs(tokenizer: TokenizerInterface) {
  let term: CoefficientsInterface | boolean, divOp: boolean;
  let result: CoefficientsInterface | boolean;
  result = evaluatePowerTs(tokenizer);
  if (!result) {
    throw 'Term not found';
  }
  while (true) {
    divOp = tokenizer.token === '/';
    if (divOp) {
      tokenizer.next();
      term = evaluatePowerTs(tokenizer);
      result = typeof result !== 'boolean'? result.divide(term): result;
    } else {
      term = evaluatePowerTs(tokenizer);
      if (!term) {
        break;
      }
      result = typeof result !== 'boolean'? result.multiply(term): result;
    }
  }
  return result;
}
function evaluateSumTs(tokenizer: TokenizerInterface) {
  let result: CoefficientsInterface | boolean, op: string | undefined | number;
  result = evaluateProductTs(tokenizer);
  while (tokenizer.token === '+' || tokenizer.token === '-') {
    op = tokenizer.token;
    tokenizer.next();
    result = typeof result !== 'boolean'? result.add(evaluateProductTs(tokenizer), op): result;
  }
  return result;
}

function evaluateTs(source: string): void {
  let tokenizer = makeTokenizerTs(source),
    coefficients = evaluateSumTs(tokenizer);
  if (tokenizer.token) {
    throw 'Unexpected token ' + tokenizer.token;
  }
  console.log(source + ' => ' + coefficients.toString());
}

function bootTs(): void {
  evaluateTs('(x+1)(x+1)'); // => 1+2x+x^2
  evaluateTs('(x+1)^2'); // => 1+2x+x^2
  evaluateTs('(x+1)(x+1)(x+1)'); // => 1+3x+3x^2+x^3
  evaluateTs('(x+1)^3'); // => 1+3x+3x^2+x^3
  evaluateTs('(x)(x+1)'); // => x+x^2
  evaluateTs('(x+1)(x)'); // => x+x^2
  evaluateTs('3x^0'); // => 3
  evaluateTs('2^3'); // => 8
  evaluateTs('(x+2x(x+2(x+1)x))'); // => x+6x^2+4x^3
  evaluateTs('(x+1)(x-1)'); // => -1+x^2
  evaluateTs('(x+1)(x+1)/x'); // x^-1+2+x
}

bootTs();
