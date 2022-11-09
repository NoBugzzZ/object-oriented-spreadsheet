// (async () => {
//   const { default: { parser, parseData, toSpreadSheet } } = await import("../parser.js");
//   const { default: { Income } } = await import("../data.js")
//   const schema = parser(Income);
//   const data = parseData(schema);
//   console.dir(schema, { depth: null });
//   console.dir(data, { depth: null });
//   const item=data.items[0];
//   data.items.splice(1,0,{ ...item,value: 2 });
//   data.items[0].value = 1
//   console.dir(data, { depth: null });

//   const spreadsheet = toSpreadSheet(schema,data)
//   console.dir(spreadsheet, { depth: null })
//   spreadsheet[3][0].update(5);
//   console.dir(toSpreadSheet(schema,data), { depth: null })
// })()

// (async () => {
//   const { default: { parser, parseData, toSpreadSheet } } = await import("../parser.js");
//   const { default: { Account } } = await import("../data.js")
//   const schema = parser(Account);
//   const data = parseData(schema);
//   console.dir(schema, { depth: null });
//   console.dir(data, { depth: null });
//   const incomeItem = data.income.items[0];
//   data.income.items.splice(1, 0, { ...incomeItem, value: 5 });
//   incomeItem.value = 6;
//   console.dir(data, { depth: null });

//   const expenseItem = data.expense.items[0];
//   data.expense.items.splice(1, 0, { ...expenseItem, value: 2 });
//   expenseItem.value = 3;
//   console.dir(data, { depth: null });
//   const spreadsheet = toSpreadSheet(schema, data)
//   console.dir(spreadsheet, { depth: null })
// })()


(async () => {
  const { default: { parser, parseData, toSpreadSheet } } = await import("../parser.js");
  const { default: { Budget } } = await import("../data.js")
  const schema=parser(Budget);
  const data=parseData(schema)
  console.dir(schema,{depth:null});
  console.dir(data,{depth:null})
})()
