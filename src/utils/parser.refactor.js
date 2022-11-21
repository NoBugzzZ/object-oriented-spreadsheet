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
  root.entry = parseSchema(schema, null, schema, root);
  constructContext(root);
  const rootData = {};
  parseData(rootData, root.entry, root);
  return rootData;
}

function parseSchema(schema, parent, rootSchema, root) {
  const _schema = schema.hasOwnProperty("$ref") ?
    resolveRef(schema["$ref"], rootSchema["$defs"]) : schema;
  const { type } = _schema;
  const entry = { schema: _schema, data: null, children: null, parent };
  if (type === "object") {
    entry.children = {};
    for (let [key, value] of Object.entries(_schema.properties)) {
      entry.children[key] = parseSchema(value, entry, rootSchema, root);
    }
  } else if (type === "array") {
    let itemShema = _schema.items.hasOwnProperty("$ref") ?
      resolveRef(_schema.items["$ref"], rootSchema["$defs"]) : _schema.items;
    entry.children = [];
    entry.children.splice(0, 0, parseSchema(itemShema, entry, rootSchema, root));
  } else if (isBasicType(type)) {

  } else if (_schema.hasOwnProperty("_from")) {
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
  // console.log("###",formula)
  const start = formula.indexOf("(");
  const end = formula.lastIndexOf(")");
  const param = formula.slice(start + 1, end).split(".");
  const func = formula.slice(0, start);
  return [func, param];
}

function parseFormula(entry, root) {
  const { schema: { _formula } } = entry;
  const formulaPattern = /^[A-Z]+\(.*\)$/i
  const expressionPattern = /^\w+(\.\w+)*(\s[-+*/]\s\w+(\.\w+)*)*$/i;
  if (formulaPattern.test(_formula)) {
    const [func, param] = resolveFormula(_formula);
    if (param.length === 2) {
      for (let [key, value] of Object.entries(entry.parent.children)) {
        if (value.schema.type === "array" &&
          value.schema.items["$ref"].endsWith(param[0])) {
          entry.data = Formula[func](...value.data.map(d => d[param[1]]))
        } else if (value.schema.type === "object") {

        }
      }
    } else {

    }
  } else if (expressionPattern.test(_formula)) {
    const variableReg = /\w+(\.\w+)*/ig;
    const operatorReg = /\s[-+*/]\s/ig
    const variables = Array.from(new Set(_formula.match(variableReg)))
    const operators = _formula.match(operatorReg);

  }
}

function propagation(entry) {
  let temp = entry;
  while (temp) {
    // console.log(temp)
    for (let [k, v] of Object.entries(temp.children)) {
      const { schema } = v;
      // console.log(schema)
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


function parseData(rootData, entry, root) {
  const { children, schema } = entry;
  if (children === null) {
    if (schema.hasOwnProperty("_formula")) {
      parseFormula(entry, root);
    } else {
      entry.data = getDefault(schema.type);
    }
  } else {
    for (let [key, value] of Object.entries(children)) {
      parseData(value, root);
    }
    if (schema.type === "array") {
      entry.data = entry.children.map(child => child.data);
      // entry.data[Symbol.for("entry")] = entry;
    } else if (schema.type === "object") {
      // entry.data = { [Symbol.for("entry")]: entry };
      entry.data = {}
      for (let [key, value] of Object.entries(entry.children)) {
        entry.data[key] = value.data;
      }
      // entry.data = new Proxy(entry.data, {
      //   set(target, p, newValue, receiver) {
      //     changeData(entry.data[Symbol.for("entry")], p, newValue)
      //     return true;
      //   }
      // })
    }
  }
}

const Parser = {
  parse,
  propagation
}

export default Parser;