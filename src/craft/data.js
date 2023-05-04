const AccountSchemaSource = {
  type: "object",
  title: "Account",
  properties: {
    netEarnings: {
      type: "number",
      formula: "Income.total - Expense.total",
    },
    custom: {
      type: "string",
      enum: ["1", "2", "aaa"]
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
          type: "number",
          title: "value",
        },
      },
    },
    Income: {
      type: "object",
      title: "Income",
      properties: {
        total: {
          type: "number",
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
          type: "number",
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

const AccountDataSource = {
  netEarnings: 8,
  custom: "1",
  income: {
    total: 15,
    items: [
      { value: 4 },
      { value: 5 },
      { value: 6 },
    ],
  },
  expense: {
    total: 7,
    items: [
      { value: 5 },
      { value: 2 },
    ],
  }
};

const AccountLayout = [
  ["Income", "IncomeTotal", "Expense", "ExpenseTotal"],
  [
    ["${Account.Income.Item}", "DOWN", 0,
      [
        ["${Item.value}"],
      ],
    ],
    "${Account.Income.total}",
    ["${Account.Expense.Item}", "DOWN", 0,
      [
        ["${Item.value}"],
      ],
    ],
    "${Account.Expense.total}",
  ],
  ["netEarnings", "${Account.netEarnings}"],
];

const AccountUiSchema = {
  custom: "Select"
}

const ReportSchemaSource = {
  type: "object",
  title: "Report",
  properties: {
    total: {
      type: "number",
      formula: "SUM(Year.total)"
    },
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
        total: {
          type: "number",
          formula: "SUM(Date.salesTotal)"
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
          type: "number",
          formula: "SUM(City.NanJing,City.WuXi,City.XuZhou,City.ChangZhou,City.SuZhou,City.NanTong,City.LianYunGang,City.HuaiAn,City.YanCheng,City.YangZhou,City.ZhenJiang,City.TaiZhou,City.SuQian)"
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

const ReportDataSource = {
  total: 300,
  year: [
    {
      year: "2021年", total: 300, date: [
        {
          date: "1月1日", salesTotal: 300, electricityUsage: 100, fuelUsage: 100, industryUsage: 100,
          city: {
            NanJing: 100, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 11.1, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "1月2日", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "1月3日", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "1月4日", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "1月5日", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "1月6日", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "1月7日", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "1月8日", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "1月9日", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "1月10日", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "1月11日", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "1月12日", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "1月13日", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "1月14日", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "1月15日", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "1月16日", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "1月17日", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "1月18日", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "1月19日", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "1月20日", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
      ]
    },

  ]
};

const ReportLayout = [
  ["total", "${Report.total}"],
  [["${Report.Year}", "RIGHT", 1,
    [
      ["${Year.year}", , "YearTotal", "${Year.total}"],
      [, , , , , "各市用气量", , , , , , , , , , , , , "直供大用户"],
      ["日期", "销售总量", "发电", "城市燃料", "直供化工",
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


export {
  AccountSchemaSource, AccountDataSource, AccountLayout, AccountUiSchema,
  ReportSchemaSource, ReportDataSource, ReportLayout,
}