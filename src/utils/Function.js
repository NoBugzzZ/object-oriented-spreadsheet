function sum(items = [], key = '') {
  return items.reduce((prev, cur) => prev + cur[key], 0);
}

function arithmetic(expression="1+2-3*4/5"){

}

const Formula = {
  "SUM": sum
}

export default Formula