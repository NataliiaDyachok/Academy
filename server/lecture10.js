function makeTokenizerTs(source) {
    var c, i;
    var tokenizer;
    i = 0; // The index of the current character.
    c = source.charAt(i); // The current character.
    function consumeChar() {
        // Move to next c, return previous c.
        var prevC = c;
        i += 1;
        c = source.charAt(i);
        return prevC;
    }
    tokenizer = {
        token: '',
        next: function () {
            var str;
            while (c === ' ') {
                // Skip spaces
                consumeChar();
            }
            if (!c) {
                tokenizer.token = undefined; // End of source
            }
            else if (c >= '0' && c <= '9') {
                // number
                str = consumeChar(); // First digit
                while (c >= '0' && c <= '9') {
                    // Look for more digits.
                    str += consumeChar();
                }
                tokenizer.token = Number(str);
            }
            else if (c === 'x') {
                tokenizer.token = consumeChar();
            }
            else {
                // single-character operator
                tokenizer.token = consumeChar();
            }
        }
    };
    tokenizer.next(); // Load first token.
    return tokenizer;
}
function makeCoefficientsTs() {
    // Make like an array but can have -ve indexes
    var min = 0, max = 0, c = {};
    return {
        get: function (i) {
            return c[i] || 0;
        },
        set: function (i, value) {
            c[i] = value;
            min = Math.min(i, min);
            max = Math.max(i + 1, max);
            return this; // for chaining
        },
        forEach: function (callback) {
            var i;
            for (i = min; i < max; i += 1) {
                if (this.get(i)) {
                    callback(this.get(i), i);
                }
            }
        },
        toString: function () {
            var result = '', first = true;
            this.forEach(function (val, power) {
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
        toPowerOf: function (power) {
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
        multiply: function (coefficients) {
            var result = makeCoefficientsTs();
            this.forEach(function (a, i) {
                coefficients.forEach(function (b, j) {
                    result.set(i + j, result.get(i + j) + a * b);
                });
            });
            return result;
        },
        divide: function (coefficients) {
            // Division is hard, for example we cannot do infinite series like:
            // 1/(1 + x^2) = sum_(n=0 to infinity) 1/2 x^n ((-i)^n + i^n)
            // So we do a few easy cases only.
            var that = this, result = makeCoefficientsTs(), done;
            coefficients.forEach(function (value, pow) {
                that.forEach(function (value2, pow2) {
                    result.set(pow2 - pow, value2 / value);
                });
                if (done) {
                    throw 'cannot divide by ' + coefficients.toString();
                }
                done = true;
            });
            return result;
        },
        add: function (coefficients, op) {
            var result = makeCoefficientsTs();
            this.forEach(function (value, i) {
                result.set(value, i);
            });
            var operation = op === '-' ? -1 : 1;
            coefficients.forEach(function (value, i) {
                result.set(i, result.get(i) + value * operation);
            });
            return result;
        }
    };
}
// let evaluateSumTs; // Called recursively
function evaluateTermTs(tokenizer) {
    var result;
    if (tokenizer.token === '(') {
        tokenizer.next();
        result = evaluateSumTs(tokenizer);
        var newToken = tokenizer.token;
        if (newToken !== ')') {
            throw ') missing';
        }
        tokenizer.next();
    }
    else if (typeof tokenizer.token === 'number') {
        result = makeCoefficientsTs().set(0, tokenizer.token);
        tokenizer.next();
    }
    else if (tokenizer.token === 'x') {
        tokenizer.next();
        result = makeCoefficientsTs().set(1, 1); // x^1
    }
    else {
        return false; // Not a 'term'
    }
    return result;
}
function evaluatePowerTs(tokenizer) {
    var result;
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
function evaluateProductTs(tokenizer) {
    var term, divOp;
    var result;
    result = evaluatePowerTs(tokenizer);
    if (!result) {
        throw 'Term not found';
    }
    while (true) {
        divOp = tokenizer.token === '/';
        if (divOp) {
            tokenizer.next();
            term = evaluatePowerTs(tokenizer);
            result = typeof result !== 'boolean' ? result.divide(term) : result;
        }
        else {
            term = evaluatePowerTs(tokenizer);
            if (!term) {
                break;
            }
            result = typeof result !== 'boolean' ? result.multiply(term) : result;
        }
    }
    return result;
}
function evaluateSumTs(tokenizer) {
    var result, op;
    result = evaluateProductTs(tokenizer);
    while (tokenizer.token === '+' || tokenizer.token === '-') {
        op = tokenizer.token;
        tokenizer.next();
        result = typeof result !== 'boolean' ? result.add(evaluateProductTs(tokenizer), op) : result;
    }
    return result;
}
function evaluateTs(source) {
    var tokenizer = makeTokenizerTs(source), coefficients = evaluateSumTs(tokenizer);
    if (tokenizer.token) {
        throw 'Unexpected token ' + tokenizer.token;
    }
    console.log(source + ' => ' + coefficients.toString());
}
function bootTs() {
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
