import SchemaParser from "./SchemaParser.js";
import { AccountSchemaSource,AccountDataSource,AccountLayout,AccountUiSchema } from "./data.js";

const parser = new SchemaParser(AccountSchemaSource, null);
parser.parseProxy(parser.root, parser.root.rootData);

parser.parseCallbacks(parser.root, parser.root.rootData);
parser.distrubuteCallback(parser.root, parser.root.rootData);
// console.dir(parser.root.rootData, { depth: Infinity });
parser.parseUiSchema(parser.root, parser.root.rootData,AccountUiSchema);
console.dir(parser.root.rootData, { depth: Infinity });
const arr = parser.genArrayFromTemplate(parser.root, parser.root.rootData, AccountLayout);
// console.dir(arr, { depth: Infinity });



// parser.root.rootData.value.year.value["0"].value.date.value[
//   "0"
// ].value.city.value.NanJing.value = 1;

// parser.root.rootData.value.income.value.items.value[
//   "0"
// ].value.value.value = 1;

// parser.root.rootData.value.income.value.items.insert(1);

// parser.root.rootData.value.income.value.items.value[
//   "1"
// ].value.value.value = 2;



// const start=hrTime.bigint();
// parser.root.rootData.value.netEarnings=21;
// const end = hrTime.bigint();
// console.log(`Benchmark took ${end - start} nanoseconds`); 





// let arr = parser.genArrayFromTemplate(parser.root, parser.root.rootData, AccountLayout);
// arr[3][0].set(1);
// parser.updateArray(arr);
// arr[3][0].insertPost();
// arr = parser.genArrayFromTemplate(parser.root, parser.root.rootData, AccountLayout);
// arr[4][0].set(22);
// parser.updateArray(arr);
// arr[4][0].delete();
// arr = parser.genArrayFromTemplate(parser.root, parser.root.rootData, AccountLayout);
// console.dir(arr, { depth: 3 });
// parser.bindThisForCallback(parser.root, parser.root.rootData);
// parser.clearCallbacks();

// parser.root.rootData.value.income.value.total.value = 22;
// parser.root.rootData.value.income.value.items.value[
//   "0"
// ].value.value.value = 1;
// parser.root.rootData.value.income.value.items.insert(0);
// parser.root.rootData.value.income.value.items.value[
//   "0"
// ].value.value.value = 2;
// parser.root.rootData.value.income.value.items.insert(1);
// parser.root.rootData.value.income.value.items.value[
//   "1"
// ].value.value.value = 3;
// parser.root.rootData.value.income.value.items.delete(1);

// parser.root.rootData.value.expense.value.items.value[
//   "0"
// ].value.value.value = 11;
// parser.root.rootData.value.expense.value.items.insert(0);
// parser.root.rootData.value.expense.value.items.value[
//   "0"
// ].value.value.value = 22;
// parser.root.rootData.value.expense.value.items.insert(1);
// parser.root.rootData.value.expense.value.items.value[
//   "1"
// ].value.value.value = 33;
// parser.root.rootData.value.expense.value.items.delete(1);



// parser.parseProxy(parser.root, parser.root.rootData);
// parser.clearCallbacks();
// const crud1=parser.getCRUD(parser.root,"Account.Income.Item.value");
// console.log(crud1[0][1]());
// console.log(crud1[0][2](11111));

// const crud=parser.getCRUD(parser.root,"Account.Income.Item.value");
// const crud0=crud[0];
// crud0[0](1,111);

// console.log(parser.getCRUD(parser.root,"Account.Expense.Item.value"));
// const crud1=parser.getCRUD(parser.root,"Account.netEarning");
// crud1[1]();
// parser.root.rootData.value.income.value.items.value[
//   "0"
// ].value.value.value = 111;
// parser.root.callbacks["Account.Income.Item[0].Item.value"].callbacks[0]();

// parser.root.rootData.value.income.value.total.value = 100;
// parser.root.callbacks["Account.Income.total"].callbacks[0]();

// parser.root.rootData.value.expense.value.items.value[
//   "0"
// ].value.value.value = 99;
// parser.root.rootData.value.expense.value.total.value = 10;

// console.dir(parser.root, { depth: Infinity });

// console.dir(
//   parser.find(
//     parser.root,
//     parser.root.rootData,
//     "Account.Income.Item[0].Item.value"
//   ),
//   { depth: Infinity }
// );
// console.dir(
//   parser.find(
//     parser.root,
//     parser.root.rootData,
//     "Account.Expense.Item[0].Item.value"
//   ),
//   { depth: Infinity }
// );

// console.dir(
//   parser.find(
//     parser.root,
//     parser.root.rootData,
//     "Account.Expense.Item[0].Item"
//   ),
//   { depth: Infinity }
// );

// const a={};
// const p=new Proxy(a,{});
// p[Symbol.toStringTag]="proxy";
// function isProxy(obj){
//   const temp=Object.prototype.toString.call(obj);
//   const len=temp.length;
//   return temp.slice(len-6,len-1)==="proxy";
// }
// console.log(isProxy(p),isProxy(a));
