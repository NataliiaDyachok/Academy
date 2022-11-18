function calcExpr(sExpr) {
  let resObj = {};
  resObj.correct = true;
  resObj.result = 0;
  resObj.msg = '';

  //checking block of math expression
  let splitExpression = sExpr.split('');
  let testArray = splitExpression.filter(function (item) {
    if (!isNaN(+item)) return item;
    else if (/[\*\/\+\-\(\)]/g.test(item)) return item;
  });
  if (testArray.length != splitExpression.length) {
    resObj.correct = false;
    resObj.result = 0;
    resObj.msg =
      'Please enter a correct math expressions contains numbers or * / + - ( )';
    return resObj;
  }

  resObj.result = eval(sExpr);
  return resObj;
}

module.exports = { calcExpr };
