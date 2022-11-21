function sum(...items) {
  return items.reduce((prev, cur) => prev + cur, 0);
}

function arithmetic(expression="1+1"){
  // eslint-disable-next-line no-new-func
  return new Function(`return ${expression}`)()
}

const Formula = {
  "SUM": sum,
  "CALC": arithmetic
}

export default Formula