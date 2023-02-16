import TwoDimensionArray from "./TwoDimensionArray.js"

class SchemaParse {
    constructor(schema, data) {
        this.schemaSource = schema;
        this.dataSource = data;
        this.parsedData = this.parse(this.schemaSource, this.dataSource);
    }
    parse(schema, data) {
        return {
            dependencies: {
                passive: {
                    "Budget.total": {
                        formula: "SUM(Year.total)",
                        parameters: {
                            "Year.total": "${Budget.Year[].total}"
                        }
                    },
                    "Budget.Category[0].total": {
                        formula: "SUM(CpY.total)",
                        parameters: {
                            "CpY.total": "${#/CpYs.Category[0].total}",
                        }
                    },
                    "Budget.Year[0].total": {
                        formula: "SUM(CpY.total)",
                        parameters: {
                            "CpY.total": "${#/CpYs.Year[0]}.total}",
                        }
                    }
                },
                positive: {
                    "Budget.Year[0].total": ["Budget.total"],
                    "CpYs": ["Budget.Category[0].total", "Budget.Year[0].total"]
                }
            },
            context: { CpYs: new TwoDimensionArray("category", "year", {}, "title") },
            rootData: {
                //Budget
                type: "object",
                title: "Budget",
                /**
                 * get:(target,property,receiver)=>{
                 *      if(property==="value"){
                 *          let res{};
                 *          for(let p in target.value){
                 *              res[p]=target.value[p].value;
                 *          }   
                 *          return res;
                 *      }
                 *      return Reflect.get(target,property,receiver);
                 * }
                 */
                value: {
                    total: {
                        //Budget.total
                        type: "integer",
                        title: "total",
                        /**
                         * proxy
                         * get:(target,property,receiver)=>{
                         *      return Reflect.get(target,property,receiver);
                         * },
                         * set:(target,property,value,receiver)=>{
                         *      const res=Reflect.set(target,property,value,receiver);
                         *      event.emit(target.path);
                         *      return res;
                         * },
                         */
                        value: 0
                    },
                    categories: {
                        //Budget.Category[]
                        type: "array",
                        title: "Category",
                        /**
                         * get:(target,property,receiver)=>{
                         *      if(property==="value"){
                         *          const res=[];
                         *          for(let p in target.value){
                         *              res.push(target.value[p].value);
                         *          }
                         *          return res;
                         *      }
                         *      return Reflect.get(target,property,receiver);
                         * }
                         */
                        value: {
                            //Budget.Category[]
                            /**
                             * get:(target,property,receiver)=>{
                             *      if(property==="length"){
                             *          return Reflect.get(target,property,receiver);
                             *      }else{
                             *          const index=Number(property);
                             *          if(Number.isInteger(index)&&index>=0&&index<target.length){
                             *              return Reflect.get(target,property,receiver);
                             *          }
                             *      }
                             *      return null;
                             * },
                             * set:(target,property,value,receiver)=>{
                             *          const index=Number(property);
                             *          if(!Number.isInteger(index)) return;
                             *          if(index>=0&&index<target.length){
                             *              const res=Reflect.set(target,property,value,receiver);
                             *              event.emit(target.path);
                             *              return res;
                             *          }
                             *          if(index===target.length){
                             *              const res=Reflect.set(target,property,value,receiver);
                             *              Reflect.set(target,"length",index+1,receiver);
                             *              event.emit(target.path);
                             *              return res;
                             *          }
                             *      
                             * },
                             * deleteProperty:(target, property)=>{
                             *      const index=Number(property);
                             *      if(!Number.isInteger(index)) return null;
                             *      if(index===target.length-1){
                             *          const res=Reflect.deleteProperty(target, property);
                             *          Reflect.set(target,"length",index,receiver);
                             *          return res;
                             *      }
                             * },
                             * ownKeys:(target)=>{
                             *      return Reflect.ownKeys(target).filter(v=>v!==length);
                             * }
                             */
                            length: 1,
                            0: {
                                //Budget.Category[0]
                                type: "object",
                                title: "Category",
                                value: {
                                    name: {
                                        //Budget.Category[0].name
                                        /**
                                         * get:()=>{}
                                         * set:()=>{}
                                         */
                                        type: "string",
                                        title: "name",
                                        value: "pen"
                                    },
                                    total: {
                                        //Budget.Category[0].total
                                        /**
                                         * get:()=>{}
                                         * set:()=>{}
                                         */
                                        type: "integer",
                                        title: "total",
                                        value: 10,
                                    },
                                    CpYs: {
                                        //Budget.Category[0].CpYs
                                        //TwoDimensionArray
                                        type: "TwoDimensionArray",
                                        title: "CpYs",
                                        /**
                                         * get:(target,property,receiver)=>{
                                         *      if(property==="value"){
                                         *          const res = target.value.getValue(target.path);
                                         *          return res;
                                         *      }
                                         * },
                                         * set:(target,property,value,receiver)=>{
                                         *      //null
                                         * },
                                         * deleteProperty:(target,property)=>{
                                         *      //null
                                         * },
                                         */
                                        value: {},
                                    }
                                }
                            }
                        }
                    },
                    years: {
                        //Budget.Year[]
                        type: "array",
                        title: "Year",
                        /**
                         * get:()=>{},
                         * add:()=>{},
                         * delete:()=>{},
                         */
                        value: {
                            length: 1,
                            0: {
                                //Budget.Year[0]
                                type: "object",
                                title: "Year",
                                value: {
                                    year: {
                                        //Budget.Year[0].year
                                        type: "integer",
                                        title: "year",
                                        value: 2022
                                    },
                                    total: {
                                        //Budget.Year[0].total
                                        type: "integer",
                                        title: "total",
                                        value: 10,
                                    },
                                    CpYs: {
                                        //Budget.Year[0].CpYs
                                        type: "TwoDimensionArray",
                                        title: "CpYs",
                                        /**
                                         * get:()=>{},
                                         * set:()=>{},
                                         * add:()=>{},
                                         * delete:()=>{},
                                         */
                                        value: {},
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };
    }

    serialization(parsedData) {
        return this.rootData.value;
    }

    getData(path = "Budget.categories[0].Category.CpYs") {
        const obj = find(path);
        return path.value;
    }

    setData(path, value) {
        const obj = find(path);
        path.value = value;
    }

    insertData() {

    }

    delete() {

    }

    find(path = "Budget.categories[0].Category.CpYs") {

    }

    
}

const handler = {
    get: function (target, property, receiver) {
        let res = null;
        console.log("[get]", property);
        res = Reflect.get(target, property, receiver);
        return res;
    },
    set: function (target, property, newValue, receiver) {
        let res = null;
        console.log("[set]", property, newValue);
        res = Reflect.set(target, property, newValue, receiver);
        return res;
    },
    deleteProperty: function (target, property) {
        let res = null;
        console.log("[delete]", property);
        res = Reflect.deleteProperty(target, property);
        return res;
    }
}

const Budget = {
    context: { CpY: new TwoDimensionArray("category", "year", {}, "title") },
    rootData: {
        type: "object",
        title: "Budget",
        /**
         * get:()=>{},
         */
        value: {
            total: {
                type: "integer",
                title: "total",
                /**
                 * proxy
                 * get:()=>{},
                 * set:()=>{},
                 */
                value: 0
            },
            categories: {
                type: "array",
                title: "Category",
                /**
                 * get:()=>{},
                 * add:()=>{},
                 * delete:()=>{},
                 */
                value: {
                    length: 1,
                    0: {
                        type: "object",
                        title: "Category",
                        value: {
                            name: {
                                type: "string",
                                title: "name",
                                value: "pen"
                            },
                            total: {
                                type: "integer",
                                title: "total",
                                value: 10,
                            },
                            CpYs: {
                                type: "TwoDimensionArray",
                                title: "CpYs",
                                /**
                                 * get:()=>{},
                                 * set:()=>{},
                                 * add:()=>{},
                                 * delete:()=>{},
                                 */
                                value: {},
                            }
                        }
                    }
                }
            },
            years: {
                type: "array",
                title: "Year",
                /**
                 * get:()=>{},
                 * add:()=>{},
                 * delete:()=>{},
                 */
                value: {
                    length: 1,
                    0: {
                        type: "object",
                        title: "Year",
                        value: {
                            year: {
                                type: "integer",
                                title: "year",
                                value: 2022
                            },
                            total: {
                                type: "integer",
                                title: "total",
                                value: 10,
                            },
                            CpYs: {
                                type: "TwoDimensionArray",
                                title: "CpYs",
                                /**
                                 * get:()=>{},
                                 * set:()=>{},
                                 * add:()=>{},
                                 * delete:()=>{},
                                 */
                                value: {},
                            }
                        }
                    }
                }
            }
        }
    }
}

const Income = {
    context: {},
    rootData: {
        type: "object",
        title: "Income",
        value: {
            total: {
                type: "integer",
                title: "total",
                value: 0,
            },
            items: {
                type: "array",
                title: "Item",
                value: {
                    length: 1,
                    0: {
                        type: "object",
                        title: "Item",
                        value: {
                            value: {
                                type: "integer",
                                title: "value",
                                value: 0,
                            }
                        }
                    }
                }
            }
        }
    }
}

const Account = {
    context: {},
    rootData: {
        type: "object",
        title: "Account",
        value: {
            netEaringings: {
                type: "integer",
                title: "netEaringings",
                value: 0,
            },
            Income: {
                type: "object",
                title: "Income",
                value: {
                    total: {
                        type: "integer",
                        title: "total",
                        value: 0,
                    },
                    items: {
                        type: "array",
                        title: "Item",
                        value: {
                            length: 1,
                            0: {
                                type: "object",
                                title: "Item",
                                value: {
                                    value: {
                                        type: "integer",
                                        title: "value",
                                        value: 0,
                                    }
                                }
                            }
                        }
                    }
                }
            },
            Expense: {
                type: "object",
                title: "Expense",
                value: {
                    total: {
                        type: "integer",
                        title: "total",
                        value: 0,
                    },
                    items: {
                        type: "array",
                        title: "Item",
                        value: {
                            length: 1,
                            0: {
                                type: "object",
                                title: "Item",
                                value: {
                                    value: {
                                        type: "integer",
                                        title: "value",
                                        value: 0,
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
const arr = [];
const proxy = new Proxy(arr, handler);

proxy[0] = 0;
proxy[2] = 2;
console.log(proxy[1]);
proxy.push(3);
proxy.pop();
delete proxy[0];
console.dir(arr);

const IncomeLayout = [
    ["Income"],
    ["Item"],
    ["${Income.Item.value}", "DOWN"],
    ["Total"],
    ["${Income.total}"],
]

const ExpenseLayout = [
    ["Account"],
    ["Income"],
    ["Item"],
    [["${Account.Income.Item.value}", "DOWN"]],
    ["Total"],
    ["${Account.Income.Item.total}"],
    ["Expense"],
    ["Item"],
    [["${Account.Expense.Item.value}", "DOWN"]],
    ["Total"],
    ["${Account.Expense.Item.total}"],
    ["${Account.netEarings}"],
]

const BudgetLayout = [
    ["Budget", , "Year"],
    [, , ["${Budget.Year.year}", "RIGHT", 3]],
    ["Category", "Name", ["Qnty", "RIGHT", 3, "${Account.Year}.${length}"], ["Cost", "RIGHT", 3, "${Account.Year}.${length}"], ["Total", "RIGHT", 3, "${Account.Year}.${length}"], "Total"],
    [, ["${Budget.Category.name}", "DOWN", 1, "${Account.Category}.${length}"], ["${Budget.Category.CpYs}.${qnty}", "Right", 3, "DOWN", 1], ["${Budget.Category.CpYs}.${cost}", "Right", 3, "DOWN", 1], ["${Budget.Category.CpYs}.${total}", "Right", 3, "DOWN", 1], ["${Budget.Category.total}", "DOWN", 1, "${Account.Category}.${length}"]],
    ["Total", , , , ["${Budget.Year.total}", "RIGHT", 3], ["${Budget.total}"]]
]