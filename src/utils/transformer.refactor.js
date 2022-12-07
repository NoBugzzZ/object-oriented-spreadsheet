const BasicCell = { width: 100 };

function transform(entry, data, root) {
  const { children, schema } = entry;
  if (children === null) {
    if (schema.hasOwnProperty("_formula")) {
      // data.readOnly=true;
      return [[data]]
    } else if (schema.hasOwnProperty("_from")) {

    } else {
      return [[data]]
    }
  } else {
    if (schema.type === "array") {
      const res = [];
      data.forEach((d, index) => {
        const child = transform(entry.children[0], d, root);
        res.push(...child.map(row => row.map(col => {
          col.insert = data.insert.bind(data);
          col.delete = data.delete.bind(data);
          col.width = 100;
          col.index = index;
          return col;
        })));
      });
      return res;
    } else if (schema.type === "object") {
      const res = [];
      for (let [key, value] of Object.entries(entry.children)) {
        const child = [[{ ...BasicCell, readOnly: true, value: key, }], ...transform(value, data[key], root)];
        res.push(...child);
      }
      return res;
    }
  }
}

function tdaToSpreadSheet(data,update) {
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
            // console.log(value);
            if (typeof data[i][j][key] === "number") {
              update(i,j,key,+value);
            } else {
              update(i,j,key,value);
            }
          }
        });
      }
    }
    res.push(row);
  }
  const cell = data[0][0];
  const len = Object.keys(cell).length;
  return [res, len];
}

function toSpreadSheet(entry, data, root) {
  const spreadsheet = [];
  const [instanceTitle, context] = Object.entries(root.context)[0];
  const { row, col } = context;
  const instance = root.context[instanceTitle].instance;
  const [tda, lenPerData] = tdaToSpreadSheet(instance.data,data["categories"][0]["CpYs"].update);
  const queue = [];
  let offsetX = 0;
  let offsetY = 0;
  for (let [key, value] of Object.entries(data)) {
    if (typeof value === "object") {
      const rowOrColArray = value;
      const rowOrColEntry = entry.children[key];
      if (rowOrColEntry.path.endsWith(row)) {
        const template = Object.entries(value[0])
          .filter(([key, value]) => {
            const currentEntry = rowOrColEntry.children[0].children[key];
            if (currentEntry.schema.hasOwnProperty("type")
              && currentEntry.schema.type !== "object") {
              return true;
            }
            return false;
          })
        offsetX = template.length
        for (let i = 0; i < offsetY; i++) {
          for (let n = 0; n < offsetX; n++) {
            tda[i].splice(n, 0, { ...BasicCell });
          }
        }
        template.forEach(([key, value], i) => {
          tda[offsetY].splice(i, 0, { 
            ...BasicCell, 
            value: key, 
            readOnly: true 
          });
        })
        value.forEach((obj, index) => {
          Object.entries(obj)
            .filter(([key, value]) => {
              const currentEntry = rowOrColEntry.children[0].children[key];
              if (currentEntry.schema.hasOwnProperty("type")
                && currentEntry.schema.type !== "object") {
                return true;
              }
              return false;
            })
            .forEach(([key, value], i) => {
              value.width=BasicCell.width;
              value.insert=rowOrColArray.insert.bind(rowOrColArray,i+1);
              value.delete=rowOrColArray.delete.bind(rowOrColArray,i);
              tda[offsetY + 1 + index].splice(i, 0, value);
            })
        })
      } else if (entry.children[key].path.endsWith(col)) {
        // const template = Object.entries(value[0])
        //   .filter(([key, value]) => {
        //     const currentEntry = rowOrColEntry.children[0].children[key];
        //     if (currentEntry.schema.hasOwnProperty("type")
        //       && currentEntry.schema.type !== "object") {
        //       return true;
        //     }
        //     return false;
        //   })
        // const offsetY = template.length;
        // for (let i = 0; i < offsetY; i++) {
        //   const row = []
        //   for (let n = 0; n < offsetX; n++) {
        //     row.splice(n, 0, { ...BasicCell });
        //   }
        //   for (let n = offsetX, totalCol = offsetX + value.length * lenPerData; n < totalCol; n++) {
        //     row.splice(n, 0, { ...BasicCell });
        //   }
        //   tda.splice(i, 0, row);
        // }
        // // eslint-disable-next-line no-loop-func
        // value.forEach((obj, index) => {
        //   Object.entries(obj)
        //     .filter(([key, value]) => {
        //       const currentEntry = rowOrColEntry.children[0].children[key];
        //       if (currentEntry.schema.hasOwnProperty("type")
        //         && currentEntry.schema.type !== "object") {
        //         return true;
        //       }
        //       return false;
        //     })
        //     .forEach(([key, value], i) => {
        //       let valueCell = typeof value==="object"?value:{};
        //       if (offsetY <= lenPerData) {
        //         tda[i][index * lenPerData + offsetX] = {
        //           ...tda[i][index * lenPerData + offsetX],
        //           value: key,
        //           readOnly: true
        //         }
        //         valueCell = tda[i][index * lenPerData + offsetX + 1]
        //       } else {
        //         valueCell = tda[i][index * lenPerData + offsetX]
        //       }
        //       // valueCell.value = value;
        //       valueCell.update = (value) => {
        //         if (typeof obj[key] === "number") {
        //           obj[key] = + value;
        //         } else {
        //           obj[key] = value;
        //         }
        //       }
        //       valueCell.insert = (index) => {
        //         rowOrColArray.splice(rowOrColArray.length, 0)
        //       }
        //     })
        // })
      }
    } else {
      queue.push(key);
    }
  }
  const aRow = [];
  const len = tda[0].length
  for (let i = 0; i < len; i++) {
    aRow.push({ ...BasicCell });
  }
  aRow[len - 2].value = queue[0];
  aRow[len - 2].readOnly = true;
  aRow[len - 1].value = data[queue[0]];
  // tda.push(aRow);
  return tda;
}

const Tranform = {
  transform,
  toSpreadSheet,
}

export default Tranform;