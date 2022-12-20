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
          col.insert = data.insert.bind(data,index);
          col.delete = data.delete.bind(data,index);
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

const AccountTransformer ={
  transformer:transform
}

export default AccountTransformer;