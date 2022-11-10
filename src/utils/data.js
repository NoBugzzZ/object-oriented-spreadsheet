const Income = {
  type: "object",
  title: "Income",
  properties: {
    items: {
      type: "array",
      items: {
        $ref: "#/$defs/Item",
      },
    },
    total: {
      type: "integer",
      formula: "SUM(Item.value)",
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
        }
      },
    },
  },
};

const Account = {
  "type": "object",
  "title": "Account",
  "properties": {
    "netEarning": {
      "type": "integer",
      "formula": "Income.total - Expense.total"
    },
    "income": {
      "$ref": "#/$defs/Income"
    },
    "expense": {
      "$ref": "#/$defs/Expense"
    }
  },
  "$defs": {
    "Item": {
      "type": "object",
      "title": "Item",
      "properties": {
        "value": {
          "type": "integer",
          "title": "value",
        }
      }
    },
    "Income": {
      "type": "object",
      "title": "Income",
      "properties": {
        "total": {
          "type": "integer",
          "formula": "SUM(Item.value)",
        },
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/Item"
          }
        }
      }
    },
    "Expense": {
      "type": "object",
      "title": "Expense",
      "properties": {
        "total": {
          "type": "integer",
          "formula": "SUM(Item.value)",
        },
        "items": {
          "type": "array",
          "items": {
            "$ref": "#/$defs/Item"
          }
        }
      }
    }
  }
}

const Budget = {
  "type": "object",
  "title": "Budget",
  "properties": {
    "total": {
      "type": "integer",
      "formula": "SUM(Year.total)"
    },
    "categories": {
      "type": "array",
      "items": {
        "$ref": "#/$defs/Category"
      }
    },
    "years": {
      "type": "array",
      "items": {
        "$ref": "#/$defs/Year"
      }
    }
  },
  "$defs": {
    "CpY": {
      "type": "object",
      "title": "CpY",
      "properties": {
        "quantity": {
          "type": "integer"
        },
        "cost": {
          "type": "integer"
        },
        "total": {
          "type": "integer",
          "formula": "quantity * cost"
        }
      }
    },
    "Category": {
      "type": "object",
      "title": "Category",
      "properties": {
        "name": {
          "type": "string",
        },
        "total": {
          "type": "integer",
          "formula": "SUM(CpY.total)"
        },
        "CpYs": {
          "_from": "CpY/row",
          "title": "test"
        }
      }
    },
    "Year": {
      "type": "object",
      "title": "Year",
      "properties": {
        "year": {
          "type": "integer"
        },
        "total": {
          "type": "integer",
          "formula": "SUM(CpY.total)"
        },
        "CpYs": {
          "_from": "CpY/col",
          "title":"test"
        }
      }
    }
  }
}

const cpys = [
  [{ quty: 0, cost: 0, total: 0 }, { quty: 0, cost: 0, total: 0 }],
  [{ quty: 0, cost: 0, total: 0 }, { quty: 0, cost: 0, total: 0 }]
]

const BudgetData = {
  total: 0,
  categories: [
    {
      name: "pen", total: 0, cpys: [
        { year: 2005, quty: 0, cost: 0, total: 0 },
        { year: 2006, quty: 0, cost: 0, total: 0 },
      ]
    },
    {
      name: "pencil", total: 0, cpys: [
        { year: 2005, quty: 0, cost: 0, total: 0 },
        { year: 2006, quty: 0, cost: 0, total: 0 },
      ]
    }
  ],
  years: [
    {
      year: 2005, total: 0, cpys: [
        { name: "pen", quty: 0, cost: 0, total: 0 },
        { name: "pencil", quty: 0, cost: 0, total: 0 },
      ]
    },
    {
      year: 2006, total: 0, cpys: [
        { name: "pen", quty: 0, cost: 0, total: 0 },
        { name: "pencil", quty: 0, cost: 0, total: 0 },
      ]
    }
  ]
}

const cpy = {
  "type": "object",
  "title": "CpY",
  "properties": {
    "quantity": {
      "type": "integer"
    },
    "cost": {
      "type": "integer"
    },
    "total": {
      "type": "integer",
      "formula": "quantity * cost"
    }
  }
}

const Schemas = {
  Income,
  Account,
  Budget,
  cpy
}
export default Schemas;