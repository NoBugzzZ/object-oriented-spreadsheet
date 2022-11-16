// const { EventEmitter } = require('./Event')
// const { Formula } = require("./Function");
import EventEmitter from "./Event.js"
import Formula from "./Function.js";
import CpY from "./CpY.js";

function getClass(className) {
  const mapper = {
    "CpY": CpY
  }
  return mapper[className];
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

function getBasicType() {
  return ["integer", "number", "string", "boolean", "null"]
}

function resolveRef($defs, ref = "") {
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

function parser(schema) {
  const { type, title, properties, } = schema;
  const data = {};
  const event = new EventEmitter(title);
  schema["_event"] = event;
  for (let key of Object.keys(properties)) {
    data[key] = traverse(properties[key], schema, schema);
  }
  return schema;
}

function traverse(schema, parentSchema, root) {
  // console.dir({ schema, root, $defs })
  const { type } = schema;
  if (type === "array") {
    const { items } = schema;
    if (items.hasOwnProperty("$ref")) {
      if (!(parentSchema.hasOwnProperty("_refs"))) {
        parentSchema["_refs"] = [];
      }
      parentSchema["_refs"].push({ type: "array", ref: items["$ref"] });
      // console.dir()
      const refSchema = resolveRef(root.$defs, items["$ref"]);
      const { properties } = refSchema;
      for (let key of Object.keys(properties)) {
        traverse(properties[key], refSchema, root);
      }
      // console.log(data);
      // return [data]
    } else {
      // traverse(items, root, $defs, refs);
    }
  } else if (schema.hasOwnProperty("$ref")) {
    if (!(parentSchema.hasOwnProperty("_refs"))) {
      parentSchema["_refs"] = [];
    }
    parentSchema["_refs"].push({ type: "object", ref: schema["$ref"] });
    const refSchema = resolveRef(root.$defs, schema["$ref"]);
    const { properties } = refSchema;
    for (let key of Object.keys(properties)) {
      traverse(properties[key], refSchema, root);
    }
  } else if (schema.hasOwnProperty("_from")) {
    if (!root.hasOwnProperty("_classes")) {
      root["_classes"] = {};
    }
    const classes = root["_classes"];
    const { title, _from, schema: refPath } = schema;
    const [className, context] = resolveFrom(_from);
    // console.log(title, _from, refPath, className, context)
    const { title: parentTitle } = parentSchema;

    if (classes.hasOwnProperty(title)) {
      if (classes[title].path === refPath) {
        classes[title] = { ...classes[title], [context]: parentTitle };
      }
    } else {
      classes[title] = { path: refPath, [context]: parentTitle, className };
    }
  } else {
    // return getDefault(type);
    if (schema.hasOwnProperty("formula")) {
      if (!(parentSchema.hasOwnProperty("_formulas"))) {
        parentSchema["_formulas"] = [];
      }
      parentSchema["_formulas"].push({ formula: schema["formula"] })
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

function getDataByPath(data, path) {
  // console.log(path);
  const { _path } = data;
  if (path === _path) {
    return data;
  } else if (path.startsWith(_path)) {
    for (let key of Object.keys(data)) {
      if (key === "_path") continue;
      if (typeof data[key] === "object") {
        const res = getDataByPath(data[key], path);
        if (res) return res;
      }
    }
  }

}

function getDataByRelativePath(data, path) {
  for (let key of Object.keys(data)) {
    if (key.startsWith("_")) continue;
    if (data[key]["_path"] === path) {
      return data[key];
    }
  }
}

function parseData(schema) {
  const { $defs, _event } = schema;
  let rootData;
  return traverseForData(schema, schema, schema, _event, "", rootData);
}

function traverseForData(schema, parentSchema, rootSchema, event, parentPath, rootData) {
  const { type } = schema;
  if (type === "object") {
    const { properties, title = "root" } = schema;
    const currentPath = parentPath + title;
    let data = {};
    if (!rootData) {
      rootData = data;
    }
    data = new Proxy(data, {
      set(target, p, newValue, receiver) {
        const res = Reflect.set(target, p, newValue, receiver);
        event.emit(currentPath.split(".").filter(v => v !== "[]").join("."));
        return res;
      }
    })
    data["_path"] = currentPath;
    const basicType = getBasicType();
    for (let key of Object.keys(properties)) {
      // console.log("####", currentPath, key)
      const property = properties[key];
      if (basicType.includes(property["type"])) {
        data[key] = getDefault(property["type"]);
        if (property.hasOwnProperty("formula")) {
          const formula = property["formula"];
          const formulaPattern = /^[A-Z]+\(.*\)$/i
          const expressionPattern = /^\w+(\.\w+)*(\s[-+*/]\s\w+(\.\w+)*)*$/i;
          if (formulaPattern.test(formula)) {
            const [func, param] = resolveFormula(formula);
            // console.log(func, param);
            // console.log("$$$$",`${data["_path"]}.${param[0]}`)
            event.on(`${data["_path"]}.${param[0]}`, (...params) => {
              const item = getDataByRelativePath(data, `${data["_path"]}.${param[0]}`);
              // console.log("$$$$", item, `${data["_path"]}.${param[0]}`)
              data[key] = Formula[func](item, param[1]);
            });
          } else if (expressionPattern.test(formula)) {
            const variableReg = /\w+(\.\w+)*/ig;
            const operatorReg = /\s[-+*/]\s/ig
            const variables = Array.from(new Set(formula.match(variableReg)))
            const operators = formula.match(operatorReg);
            // console.log(variables, operators);
            variables.forEach(variable => {
              const temp = variable.split(".");
              // const member = temp.length === 1 ? temp[0] : temp[1];
              const onevent = temp.length === 1 ? data["_path"] : `${data["_path"]}.${temp[0]}`;
              event.on(onevent, () => {
                const dataMap = variables.map(v => {
                  const temp = v.split(".");
                  const member = temp.length === 1 ? temp[0] : temp[1];
                  const onevent = temp.length === 1 ? data["_path"] : `${data["_path"]}.${temp[0]}`;
                  return { [v]: getDataByPath(data, onevent)?.[member] }
                })
                let expression = formula;
                dataMap.forEach(d => {
                  for (let key of Object.keys(d)) {
                    expression = expression.replaceAll(key, d[key]);
                  }
                })
                data[key] = Formula["CALC"](expression);
              })
            })
          }
        }
      } else if (properties[key].hasOwnProperty("_from")) {
        const currentSchema = properties[key];
        // console.log(properties[key])
        const { _classes } = rootSchema;
        for (let [k, value] of Object.entries(_classes)) {
          if (currentSchema.title === k) {
            const { path, row, col, className } = value;
            if (!rootData.hasOwnProperty(k)) {
              const refSchema = resolveRef(rootSchema.$defs, path);
              const Class = getClass(className);
              rootData[k] = new Class(row, col, refSchema, event, `Budget.[].`, k);
            }
            let propertyData;
            if (parentSchema.title === row) {
              propertyData = new Proxy(rootData[k].getRow(0), {});
              propertyData["_path"] = `${data["_path"]}.${className}`;
              event.on(`#/${k}`, () => {
                propertyData = new Proxy(rootData[k].getRow(0), {});
                propertyData["_path"] = `${data["_path"]}.${className}`;
                data[key] = propertyData;
              })
            } else {
              propertyData = new Proxy(rootData[k].getCol(0), {});
              propertyData["_path"] = `${data["_path"]}.${className}`;
              event.on(`#/${k}`, () => {
                propertyData = new Proxy(rootData[k].getCol(0), {});
                propertyData["_path"] = `${data["_path"]}.${className}`;
                data[key] = propertyData;
              })
            }
            data[key] = propertyData;
            break;
          }
        }
      } else {
        // console.log("----", currentPath, key)
        data[key] = traverseForData(properties[key], parentSchema, rootSchema, event, `${data["_path"]}.`, rootData);
      }
    }
    return data;
  } else if (schema.hasOwnProperty("$ref")) {
    const refSchema = resolveRef(rootSchema.$defs, schema["$ref"]);
    return traverseForData(refSchema, refSchema, rootSchema, event, parentPath, rootData);
  } else if (type === "array" && schema?.items?.type === "array") {
    // const refSchema = resolveRef(rootSchema.$defs, schema.items.items["$ref"]);
    // const refName = resolveRefName(schema.items.items["$ref"]);
    // const data = new Proxy([], {})
    // data.splice = new Proxy(data.splice, {
    //   apply(target, thisArg, argArray) {
    //     const [start, deleteCount] = argArray;
    //     const template = data[0].map(d => ({ ...d }));
    //     const proxyTemplate = new Proxy(template, {})
    //     const res = Reflect.apply(target, thisArg, argArray);
    //     event.emit(`${parentPath}${refName}`);
    //     return res;
    //   }
    // })
    // return data;
    // console.log("#####", parentPath)
  } else if (type === "array") {
    const { items } = schema;
    if (items.hasOwnProperty("$ref")) {
      let data = new Proxy([], {});
      const refSchema = resolveRef(rootSchema.$defs, items["$ref"]);
      const refName = resolveRefName(items["$ref"]);
      // const { _formulas: formulas } = parentSchema;
      // for (let formula of formulas) {
      //   const [func, param] = resolveFormula(formula.formula);
      //   if (param[0] === refName) {

      //     break;
      //   }
      // }
      data["_path"] = `${parentPath}${refName}`
      data.splice = new Proxy(data.splice, {
        apply(target, thisArg, argArray) {
          const [start, deleteCount, ...items] = argArray;
          let item;
          if (deleteCount === 0) {
            item = items?.[0] || getDefaultData(refSchema, `${parentPath}[].${refName}`, rootSchema, rootData, start);
            // console.log("###",item,refSchema);
            item = new Proxy(item, {
              set(target, p, newValue, receiver) {
                const res = Reflect.set(target, p, newValue, receiver);
                event.emit(`${parentPath}${refName}`);
                return res;
              }
            })
            const args = item === undefined ? [start, deleteCount] : [start, deleteCount, item]
            const res = Reflect.apply(target, thisArg, args);
            event.emit(`${parentPath}${refName}`);
            return res;
          } else if (deleteCount >= data.length) {
            return;
          } else {
            const res = Reflect.apply(target, thisArg, argArray);
            event.emit(`${parentPath}${refName}`);
            return res;
          }

          // console.log("[splice]", thisArg, argArray);

        }
      })
      data.splice(0, 0, traverseForData(refSchema, refSchema, rootSchema, event, `${parentPath}[].`, rootData));
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

function getDefaultData(schema, path, rootSchema, rootData, index) {
  // console.log("###",schema, path,rootSchema,rootData,index)
  const { properties } = schema;
  let data = { _path: path };
  if (rootSchema) {
    data = new Proxy(data, {
      set(target, p, newValue, receiver) {
        const res = Reflect.set(target, p, newValue, receiver);
        rootSchema["_event"].emit(path.split(".").filter(v => v !== "[]").join("."))
        return res;
      }
    })
  }

  for (let [key, value] of Object.entries(properties)) {
    if (value?.hasOwnProperty("_from")) {
      const classContext = rootSchema["_classes"][value.title];
      const instance = rootData[value.title];
      // console.log("###", classContext, instance, index, path)
      let propertyData
      if (schema.title === classContext.row) {
        instance.addRow(index);
        propertyData = new Proxy(instance.getRow(index), {});
        propertyData["_path"] = `${path}.${classContext.className}`;
        rootSchema["_event"].on(`#/${value.title}`, () => {
          const propertyData = new Proxy(instance.getRow(index), {});
          propertyData["_path"] = `${path}.${classContext.className}`;
          data[key] = propertyData;
        })
      } else if (schema.title === classContext.col) {
        instance.addCol(index);
        propertyData = new Proxy(instance.getCol(index), {});
        propertyData["_path"] = `${path}.${classContext.className}`;
        rootSchema["_event"].on(`#/${value.title}`, () => {
          const propertyData = new Proxy(instance.getCol(index), {});
          propertyData["_path"] = `${path}.${classContext.className}`;
          data[key] = propertyData;
        })
      }
      data[key] = propertyData
    } else {
      data[key] = getDefault(value.type);
    }
    if (value.hasOwnProperty("formula")) {
      const formula = value["formula"];
      const formulaPattern = /^[A-Z]+\(.*\)$/i
      if (formulaPattern.test(formula)) {
        const [func, param] = resolveFormula(formula);
        // console.log(func, param);
        rootSchema["_event"].on(`${data["_path"]}.${param[0]}`, (...params) => {
          const item = getDataByRelativePath(data, `${data["_path"]}.${param[0]}`);
          data[key] = Formula[func](item, param[1]);
        });
      }
    }
  }
  return data;
}

const BasicCell = { width: 100 };

//tda two dimensional array
function tdaToSpreadSheet(data) {
  const cell = data[0][0];
  const len = Object.keys(cell).length;
  const res = [];
  const label = [];
  for (let j = 0, colLen = data[0].length; j < colLen; j++) {
    for (let key of Object.keys(data[0][j])) {
      label.push({ ...BasicCell, value: key, readOnly: true });
    }
  }
  res.push(label);
  for (let i = 0, rowLen = data.length; i < rowLen; i++) {
    const row = [];
    for (let j = 0, colLen = data[i].length; j < colLen; j++) {
      for (let [key, value] of Object.entries(data[i][j])) {
        row.push({
          ...BasicCell, value,
          update: (value) => {
            if (typeof data[i][j][key] === "number") {
              data[i][j][key] = +value;
            } else {
              data[i][j][key] = value;
            }
          }
        });
      }
    }
    res.push(row);
  }
  return [res, len];
}

// function toSpreadSheet(schema, data, direction = "cross") {
//   const spreadsheet = [];
//   const [instanceTitle, context] = Object.entries(schema["_classes"])[0];
//   console.log(instanceTitle, context)
//   const { row, col } = context;
//   const instance = data[instanceTitle];
//   const [tda, lenPerData] = tdaToSpreadSheet(instance.data)
//   console.dir(tda, { depth: null });
//   const queue = [];
//   let offsetX = 0;
//   let offsetY = 0;
//   for (let [key, value] of Object.entries(data)) {
//     if (key.startsWith("_") || key === instanceTitle) continue;
//     console.log(key);
//     if (typeof value === "object") {
//       const rowOrColArray=value;
//       if (value["_path"].endsWith(row)) {
//         const template = Object.entries(value[0])
//           .filter(([key, value]) => !key.startsWith("_") && !(typeof value === "object"))
//         offsetX = template.length
//         for (let i = 0; i < offsetY; i++) {
//           for (let n = 0; n < offsetX; n++) {
//             tda[i].splice(n, 0, { ...BasicCell });
//           }
//         }
//         template.forEach(([key, value], i) => {
//           tda[offsetY].splice(i, 0, { ...BasicCell, value: key, readOnly: true });
//         })
//         value.forEach((obj, index) => {
//           Object.entries(obj)
//             .filter(([key, value]) => !key.startsWith("_") && !(typeof value === "object"))
//             .forEach(([key, value], i) => {
//               tda[offsetY + 1 + index].splice(i, 0, {
//                 ...BasicCell, value,
//                 update: (value) => {
//                   if (typeof obj[key] === "number") {
//                     obj[key] = + value;
//                   } else {
//                     obj[key] = value;
//                   }
//                 },
//                 insert:(index)=>{
//                   rowOrColArray.splice(rowOrColArray.length,0)
//                 }
//               });
//             })
//         })
//       } else if (value["_path"].endsWith(col)) {
//         const template = Object.entries(value[0])
//           .filter(([key, value]) => !key.startsWith("_") && !(typeof value === "object"));
//         const offsetY = template.length;
//         for (let i = 0; i < offsetY; i++) {
//           const row = []
//           for (let n = 0; n < offsetX; n++) {
//             row.splice(n, 0, { ...BasicCell });
//           }
//           for (let n = offsetX, totalCol = offsetX + value.length * lenPerData; n < totalCol; n++) {
//             row.splice(n, 0, { ...BasicCell });
//           }
//           tda.splice(i, 0, row);
//         }
//         // eslint-disable-next-line no-loop-func
//         value.forEach((obj, index) => {
//           Object.entries(obj)
//             .filter(([key, value]) => !key.startsWith("_") && !(typeof value === "object"))
//             .forEach(([key, value], i) => {
//               let valueCell=null;
//               if (offsetY <= lenPerData) {
//                 tda[i][index * lenPerData + offsetX]={
//                   ...tda[i][index * lenPerData + offsetX],
//                   value:key,
//                   readOnly:true
//                 }
//                 valueCell=tda[i][index * lenPerData + offsetX + 1]
//               } else {
//                 valueCell=tda[i][index * lenPerData + offsetX]
//               }
//               valueCell.value=value;
//               valueCell.update=(value)=>{
//                 if (typeof obj[key] === "number") {
//                   obj[key] = + value;
//                 } else {
//                   obj[key] = value;
//                 }
//               }
//               valueCell.insert=(index)=>{
//                 rowOrColArray.splice(rowOrColArray.length,0)
//               }
//             })
//         })
//       }
//     } else {
//       queue.push(key);
//     }
//   }
//   const aRow = [];
//   const len = tda[0].length
//   for (let i = 0; i < len; i++) {
//     aRow.push({ ...BasicCell });
//   }
//   aRow[len - 2].value = queue[0];
//   aRow[len - 2].readOnly = true;
//   aRow[len - 1].value = data[queue[0]];
//   tda.push(aRow);
//   return tda;
// }

function toSpreadSheet(schema, data, direction = "vertical") {
  const { title = "Root", properties } = schema;
  const spreedsheet = [];
  spreedsheet.push([{ ...BasicCell, value: title, readOnly: true }]);
  for (let key of Object.keys(data)) {
    if (key.startsWith("_")) continue;
    const label = [{ ...BasicCell, value: key, readOnly: true }];
    spreedsheet.push(label)
    if (!Array.isArray(data[key])) {
      if (typeof data[key] === "object") {

      } else {
        const cell = [{ value: data[key] }]
        spreedsheet.push(cell)
      }
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
              // console.log("data[key][0]['_path']", data[key][0]["_path"], schema)
              const resolvedSchema = resolveSchemaByPath(schema, data[key][0]["_path"]);
              // console.log(resolvedSchema);
              const defaultData = getDefaultData(resolvedSchema, data[key][0]["_path"])
              // console.log(defaultData)
              data[key].splice(index, 0)
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