// const { EventEmitter } = require('./Event')
// const { Formula } = require("./Function");
import EventEmitter from "./Event.js"
import Formula from "./Function.js";

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

function getBasicType() {
  return ["integer", "number", "string", "boolean", "null"]
}

function resolveRef($defs, ref = "") {
  if (ref.startsWith("#/$defs/")) {
    const s = ref.split("/");
    return $defs[s[2]];
  }
}

function parser(schema) {
  const { type, title, properties, $defs } = schema;
  const data = {};
  const event = new EventEmitter(title);
  schema["_event"] = event;
  for (let key of Object.keys(properties)) {
    data[key] = traverse(properties[key], schema, $defs);
  }
  return schema;
}

function traverse(schema, root, $defs) {
  // console.dir({ schema, root, $defs })
  const { type } = schema;
  if (type === "array") {
    const { items } = schema;
    if (items.hasOwnProperty("$ref")) {
      if (!(root.hasOwnProperty("_refs"))) {
        root["_refs"] = [];
      }
      root["_refs"].push({ type: "array", ref: items["$ref"] });
      // console.dir()
      const refSchema = resolveRef($defs, items["$ref"]);
      const { properties } = refSchema;
      for (let key of Object.keys(properties)) {
        traverse(properties[key], refSchema, $defs);
      }
      // console.log(data);
      // return [data]
    } else {
      // traverse(items, root, $defs, refs);
    }
  } else if (schema.hasOwnProperty("$ref")) {
    if (!(root.hasOwnProperty("_refs"))) {
      root["_refs"] = [];
    }
    root["_refs"].push({ type: "object", ref: schema["$ref"] });
    const refSchema = resolveRef($defs, schema["$ref"]);
    const { properties } = refSchema;
    for (let key of Object.keys(properties)) {
      traverse(properties[key], refSchema, $defs);
    }
  } else {
    // return getDefault(type);
    if (schema.hasOwnProperty("formula")) {
      if (!(root.hasOwnProperty("_formulas"))) {
        root["_formulas"] = [];
      }
      root["_formulas"].push({ formula: schema["formula"] })
    }
  }
}

function resolveFormula(formula = "") {
  // console.log("###",formula)
  const start = formula.indexOf("(");
  const end = formula.lastIndexOf(")");
  const param = formula.slice(start + 1, end).split(".");
  const func = formula.slice(0, start);
  return [func, param];
}

function resolveRefName(ref) {
  if (ref.startsWith("#/$defs/")) {
    const s = ref.split("/");
    return s[2];
  }
}

function observe(obj) {
  return new Proxy(obj, {
    get(target, p, receiver) {
      // console.log("get", p);
      return Reflect.get(target, p, receiver);
    },
    set(target, p, newValue, receiver) {
      // console.log("set", p, newValue);
      return Reflect.set(target, p, newValue, receiver);
    }
  })
}

function parseData(schema) {
  const { $defs, _event } = schema;
  return traverseForData(schema, schema, $defs, _event, "");
}

function traverseForData(schema, root, $defs, event, parentPath) {
  const { type } = schema;
  if (type === "object") {
    const { properties, title = "root" } = schema;
    const currentPath = parentPath + title;
    const data = {};
    data["_path"] = currentPath;
    const basicType = getBasicType();
    for (let key of Object.keys(properties)) {
      const property = properties[key];
      if (basicType.includes(property["type"])) {
        data[key] = getDefault(property["type"]);
        if (property.hasOwnProperty("formula")) {
          const formula = property["formula"];
          const formulaPattern = /^[A-Z]+\(.*\)$/i
          if (formulaPattern.test(formula)) {
            const [func, param] = resolveFormula(formula);
            // console.log(func, param);
            event.on(`${data["_path"]}.${param[0]}`, (...params) => {
              // console.log(Formula,func,params)
              data[key] = Formula[func](...params);
            });
          }
        }
      } else {
        data[key] = traverseForData(properties[key], root, $defs, event, `${data["_path"]}.`);
      }
    }
    return data;
  } else if (schema.hasOwnProperty("$ref")) {
    const refSchema = resolveRef($defs, schema["$ref"]);
    return traverseForData(refSchema, refSchema, $defs, event, parentPath);
  } else if (type === "array") {
    const { items } = schema;
    if (items.hasOwnProperty("$ref")) {
      let data = new Proxy([], {});
      const refSchema = resolveRef($defs, items["$ref"]);
      const refName = resolveRefName(items["$ref"]);
      const { _formulas: formulas } = root;
      for (let formula of formulas) {
        const [func, param] = resolveFormula(formula.formula);
        if (param[0] === refName) {
          data.splice = new Proxy(data.splice, {
            apply(target, thisArg, argArray) {
              const [start, deleteCount, ...items] = argArray;
              let item = items?.[0];
              if (deleteCount === 0) {
                item = new Proxy(item, {
                  set(target, p, newValue, receiver) {
                    const res = Reflect.set(target, p, newValue, receiver);
                    event.emit(`${parentPath}${param[0]}`, data, param[1]);
                    return res;
                  }
                })
              } else if (deleteCount >= data.length) {
                return;
              }
              const args = item === undefined ? [start, deleteCount] : [start, deleteCount, item]
              const res = Reflect.apply(target, thisArg, args);
              // console.log("[splice]", thisArg, argArray);
              event.emit(`${parentPath}${param[0]}`, data, param[1]);
              return res;
            }
          })
          break;
        }
      }
      data.splice(0, 0, traverseForData(refSchema, refSchema, $defs, event, `${parentPath}[].`));
      return data
    } else {
      // traverse(items, root, $defs, refs);
    }
  }
}
// {
//   const { Account } = require("./data");
//   const schema = parser(Account);
//   const data = parseData(schema);
//   console.dir(schema, { depth: null });
//   console.dir(data, { depth: null })
// }

// {
//   const { Income } = require("./data")
//   const schema = parser(Income);
//   console.dir(schema, { depth: null });
//   const data = parseData(schema);
//   console.dir(data, { depth: null });
//   data.items.push({ value: 2 });
//   console.dir(data, { depth: null });
//   data.items.push({ value: 3 });
//   console.dir(data, { depth: null });
//   data.items[0].value = 1
//   console.dir(data, { depth: null });
// }
function resolveSchemaByPath(schema, path) {
  const paths = path.split(".");
  const { title, properties, $defs } = schema;
  if (title === paths[0]) {
    if (paths.length === 1) return schema;
    paths.splice(0, 1);
    if (paths[0] === "[]") {
      for (let [key, value] of Object.entries(properties)) {
        const { type } = value;
        if (type === "array") {
          const { items } = value;
          const refName = resolveRefName(items["$ref"]);
          if (refName === paths[1]) {
            return resolveRef($defs, items["$ref"]);
          }
        }
      }
    } else {

    }
  }
}

function getDefaultData(schema, path) {
  const { properties } = schema;
  const data = { _path: path };
  for (let [key, value] of Object.entries(properties)) {
    data[key] = getDefault(value.type);
  }
  return data;
}

const BasicCell = { width: 100 };
function toSpreadSheet(schema, data, direction = "vertical") {
  const { title = "Root", properties } = schema;
  const spreedsheet = [];
  spreedsheet.push([{ ...BasicCell, value: title, readOnly: true }]);
  for (let key of Object.keys(data)) {
    if (key.startsWith("_")) continue;
    const label = [{ ...BasicCell, value: key, readOnly: true }];
    spreedsheet.push(label)
    if (!Array.isArray(data[key])) {
      const cell = [{ value: data[key] }]
      spreedsheet.push(cell)
    } else {
      // console.log(data[key])
      data[key].forEach((d, index) => {
        const cell = [];
        for (let k of Object.keys(d)) {
          if (k.startsWith("_")) continue;
          cell.push({
            ...BasicCell,
            value: d[k],
            index,
            insert: (index = 0) => {
              console.log("data[key][0]['_path']", data[key][0]["_path"], schema)
              const resolvedSchema = resolveSchemaByPath(schema, data[key][0]["_path"]);
              // console.log(resolvedSchema);
              const defaultData = getDefaultData(resolvedSchema, data[key][0]["_path"])
              // console.log(defaultData)
              data[key].splice(index, 0, defaultData)
            },
            update: (value) => { d[k] = value },
            delete: (index = 0) => { data[key].splice(index, 1) }
          })
        }
        spreedsheet.push(cell)
      })

    }
  }
  return spreedsheet;
}

// const spreadsheet=toSpreadSheet(data)

// console.dir(spreadsheet, { depth: null })

// spreadsheet[1][0].update(5);

// console.dir(toSpreadSheet(data), { depth: null })

const Parser = {
  parser,
  parseData,
  toSpreadSheet,
}
export default Parser;