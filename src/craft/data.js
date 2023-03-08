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

const AccountDataSource = null;

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
  ["Expense"],
  ["Item"],
  [["${Account.Expense.Item}", "DOWN", 0,
    [
      ["${Item.value}"],
    ],
  ]],
  ["Total"],
  ["${Account.Expense.total}"],
  ["${Account.netEarnings}"],
];

export {
  AccountSchemaSource, AccountDataSource, AccountLayout,
}