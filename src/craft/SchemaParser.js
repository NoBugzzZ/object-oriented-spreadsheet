import TwoDimensionArray from "./TwoDimensionArray.js"
const BasicType = ["string", "integer", "number", "boolean", "null"]
const funcs = {
    "SUM": function sum(...items) {
        return items.reduce((prev, cur) => prev + cur, 0);
    },
    "Arithmetic": function arithmetic(expression = "1+1") {
        // eslint-disable-next-line no-new-func
        return new Function(`return ${expression}`)()
    }

}

class SchemaParse {
    constructor(schema, data) {
        this.schemaSource = schema;
        this.dataSource = data;
        this.root = {
            context: {},
            callbacks: {},
            rootData: null,
        }
        this.root.rootData = this.parse(this.root, this.schemaSource, this.dataSource);
    }
    defaultData(type) {
        switch (type) {
            case "string":
                return "";
            case "integer":
            case "number":
                return 0;
            case "boolean":
                return false;
            case "null":
                return null;
            default:
                return void 0;
        }
    }
    parseFormulaStr(formula = "") {
        const start = formula.indexOf("(");
        const end = formula.lastIndexOf(")");
        const params = formula.slice(start + 1, end)
            .split(",")
            .map(param => param.trim());
        const func = formula.slice(0, start);
        return [funcs[func], params];
    }
    getTrueParam(basePath, param) {
        const res = []
        //TODO: 根据三步骤获取参数列表
        /**
         * 1. param只有a，则直接搜索basePath.a对应的基本类型对象，若有则hit，
         * 2. 1miss,寻找basePath.a对应的数组类型，若有则hit，否则miss，报错？
         * 3. param若为a.b.c...z，则搜索basePath.A.B.C...Z.a，其中basePath.A.B.C...Z
         *  只能为object类型，若满足则hit。
         * 4. 3中若存在X为array类型，即basePath.A.B.C...W均为object，Y...Z均为object，
         *  则此处也hit。
         * 
         * 其中，123均为单个值，res.push(value)后返回即可
         * 但是4中需要使用basePath.A.B.C...W.X或者basePath.A.B.C...W.X[]获得对应的数组对象，
         * 然后遍历数组对象，获得Y...Z.a对应值，得到一个包含多个值的参数数组values，
         * res.push(...values)后返回即可
         */
        return res;
    }
    parseFormula(root, parsedData, basePath, title) {
        const { formula } = parsedData;
        const formulaPattern = /^[A-Z]+\(.*\)$/i
        const expressionPattern = /^\w+(\.\w+)*(\s[-+*/]\s\w+(\.\w+)*)*$/i;
        if (formulaPattern.test(formula)) {
            const [func, params = []] = parseFormulaStr(formula);
            function callback() {
                const argv = [];
                params.foreach(param => {
                    argv.push(...getTrueParam(basePath, param));
                })
                //此处的this需要之后来绑定
                this.value=func(...argv);
            }
        } else if (expressionPattern.test(formula)) {
            const variableReg = /\w+(\.\w+)*/ig;
            const operatorReg = /\s[-+*/]\s/ig
            const variables = Array.from(new Set(formula.match(variableReg)))
            const operators = formula.match(operatorReg);

        }
    }
    parse(root, schema, data, path = "", title) {
        const { type } = schema;
        let res = null;
        if (type === "object") {

        } else if (type === "array") {

        } else if (BasicType.includes(type)) {

        } else {
            //自定义类型
            res = {
                type,
                title: schema.title || title,
                formula: schema.formula || null,
                value: data || this.defaultData(type),
            }
            if (schema.formula) {
                this.parseFormula(root, res, path, title);
            }
        }
        return res;
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

    //TODO: 根据path获取对应的对象
    /**
     * 路径算法：
     * 1.有一个路径A.B...Z.a，其中不含[]，即不包含数组，且a为基础类型，则依次遍历下去获得对象，
     *  其中若只有A.B...Z，则获得object对应的对象，A.B...Z.a则获得基础类型对应的对象。
     * 2.若要想包含数组，则需要指定[index],例如A.B[1].C.a
     * 3.另外若A...C[]，只有最后的C包含[]，则相当于A...C
     * 
     * 注意 path="A.B...C.a",A与rootData的根title相同，也可以更换rootData以获得更大灵活性。
     */
    find(path = "Budget.categories[0].Category.CpYs", rootData = {}) {

    }

    crud() {


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


const ParsedBudget = {
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
    callbacks: {
        "Budget.Year[].total": [
            {
                bind: "Budget.total",
                callback: function callback() {
                    /*
                    *      //拆分SUM公式与Year.total参数，拆分对应的数组Year与在数组中的参数路径total
                    *      //获取Year对应的数组years，然后依次获取数组里的Year.total对应的对象
                    *      const arr=[];
                    *      for(let index in years){
                    *          //find(obj,path) 寻找某对象下的某路径的对象
                    *          const total=find(year[index],"Year.total");
                    *          arr.push(total.value);
                    *      }
                    *      this.value=SUM(...arr);
                    */
                }
            }
        ],
        "Budget.Year[]": [
            {
                bind: "Budget.total",
                callback: function callback() {
                    /*
                    *      //拆分SUM公式与Year.total参数，拆分对应的数组Year与在数组中的参数路径total
                    *      //获取Year对应的数组years，然后依次获取数组里的Year.total对应的对象
                    *      const arr=[];
                    *      for(let index in years){
                    *          //find(obj,path) 寻找某对象下的某路径的对象
                    *          const total=find(year[index],"Year.total");
                    *          arr.push(total.value);
                    *      }
                    *      this.value=SUM(...arr);
                    */
                }
            }
        ]
    },
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
                //Budget
                type: "integer",
                title: "total",
                /**
                 * 在解析data时，先生成大的对象，然后实现proxy以及crud，
                 * 在这期间绑定依赖。
                 * 
                 * 1.依赖于某一值A,在当前schema中搜索key为A的值，若发现，则生成callback
                 *  1.1 若为1-1,例如formula:CalcAge(birthday)//CalcAge中需要使用
                 * Date.now()API，所以自定义了一个函数;则生成
                 * callback(){
                 *  //剥离this.formula,获得CalcAge函数与birthday参数，根据Budget.birthday
                 *  //获取birthday对象。
                 *  this.value=CalcAge(birthday.value);
                 * }
                 * callback=callback.bind(A对应的对象),参数加上对象路径合成参数Budget.birthday，
                 * 之后放入map中，等待绑定；
                 *  1.2 若为1-n 例如formula:a+b;生成
                 *  callback(){
                 *   //解析此处公式为算数表达式，获得Arithmetic函数
                 *   //解析公式的argv=["a","b"]，依次获得path:Budget.a，
                 *   //获取a对应的对象，替换字符串a+b->a.value+b;b同理
                 *   this.value=Arithmetic("a.value+b.value");
                 *  }
                 *  绑定this后放入Budget.a与Budget.b对应map中。
                 *  1.1和1.2本质一样,应该区分CalcAge与Arithmetic函数，他们本质区别在于CalcAge
                 *  传递参数列表，Arithmetic传递表达式字符串。
                 *  
                 * 2.依赖于某一对象下的值Class1.CLASS2...A，搜索schema发现类型为Class1.CLASS2...
                 * 的object，且其中包含A的，那么就生成callback，处理方式和1类似。
                 * 
                 * 3.依赖于该对象下的数组的值Year.total，这样的形式和2的依赖写法上类似，但是2中
                 *  Class1.CLASS2..中ClassX均为object类型，不允许包含array类型，如果此处依赖于
                 *  Class1.CLASS2...Year.total,ClassX也只能是object。所以在2寻找失败时，才验证
                 *  3的可行性。另外此处应该不包含Arithmetic函数，只支持SUM这样的普通函数。
                 *  另外：如果此处公式为SUM(Year)，这样会和1写法类似，所以先判断是否满足1，若不满足，
                 *  则验证3的可行性。另一个区别在于SUM(Year)中包含的是普通数组，而SUM(Year.total)
                 *  包含的是对象数组。此处如果可以延伸出现SUM(Year...ClassA...total)，应该也是可以的，
                 *  但此处不讨论，实现的话也暂时不实现。
                 *  callback(){
                 *      //拆分SUM公式与Year.total参数，拆分对应的数组Year与在数组中的参数路径total
                 *      //获取Year对应的数组years，然后依次获取数组里的Year.total对应的对象
                 *      const arr=[];
                 *      for(let index in years){
                 *          //find(obj,path) 寻找某对象下的某路径的对象
                 *          const total=find(year[index],"Year.total");
                 *          arr.push(total.value);
                 *      }
                 *      this.value=SUM(...arr);
                 *  }
                 *  callback绑定this，放入Budget.Year[].total与Budget.Year[]的map中，
                 *  因为total的改变会引起this.value的改变,Budget.Year[]数组的增删也会引起改变。
                 */
                formula: "SUM(Year.total)",
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
                     *      return Reflect.ownKeys(target).filter(i=>Number.isInteger(Number(i)));
                     * }
                     */
                    insert(i) {
                        /**
                         * 1.若插在中间，从末尾元素开始向后移动
                         * 2.再依次递归创造新的子元素，得到新插入的对象，
                         * 若中间生成的元素有依赖关系：
                         *  2.1.若为1-n，即当前单个对象值可影响多个，
                         * 那么使用proxy配合路径取值直接修改对应对象值。
                         * 好处在于：删除对象时减少对dependencies的更新。此项优先级更高。
                         *  2.2.若为n-1或n-n(包括数组取值)，则使用发布订阅模式。
                         * 好处在于：更新可以推迟，即对数组的增删可以在增删完成后再触发，、
                         * 但是需要维护dependencies。
                         */
                    },
                    delete(i) {
                        /**
                         * 1.先依次删除子元素。
                         * 2.若删除中间元素，则从删除的后一个元素依次往前移动
                         */
                    },
                    type: "items",
                    title: "Category",
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
                                value: this.parsedData.context.CpYs,
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