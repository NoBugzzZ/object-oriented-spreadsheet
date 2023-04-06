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

// const AccountLayout = [
//   ["Account"],
//   ["Income"],
//   ["Item"],
//   [["${Account.Income.Item}", "DOWN", 0,
//     [
//       ["${Item.value}"],
//     ],
//   ]],
//   ["Total"],
//   ["${Account.Income.total}"],
//   [["${Account.Expense.Item}", "DOWN", 0,
//     [
//       ["${Item.value}"],
//     ],
//   ]],
//   ["Total"],
//   ["${Account.Expense.total}"],
//   ["${Account.netEarnings}"],
// ];

const AccountLayout = [
  ["Income", "IncomeTotal", "ExpenseTotal", "${Account.Expense.total}"],
  [
    ["${Account.Income.Item}", "DOWN", 0,
      [
        ["${Item.value}"],
      ],
    ],
    "${Account.Income.total}",
    "Expense",
    ["${Account.Expense.Item}", "RIGHT", 1,
      [
        ["${Item.value}"],
      ],
    ]],
  ["netEarnings", "${Account.netEarnings}"],
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

const ReportSchemaSource = {
  type: "object",
  title: "Report",
  properties: {
    year: {
      type: "array",
      items: {
        $ref: "#/$defs/Year",
      }
    }
  },
  $defs: {
    Year: {
      type: "object",
      title: "Year",
      properties: {
        year: {
          type: "string"
        },
        date: {
          type: "array",
          items: {
            $ref: "#/$defs/Date"
          }
        }
      }
    },
    Date: {
      type: "object",
      title: "Date",
      properties: {
        date: {
          type: "string"
        },
        salesTotal: {
          type: "number",
          formula: "SUM(electricityUsage,fuelUsage,industryUsage)"
        },
        electricityUsage: {
          type: "number"
        },
        fuelUsage: {
          type: "number"
        },
        industryUsage: {
          type: "number",
          formula: "SUM(Industry.JLSH,Industry.YZHX,Industry.YZSH,Industry.YZBSF,Industry.NJCHJ,Industry.NJHX)"
        },
        city: {
          $ref: "#/$defs/City"
        },
        industry: {
          $ref: "#/$defs/Industry"
        }
      }
    },
    City: {
      type: "object",
      title: "City",
      properties: {
        NanJing: {
          type: "number"
        },
        WuXi: {
          type: "number"
        },
        XuZhou: {
          type: "number"
        },
        ChangZhou: {
          type: "number"
        },
        SuZhou: {
          type: "number"
        },
        NanTong: {
          type: "number"
        },
        LianYunGang: {
          type: "number"
        },
        HuaiAn: {
          type: "number"
        },
        YanCheng: {
          type: "number"
        },
        YangZhou: {
          type: "number"
        },
        ZhenJiang: {
          type: "number"
        },
        TaiZhou: {
          type: "number"
        },
        SuQian: {
          type: "number"
        },
      }
    },
    Industry: {
      type: "object",
      title: "Industry",
      properties: {
        JLSH: {
          type: "number"
        },
        YZHX: {
          type: "number"
        },
        YZSH: {
          type: "number"
        },
        YZBSF: {
          type: "number"
        },
        NJCHJ: {
          type: "number"
        },
        NJHX: {
          type: "number"
        }
      }
    }
  }
}

const ReportLayout = [
  [["${Report.Year}", "RIGHT", 1,
    [
      ["${Year.year}"],
      ["日期", "销售总量", "发电", "城燃与工业燃料", "直供化工",
        "南京", "无锡", "徐州", "常州", "苏州", "南通", "连云港", "淮安", "盐城", "扬州", "镇江", "泰州", "宿迁",
        "金陵石化", "仪征化纤", "扬子石化", "扬子巴斯夫", "南京催化剂", "南京化学"
      ],
      [["${Year.Date}", "DOWN", 0,
        [
          [
            "${Date.date}", "${Date.salesTotal}",
            "${Date.electricityUsage}", "${Date.fuelUsage}", "${Date.industryUsage}",
            "${Date.City.NanJing}", "${Date.City.WuXi}",
            "${Date.City.XuZhou}", "${Date.City.ChangZhou}",
            "${Date.City.SuZhou}", "${Date.City.NanTong}",
            "${Date.City.LianYunGang}", "${Date.City.HuaiAn}",
            "${Date.City.YanCheng}", "${Date.City.YangZhou}",
            "${Date.City.ZhenJiang}", "${Date.City.TaiZhou}",
            "${Date.City.SuQian}",
            "${Date.Industry.JLSH}", "${Date.Industry.YZHX}",
            "${Date.Industry.YZSH}", "${Date.Industry.YZBSF}",
            "${Date.Industry.NJCHJ}", "${Date.Industry.NJHX}",
          ]
        ]
      ]]
    ],
  ]],
];

const hrTime = process.hrtime;

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


const start=hrTime.bigint();
parser.root.rootData.value.netEarnings=21;
const end = hrTime.bigint();
console.log(`Benchmark took ${end - start} nanoseconds`); 





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
