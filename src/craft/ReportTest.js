import SchemaParser from "./SchemaParser.js";

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

const data0 = null;

const datax = {
  total: 0,
  year: [
    {
      year: "", total: 0, date: [
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
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
    {
      year: "", total: 0, date: [
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
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
    {
      year: "", total: 0, date: [
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
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
    {
      year: "", total: 0, date: [
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
      ]
    }, {
      year: "", total: 0, date: [
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
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
    {
      year: "", total: 0, date: [
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
      ]
    }, {
      year: "", total: 0, date: [
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
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
    {
      year: "", total: 0, date: [
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
      ]
    }, {
      year: "", total: 0, date: [
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
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
    {
      year: "", total: 0, date: [
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
      ]
    }
  ]
};

const data10 = {
  total: 0,
  year: [
    {
      year: "", total: 0, date: [
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
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

const data20 = {
  total: 0,
  year: [
    {
      year: "", total: 0, date: [
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
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

const data30 = {
  total: 0,
  year: [
    {
      year: "", total: 0, date: [
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
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

const data40 = {
  total: 0,
  year: [
    {
      year: "", total: 0, date: [
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
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


const data100 = {
  total: 0,
  year: [
    {
      year: "", total: 0, date: [
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
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

const data1000 = {
  total: 0,
  year: [
    {
      year: "", total: 0, date: [
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
          city: {
            NanJing: 0, WuXi: 0, XuZhou: 0, ChangZhou: 0, SuZhou: 0, NanTong: 0, LianYunGang: 0,
            HuaiAn: 0, YanCheng: 0, YangZhou: 0, ZhenJiang: 0, TaiZhou: 0, SuQian: 0,
          },
          industry: {
            JLSH: 0, YZHX: 0, YZSH: 0, YZBSF: 0, NJCHJ: 0, NJHX: 0
          }
        },
        {
          date: "", salesTotal: 0, electricityUsage: 0, fuelUsage: 0, industryUsage: 0,
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

const hrTime = process.hrtime;

//模型层解析
// const count = 1000n;
// const start = hrTime.bigint();
// for (let i = 0; i < count; ++i) {
//   const parser = new SchemaParser(ReportSchemaSource, data20);
//   parser.parseProxy(parser.root, parser.root.rootData);
//   parser.parseCallbacks(parser.root, parser.root.rootData);
//   parser.distrubuteCallback(parser.root, parser.root.rootData);
// }
// const end = hrTime.bigint();
// console.log(`Benchmark took ${(end - start) / count} nanoseconds`);



// const parser = new SchemaParser(ReportSchemaSource, data40);
// parser.parseProxy(parser.root, parser.root.rootData);
// parser.parseCallbacks(parser.root, parser.root.rootData);
// parser.distrubuteCallback(parser.root, parser.root.rootData);
// const count = 10000n;
// const start = hrTime.bigint();
// for (let i = 0; i < count; ++i) {
//   parser.root.rootData.value.year.value["0"].value.date.value[
//     "0"
//   ].value.city.value.NanJing.value = i;
// }
// const end = hrTime.bigint();
// console.log(`Benchmark took ${(end - start) / count} nanoseconds`);



// const parser = new SchemaParser(ReportSchemaSource, data40);
// parser.parseProxy(parser.root, parser.root.rootData);
// parser.parseCallbacks(parser.root, parser.root.rootData);
// parser.distrubuteCallback(parser.root, parser.root.rootData);

// const count = 10000n;
// let total = 0;
// for (let i = 0; i < count; ++i) {
//   const start = hrTime.bigint();
//   parser.root.rootData.value.year.value["0"].value.date.insert(10);
//   const end = hrTime.bigint();
//   total=BigInt(total)+(end-start);
//   parser.root.rootData.value.year.value["0"].value.date.delete(10);
// }

// console.log(`Benchmark took ${(total) / count} nanoseconds`);



// const parser = new SchemaParser(ReportSchemaSource, data40);
// parser.parseProxy(parser.root, parser.root.rootData);
// parser.parseCallbacks(parser.root, parser.root.rootData);
// parser.distrubuteCallback(parser.root, parser.root.rootData);
// parser.root.rootData.value.year.value["0"].value.date.insert(40);
// const count = 10000n;
// let total = 0;
// for (let i = 0; i < count; ++i) {
//   const start = hrTime.bigint();
//   parser.root.rootData.value.year.value["0"].value.date.delete(40);
//   const end = hrTime.bigint();
//   total=BigInt(total)+(end-start);
//   parser.root.rootData.value.year.value["0"].value.date.insert(40);
// }
// console.log(`Benchmark took ${(total) / count} nanoseconds`);



const parser = new SchemaParser(ReportSchemaSource, data40);
parser.parseProxy(parser.root, parser.root.rootData);
parser.parseCallbacks(parser.root, parser.root.rootData);
parser.distrubuteCallback(parser.root, parser.root.rootData);

const count = 1000n;
let total = 0;
const start = hrTime.bigint();
for (let i = 0; i < count; ++i) {
  let arr = parser.genArrayFromTemplate(parser.root, parser.root.rootData, ReportLayout);
}
const end = hrTime.bigint();
console.log(`Benchmark took ${(end - start) / count} nanoseconds`);