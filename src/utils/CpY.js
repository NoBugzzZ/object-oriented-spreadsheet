import Formula from "./Function.js";

class CpY {
  constructor(row, col, schema) {
    this.row = row;
    this.col = col;
    this.schema = this.resolveSchema(schema);
    const data = this.getDefault(this.schema);
    const proxy = this.getProxy(this.schema, data);
    proxy.quantity = 2;
    proxy.cost = 6;
    this.data = [[proxy]];
  }
  getRow(index) {
    const rowNum = this.data.length;
    const getIndex = typeof index == "number" ? index : rowNum - 1;
    return [...this.data[getIndex]];
  }
  getCol(index){
    const rowNum = this.data.length;
    const colNum = this.data[0].length;
    const getIndex = typeof index == "number" ? index : colNum - 1;
    const res=[];
    for(let i=0;i<rowNum;i++){
      res.push(this.data[i][getIndex]);
    }
    return res;
  }
  addRow(index) {
    const rowNum = this.data.length;
    const colNum = this.data[0].length;
    const insertIndex = typeof index == "number" ? index : rowNum;
    const row = [];
    for (let i = 0; i < colNum; i++) {
      const data = this.getDefault(this.schema);
      const proxy = this.getProxy(this.schema, data);
      row.push(proxy);
    }
    this.data.splice(insertIndex, 0, row);
    return this;
  }
  addCol(index) {
    const rowNum = this.data.length;
    const colNum = this.data[0].length;
    const insertIndex = typeof index == "number" ? index : colNum;
    for (let i = 0; i < rowNum; i++) {
      const data = this.getDefault(this.schema);
      const proxy = this.getProxy(this.schema, data);
      this.data[i].splice(insertIndex, 0, proxy);
    }
    return this;
  }
  deleteRow(index) {
    const rowNum = this.data.length;
    if (rowNum > 1) {
      const deleteIndex = typeof index == "number" ? index : rowNum - 1;
      this.data.splice(deleteIndex, 1);
    }
    return this;
  }
  deleteCol(index) {
    const colNum = this.data[0].length;
    if (colNum > 1) {
      const rowNum = this.data.length;
      const deleteIndex = typeof index == "number" ? index : colNum - 1;
      for (let i = 0; i < rowNum; i++) {
        this.data[i].splice(deleteIndex, 1);
      }
    }
    return this;
  }
  update(row, col, p, newValue) {
    this.data[row][col][p] = newValue;
    return this;
  }
  resolveSchema(schema) {
    schema["_formulas"] = [];
    const { properties } = schema;
    for (let [key, value] of Object.entries(properties)) {
      if (value.hasOwnProperty("formula")) {
        const { formula } = value;
        const expressionPattern = /^\w+(\s[-+*/]\s\w+)*$/i;
        if (expressionPattern.test(formula)) {
          const variableReg = /\w+/ig;
          // const operatorReg = /\s[-+*/]\s/ig
          const variables = Array.from(new Set(formula.match(variableReg)));
          schema["_formulas"].push({ formula: value.formula, func: "CALC", target: key, sources: variables });
        }
      }
    }
    return schema;
  }
  getProxy(schema, data) {
    const { _formulas } = schema;
    const proxy = new Proxy(data, {
      set(target, p, newValue, receiver) {
        console.log(p, newValue)
        const res = Reflect.set(target, p, newValue, receiver);
        _formulas.forEach(f => {
          const { func } = f;
          if (func === "CALC") {
            const { formula, sources, target: t } = f;
            if (sources.includes(p)) {
              const sourcesMap = sources.map(source => ({ [source]: proxy[source] }));
              let expression = formula;
              sourcesMap.forEach(s => {
                for (const key of Object.keys(s)) {
                  expression = expression.replaceAll(key, s[key]);
                }
              })
              proxy[t] = Formula["CALC"](expression);
            }
          }
        })
        return res;
      }
    });
    return proxy;
  }
  getDefault(schema) {
    const { properties } = schema;
    let data = {};
    for (let [key, value] of Object.entries(properties)) {
      data[key] = this.getDefaultByType(value.type)
    }
    return data;
  }
  getDefaultByType(type) {
    const mapper = {
      "integer": 0,
      "number": 0.0,
      "string": "",
      "boolean": false,
      "null": null
    }
    return mapper[type];
  }
}

export default CpY;