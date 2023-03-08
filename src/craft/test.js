import SchemaParser from "./SchemaParser.js";

const AccountSchemaSource = {
  type: "object",
  title: "Account",
  properties: {
    netEarnings: {
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

// const AccountSchemaSource = {
//   type: "object",
//   title: "Account",
//   properties: {
//     netEarnings: {
//       type: "integer",
//       formula: "Income.total - Expense.total",
//     },
//     income: {
//       $ref: "#/$defs/Income",
//     },
//     expense: {
//       $ref: "#/$defs/Expense",
//     },
//   },
//   $defs: {
//     AnotherItem: {
//       type: "object",
//       title: "AnotherItem",
//       properties: {
//         value: {
//           type: "integer"
//         },
//         value2: {
//           type: "integer",
//         },
//       },
//     },
//     Item: {
//       type: "object",
//       title: "Item",
//       properties: {
//         total: {
//           type: "integer",
//           formula: "SUM(AnotherItem.value)",
//         },
//         value2: {
//           type: "integer",
//         },
//         items: {
//           type: "array",
//           items: {
//             $ref: "#/$defs/AnotherItem",
//           },
//         },
//       },
//     },
//     Income: {
//       type: "object",
//       title: "Income",
//       properties: {
//         total: {
//           type: "integer",
//           formula: "SUM(Item.total)",
//         },
//         items: {
//           type: "array",
//           items: {
//             $ref: "#/$defs/Item",
//           },
//         },
//       },
//     },
//     Expense: {
//       type: "object",
//       title: "Expense",
//       properties: {
//         total: {
//           type: "integer",
//           formula: "SUM(Item.total)",
//         },
//         items: {
//           type: "array",
//           items: {
//             $ref: "#/$defs/Item",
//           },
//         },
//       },
//     },
//   },
// };

const data = {
  netEarning: 0,
  income: {
    total: 0,
    items: [{ total: 0, v2: 0, items: [{ v1: 0, v2: 0 }] }],
  },
  expense: {
    total: 0,
    items: [{ total: 0, items: [{ value: 0 }] }],
  }
}

// const AccountLayout = [
//   ["Account"],
//   ["Income"],
//   ["Item"],
//   [["${Account.Income.Item.total}", "RIGHT", 2], ["${Account.Income.Item.v2}", "RIGHT", 2]],
//   [["${Account.Income.Item.AnotherItem.value}", "DOWN", 1, "RIGHT", 2], ["${Account.Income.Item.AnotherItem.v2}", "DOWN", 1, "RIGHT", 2]],
//   ["Total"],
//   ["${Account.Income.total}"],
//   // ["Expense"],
//   // ["Item"],
//   // [["${Account.Expense.Item.value}", "DOWN"]],
//   // ["Total"],
//   // ["${Account.Expense.total}"],
//   ["${Account.netEarings}"],
// ];

// const AccountLayout = [
//   ["Account"],
//   ["Income"],
//   ["Item"],
//   [["${Account.Income.Item", "RIGHT", 1,
//     [
//       ["${Item.v1}","${Item.v2}"],
//     ],
//   ]],
//   [["${Account.Income.Item", "RIGHT", 1,
//     [
//       ["${Item.v1}",["${Item.AnotherItem}","RIGHT",1,
//         [
//           ["${AnotherItem.v1}"],
//           ["${AnotherItem.v1}"]
//         ]
//     ]],
//     ],
//   ]],
//   ["Total"],
//   ["${Account.Income.total}"],
//   // ["Expense"],
//   // ["Item"],
//   // [["${Account.Expense.Item.value}", "DOWN"]],
//   // ["Total"],
//   // ["${Account.Expense.total}"],
//   ["${Account.netEarnings}"],
// ];

const AccountLayout = [
  ["Account"],
  ["Income"],
  ["Item"],
  [["${Account.Income.Item}", "DOWN", 0,
    [
      ["${Item.value}"],
    ],
  ]],
  ["Total"],
  ["${Account.Income.total}"],
  ["${Account.netEarnings}"],
];

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
parser.parseProxy(parser.root, parser.root.rootData);

parser.parseCallbacks(parser.root, parser.root.rootData);
parser.distrubuteCallback(parser.root, parser.root.rootData);
// parser.root.rootData.value.income.value.items.value[
//   "0"
// ].value.value.value = 1;
// parser.root.rootData.value.income.value.items.insert(1);
// parser.root.rootData.value.income.value.items.value[
//   "1"
// ].value.value.value = 2;
// console.dir(parser.root, { depth: Infinity });
const arr = parser.genArrayFromTemplate(parser.root, parser.root.rootData, AccountLayout);
console.dir(arr,{depth:3});
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
