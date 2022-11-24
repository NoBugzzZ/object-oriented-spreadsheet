import EventEmitter from "./Event.js"
import TwoDimensionArray from "./TwoDimensionArray.refactor.js";
import Formula from "./Function.js";

function getClass(className) {
  const mapper = {
    "TwoDimensionArray": TwoDimensionArray
  }
  return mapper[className];
}


function resolveRef(ref = "", $defs) {
  if (ref.startsWith("#/$defs/")) {
    const s = ref.split("/");
    return $defs[s[2]];
  }
}

function resolveFrom(from) {
  const froms = from.split("/");
  const className = froms[0];
  const context = froms[1];
  return [className, context];
}

function isBasicType(type) {
  const basicTypes = ["integer", "number", "string", "boolean", "null"];
  return basicTypes.includes(type);
}

function resolveContext(schema, parent, root) {
  const context = root.context;
  const { title, _from, _schema: refPath } = schema;
  const [className, direction] = resolveFrom(_from);
  const { title: parentTitle } = parent.schema;

  root.event.on(`#/${parentTitle}`, (start, deleteCount) => {
    // console.log(context[title].instance,start,deleteCount)
    if (deleteCount === 0) {
      context[title].instance[`insert${parentTitle}`](start);
    } else if(deleteCount === 1){
      context[title].instance[`delete${parentTitle}`](start);
    }
  })
  if (context.hasOwnProperty(title)) {
    if (context[title].path === refPath) {
      context[title] = { ...context[title], [direction]: parentTitle };
    }
  } else {
    context[title] = { path: refPath, [direction]: parentTitle, className };
  }
}

function constructContext(root) {
  for (let [key, value] of Object.entries(root.context)) {
    const { path, row, col, className } = value;
    const refSchema = resolveRef(path, root.entry.schema["$defs"]);
    const Class = getClass(className);
    value.instance = new Class(row, col, refSchema, key);
  }
}

function parse(schema) {
  const root = { entry: null, context: {}, event: null };
  root.event = new EventEmitter(schema.title);
  root.entry = parseSchema(schema, null, schema, root, "");
  constructContext(root);
  const rootData = parseData(root.entry, root);
  return [root, rootData];
}

function parseSchema(schema, parent, rootSchema, root, parentPath, key) {
  const _schema = schema.hasOwnProperty("$ref") ?
    resolveRef(schema["$ref"], rootSchema["$defs"]) : schema;
  const { type } = _schema;
  const entry = {
    schema: _schema,
    data: null,
    children: null,
    parent
  };
  if (type === "object") {
    entry.path = `${parentPath}${_schema.title}`
    entry.children = {};
    for (let [key, value] of Object.entries(_schema.properties)) {
      entry.children[key] = parseSchema(value, entry, rootSchema, root, `${entry.path}.`, key);
    }
  } else if (type === "array") {
    let itemShema = _schema.items.hasOwnProperty("$ref") ?
      resolveRef(_schema.items["$ref"], rootSchema["$defs"]) : _schema.items;
    entry.path = `${parentPath}${itemShema.title}`
    entry.children = [];
    entry.children.splice(0, 0, parseSchema(itemShema, entry, rootSchema, root, parentPath, 0));
  } else if (isBasicType(type)) {
    entry.path = parentPath.slice(0, parentPath.length - 1);
    entry.key = key;
  } else if (_schema.hasOwnProperty("_from")) {
    entry.path = parentPath.slice(0, parentPath.length - 1);
    entry.key = key;
    resolveContext(_schema, parent, root);
  }
  return entry;
}

function getDefault(type) {
  const mapper = {
    "integer": 0,
    "number": 0.0,
    "string": "",
    "boolean": false,
    "null": null
  }
  return mapper[type];
}

function resolveFormula(formula = "") {
  const start = formula.indexOf("(");
  const end = formula.lastIndexOf(")");
  const param = formula.slice(start + 1, end).split(".");
  const func = formula.slice(0, start);
  return [func, param];
}

function parseFormula(entry, root, parentData) {
  const res = {
    value: getDefault(entry.schema.type)
  }
  const { schema: { _formula } } = entry;
  const formulaPattern = /^[A-Z]+\(.*\)$/i
  const expressionPattern = /^\w+(\.\w+)*(\s[-+*/]\s\w+(\.\w+)*)*$/i;
  if (formulaPattern.test(_formula)) {
    const [func, param] = resolveFormula(_formula);
    if (param.length === 2) {
      for (let [key, value] of Object.entries(entry.parent.children)) {
        if (value?.path?.endsWith(param[0]) && value.schema.type === "array") {
          root.event.on(`${value.path}`, () => {
            if (!parentData[key]) return;
            res.value = Formula[func](...parentData[key].map(d => d[param[1]].value));
            root.event.emit(`${entry.path}.${entry.key}`)
          });
          root.event.on(`${value.path}.${param[1]}`, () => {
            if (!parentData[key]) return;
            res.value = Formula[func](...parentData[key].map(d => d[param[1]].value));
            root.event.emit(`${entry.path}.${entry.key}`)
          });
        } else if (value.schema.hasOwnProperty("_from") && value.schema["_schema"].endsWith(param[0])) {
          console.log(`### ${entry.path}.${entry.key}`)
          root.event.on(`${value.path}.${key}`, () => {
            if (!parentData[key]) return;
            const params=parentData[key].value.map(d => d[param[1]])
            // console.log(params,`${entry.path}.${entry.key}`)
            res.value = Formula[func](...params);
            root.event.emit(`${entry.path}.${entry.key}`)
          });
        }
      }
    }
  } else if (expressionPattern.test(_formula)) {
    const variableReg = /\w+(\.\w+)*/ig;
    const operatorReg = /\s[-+*/]\s/ig
    const variables = Array.from(new Set(_formula.match(variableReg)))
    const operators = _formula.match(operatorReg);
    variables.forEach(variable => {
      root.event.on(`${entry.path}.${variable}`, () => {
        const dataMap = variables.map(v => {
          const param = v.split(".");
          if (param.length === 1) {
            for (let [key, value] of Object.entries(entry.parent.children)) {
              if (key === param[0]) {
                return { [v]: parentData[key].value }
              }
            }
          } else if (param.length === 2) {
            for (let [key, value] of Object.entries(entry.parent.children)) {
              if (value.path.endsWith(param[0])) {
                return { [v]: parentData[key][param[1]].value }
              }
            }
          }
        })
        let expression = _formula;
        dataMap.forEach(d => {
          for (let key of Object.keys(d)) {
            expression = expression.replaceAll(key, d[key]);
          }
        })
        res.value = Formula["CALC"](expression);
        root.event.emit(`${entry.path}.${entry.key}`)
      })
    })
  }
  return res;
}

function propagation(entry) {
  let temp = entry;
  while (temp) {
    for (let [k, v] of Object.entries(temp.children)) {
      const { schema } = v;
      if (schema.hasOwnProperty("_formula")) {
        parseFormula(v, null);
      } else if (schema.type === "array") {
        v.data = v.children.map(child => child.data);
        v.data[Symbol.for("entry")] = v;
      } else if (schema.type === "object") {
        v.data = { [Symbol.for("entry")]: v };
        for (let [key, value] of Object.entries(v.children)) {
          v.data[key] = value.data;
        }
        v.data = new Proxy(v.data, {
          // eslint-disable-next-line no-loop-func
          set(target, p, newValue, receiver) {
            changeData(v.data[Symbol.for("entry")], p, newValue)
            return true;
          }
        })
      }
    }
    if (temp.parent === null) {
      temp.data = { [Symbol.for("entry")]: temp };
      for (let [key, value] of Object.entries(temp.children)) {
        temp.data[key] = value.data;
      }
      temp.data = new Proxy(temp.data, {
        // eslint-disable-next-line no-loop-func
        set(target, p, newValue, receiver) {
          changeData(temp.data[Symbol.for("entry")], p, newValue)
          return true;
        }
      })
    }
    temp = temp.parent;
  }

}

function changeData(entry, p, newValue) {

  for (let [key, value] of Object.entries(entry.children)) {
    if (key === p) {
      value.data = newValue;
      propagation(value.parent);
      break;
    }
  }
}

function toTypeValue(value, type) {
  switch (type) {
    case "string":
      return `${value}`
    case "integer":
      return parseInt(value);
    case "number":
      return Number(value);
    case "boolean":
      return Boolean(value);
    case "null":
      return null;
    default:
      return "";
  }
}

function observeSplice(obj, entry, root) {
  obj.splice = new Proxy(obj.splice, {
    apply(target, thisArg, argArray) {
      let res;
      const [start, deleteCount] = argArray;
      if (deleteCount === 0) {
        const item = parseData(entry.children[0], root);
        res = Reflect.apply(target, thisArg, [start, deleteCount, item]);
      } else if (deleteCount >= obj.length) {
        return;
      } else {
        res = Reflect.apply(target, thisArg, argArray);
      }
      root.event.emit(entry.path)
      for (let [key, value] of Object.entries(obj)) {
        value["_index"] = key;
      }
      const paths = entry.path.split(".")
      root.event.emit(`#/${paths[paths.length - 1]}`, start, deleteCount)
      return res;
    }
  })
  return obj;
}

function filterOwnKeys(obj, filterKeys = []) {
  return new Proxy(obj, {
    ownKeys(target) {
      const res = Reflect.ownKeys(target);
      const filterRes = res.filter(k => (
        (typeof k === "string" && !k.startsWith("_")) ||
        typeof k === "symbol")
        && !filterKeys.includes(k));
      // console.log(filterRes,filterKeys)
      return filterRes;
    }
  });
}

function addFunction(obj) {
  obj.insert = function (start) {
    this.splice(start, 0);
  }
  obj.delete = function (start, deleteCount = 1) {
    this.splice(start, deleteCount);
  }
}

function parseFromData(entry, root, parentData) {
  const { schema } = entry;
  const [className, direction] = resolveFrom(schema["_from"]);
  const res = {
    value: null,
    getValue: function (index) {
      const context = root.context[schema.title];
      this.value = context.instance[`get${context[direction]}`](index);
      root.event.emit(`${entry.path}.${entry.key}`)
    },
    update:function(row, col, p, newValue){
      const context = root.context[schema.title];
      context.instance[`update`](row, col, p, newValue);
      root.event.emit(`#/${root.context[schema.title].row}`)
      root.event.emit(`#/${root.context[schema.title].col}`)
    }
  };
  res.getValue(parentData["_index"])
  root.event.on(`#/${root.context[schema.title].row}`, () => {
    res.getValue(parentData["_index"])
  })
  root.event.on(`#/${root.context[schema.title].col}`, () => {
    res.getValue(parentData["_index"])
  })
  return res;
}

function parseData(entry, root, parentData) {
  const { children, schema } = entry;
  if (children === null) {
    if (schema.hasOwnProperty("_formula")) {
      return parseFormula(entry, root, parentData);
    } else if (schema.hasOwnProperty("_from")) {
      return parseFromData(entry, root, parentData)
    } else {
      return {
        value: getDefault(schema.type),
        update: function (value) {
          this.value = toTypeValue(value, schema.type)
          root.event.emit(`${entry.path}.${entry.key}`)
        }
      }
    }
  } else {
    if (schema.type === "array") {
      const proxy = filterOwnKeys([], ["splice", "insert", "delete"]);
      const res = observeSplice(proxy, entry, root);
      res.push(parseData(entry.children[0], root, res));
      addFunction(res);
      return res;
    } else if (schema.type === "object") {
      const res = filterOwnKeys({});
      for (let [key, value] of Object.entries(entry.children)) {
        res[key] = parseData(value, root, res);
      }
      return res;
    }
  }
}

const Parser = {
  parse,
  propagation
}

export default Parser;