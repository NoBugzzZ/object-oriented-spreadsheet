function sum(items = [], key = '') {
  return items.reduce((prev, cur) => prev + cur[key], 0);
}

const Formula = {
  "SUM": sum
}

export {
  Formula
}