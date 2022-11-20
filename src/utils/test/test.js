// (async () => {
//   const { default: { parser, parseData, toSpreadSheet } } = await import("../parser.js");
//   const { default: { Income } } = await import("../data.js")
//   const schema = parser(Income);
//   const data = parseData(schema);
//   console.dir(schema, { depth: null });
//   console.dir(data, { depth: null });
//   // data.items.splice(1,0);
//   // data.items[0].value = 1
//   // data.items[1].value = 3
//   // console.dir(data, { depth: null });

//   // const spreadsheet = toSpreadSheet(schema,data)
//   // console.dir(spreadsheet, { depth: null })
//   // spreadsheet[2][0].insert(1);
//   // spreadsheet[2][0].insert(1);
//   // spreadsheet[2][0].delete(1);
//   // console.dir(toSpreadSheet(schema,data), { depth: null })
// })()

// (async () => {
//   const { default: { parser, parseData, toSpreadSheet } } = await import("../parser.js");
//   const { default: { Account } } = await import("../data.js")
//   const schema = parser(Account);
//   const data = parseData(schema);
//   console.dir(schema, { depth: null });
//   console.dir(data, { depth: null });
//   // data.income.items.splice(1, 0);
//   // data.income.items[0].value = 6;
//   // data.income.items[1].value = 2;
//   // console.dir(data, { depth: null });

//   // data.expense.items.splice(1, 0);
//   // data.expense.items[0].value = 3;
//   // data.expense.items[1].value = 2;
//   // console.dir(data, { depth: null });
//   // const spreadsheet = toSpreadSheet(schema, data)
//   // console.dir(spreadsheet, { depth: null })
// })()


// (async () => {
//   const { default: { parser, parseData, toSpreadSheet } } = await import("../parser.js");
//   const { default: { Budget } } = await import("../data.js")
//   const schema=parser(Budget);
//   const data=parseData(schema)
//   console.dir(schema,{depth:null});
//   console.dir(data,{depth:null});
//   // data.categories[0].CpYs[0].quantity=1;
//   // data.categories[0].CpYs[0].cost=2;
//   // data.categories.splice(1,0)
//   // data.categories.splice(1,1)
//   // data.categories[1].CpYs[0].quantity=3;
//   // data.categories[1].CpYs[0].cost=4;
//   // data.years.splice(1,0)
//   // data.years[1].CpYs[0].quantity=5;
//   // data.years[1].CpYs[0].cost=6;
//   // data.years[1].CpYs[1].quantity=7;
//   // data.years[1].CpYs[1].cost=8;
//   // console.dir(data,{depth:null});

//   // const spreadsheet=toSpreadSheet(schema,data);
//   // console.log(spreadsheet)
// })()


// (async () => {
//   const { default: { cpy } } = await import("../data.js");
//   const {default:CpY}=await import("../CpY.js");
//   const instance=new CpY("C","Y",cpy);
//   console.dir(instance,{depth:null});
//   instance.deleteRow(1).deleteCol(1).addRow(0).addCol(0).addCol(0).addRow(0);
//   console.dir(instance,{depth:null});
// })()



(async () => {
  const { default: { parse } } = await import("../parser.refactor.js");
  const { default: { Income,Account,Budget } } = await import("../data.js")
  const root = parse(Budget);
  console.dir(root, { depth: null });
})()