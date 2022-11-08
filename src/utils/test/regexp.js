const formula = "Income.to.tal + Expense.total * Income.total / Income.total + Income.total"
const expressionPattern=/^\w+(\.\w+)*(\s[-+*/]\s\w+(\.\w+)*)*$/i;
const variableReg=/\w+(\.\w+)*/ig;
const operatorReg = /\s[-+*/]\s/ig
console.log(expressionPattern.test(formula))
console.log(Array.from(new Set(formula.match(variableReg))))
console.log(formula.match(operatorReg))
// const search = formula.matchAll(operatorReg);
// const params = [];
// const operators = [];
// let start = 0;
// let end = formula.length;
// for (let i of search) {
//   const operator = i[0];
//   const index = i.index;
//   operators.push({ operator, index });
//   let end = index;
//   params.push(formula.slice(start, end));
//   start = end + 3;
//   console.dir(i, { depth: null })
// }

// params.push(formula.slice(start,end))

// console.log(params,operators)