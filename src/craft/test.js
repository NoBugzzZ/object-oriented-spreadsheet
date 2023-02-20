import SchemaParser from "./SchemaParser.js";

const AccountSchemaSource = {
  type: "object",
  title: "Account",
  properties: {
      netEarning: {
          type: "integer",
          formula: "Income.total - Expense.total",
      },
      income: {
          $ref: "#/$defs/Income",
      },
      expense: {
          $ref: "#/$defs/Expense",
      },
  },
  $defs: {
      Item: {
          type: "object",
          title: "Item",
          properties: {
              value: {
                  type: "integer",
                  title: "value",
              },
          },
      },
      Income: {
          type: "object",
          title: "Income",
          properties: {
              total: {
                  type: "integer",
                  formula: "SUM(Item.value)",
              },
              items: {
                  type: "array",
                  items: {
                      $ref: "#/$defs/Item",
                  },
              },
          },
      },
      Expense: {
          type: "object",
          title: "Expense",
          properties: {
              total: {
                  type: "integer",
                  formula: "SUM(Item.value)",
              },
              items: {
                  type: "array",
                  items: {
                      $ref: "#/$defs/Item",
                  },
              },
          },
      },
  },
};

const BudgetSchemaSource = {
  type: "object",
  title: "Budget",
  properties: {
      total: {
          type: "integer",
          formula: "SUM(Year.total)",
      },
      categories: {
          type: "array",
          items: {
              $ref: "#/$defs/Category",
          },
      },
      years: {
          type: "array",
          items: {
              $ref: "#/$defs/Year",
          },
      },
  },
  $defs: {
      CpY: {
          type: "object",
          title: "CpY",
          properties: {
              quantity: {
                  type: "integer",
              },
              cost: {
                  type: "integer",
              },
              total: {
                  type: "integer",
                  formula: "quantity * cost",
              },
          },
      },
      Category: {
          type: "object",
          title: "Category",
          properties: {
              name: {
                  type: "string",
              },
              total: {
                  type: "integer",
                  formula: "SUM(CpY.total)",
              },
              CpYs: {
                  _from: "TwoDimensionArray/row",
                  _schema: "#/$defs/CpY",
                  title: "test",
              },
          },
      },
      Year: {
          type: "object",
          title: "Year",
          properties: {
              year: {
                  type: "integer",
              },
              total: {
                  type: "integer",
                  formula: "SUM(CpY.total)",
              },
              CpYs: {
                  _from: "TwoDimensionArray/col",
                  _schema: "#/$defs/CpY",
                  title: "test",
              },
          },
      },
  },
};

// const parser = new SchemaParser(BudgetSchemaSource, null);
// parser.parseCallbacks(parser.root, parser.root.rootData);
// console.dir(parser.root, { depth: Infinity });

const parser = new SchemaParser(AccountSchemaSource, null);
parser.parseCallbacks(parser.root, parser.root.rootData);
parser.parseProxy(parser.root, parser.root.rootData);
parser.root.rootData.value.income.value.items.value["0"].value.value.value=111;
// parser.root.callbacks["Income.Item[0].Item.value"].callbacks[0]();

// parser.root.rootData.value.income.value.total.value = 100;
// parser.root.callbacks["Account.Income.total"].callbacks[0]();

parser.root.rootData.value.expense.value.items.value["0"].value.value.value=99;
// parser.root.rootData.value.expense.value.total.value = 10;


console.dir(parser.root, { depth: Infinity });
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