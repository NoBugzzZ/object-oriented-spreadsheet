import TwoDimensionArray from "./TwoDimensionArray.js";
const BasicType = ["string", "integer", "number", "boolean", "null"];
const funcs = {
  SUM: function sum(...items) {
    return items.reduce((prev, cur) => prev + cur, 0);
  },
  Arithmetic: function arithmetic(expression = "1+1") {
    // eslint-disable-next-line no-new-func
    return new Function(`return ${expression}`)();
  },
};

class SchemaParser {
  constructor(schema, data) {
    this.getRoot = this.getRoot.bind(this);
    this.root = {
      context: {},
      callbacks: {},
      rootData: null,
      schemaSource: schema,
      dataSource: data,
    };
    this.root.rootData = this.parse(this.root, schema, data);
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
    const params = formula
      .slice(start + 1, end)
      .split(",")
      .map((param) => param.trim());
    const func = formula.slice(0, start);
    return [funcs[func], params];
  }

  /**
   * 后续Account在Item处可能会insert，之后在考虑
   *
   * 以Account.Income.total的公式，SUM(Item.value)为例
   * @param {*} root 原始root或者虚拟root
   * @param {*} basePath 基于root的父路径，以Account.Income为例
   * @param {*} param "Item.value"
   * @returns
   */
  getTrueParam(root, basePath, param) {
    //根据三步骤获取参数列表
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
    //放入root.callbacks 的map中
    /**
     * 1.若param满足123，则只将basePath.A...Z.a存入callbackPath
     * 2.若满足4，则需要将basePath.A.B.C...W.X[]与basePath.A.B.C...W.X[]...Z.a
     *  存入callbackPath
     */

    //应该也是路径无关的，此处只有基本字段可以定义formula，而基本字段只能出现在object类型中，不允许直接定义在array类型中，
    //所此处只能find到object类型的parent，后续从Array类型的insert操作，root.rootData因此也只能是object类型，省去不少麻烦
    const parentParsedData = this.find(root, root.rootData, basePath);
    // console.dir(current,{depth:1});
    //下面两步，将完全覆盖1和3，剩下的就是处理2和4，即路径中包含数组的情况。
    //Income.Item.value
    const targetPath = `${parentParsedData.title}.${param}`;
    //从父节点开始寻找target
    const target = this.find(root, parentParsedData, targetPath);
    // console.dir(target,{depth:1});
    // 只是依赖普通字段，而非数组字段
    if (target) {
      //bind target，直接用this获取，这里返回参数数组是为了兼容Item.value这样的真数组
      function getTarget() {
        return [this.value];
      }
      // console.log(basePath, param, getTarget, [`${basePath}.${param}`]);
      return [getTarget.bind(target), [`${basePath}.${param}`], { dependArray: false, target }];
    }

    //处理包含数组的情况
    // const res = [];
    const targetPaths = targetPath.split(".");
    let arrPath = "";
    let arrAfterPath = "";
    let arrTarget = null;
    //此处从Income.Item开始应该是是正确的，不从Income开始也是一种小的优化
    for (let i = 1; i < targetPaths.length; i++) {
      //此处寻找截断点的方式是find返回数组只能在末尾加上[]，直接搜索Income.Item为null
      const targetTemp = this.find(
        root,
        parentParsedData,
        targetPaths.slice(0, i + 1).join(".")
      );
      //找到了数组截断点，截断点一定只会出现在Item.value里，
      //因为Income.Item为null，所以用Income.Item[]寻找
      if (!targetTemp) {
        const arrTargetTemp = this.find(
          root,
          parentParsedData,
          targetPaths.slice(0, i + 1).join(".") + "[]"
        );
        //找到截断点对应的数组，为了美观先break
        if (arrTargetTemp.type === "array") {
          //基于root的绝对路径Accout.Income.Item[]
          arrPath =
            basePath + "." + targetPaths.slice(1, i + 1).join(".") + "[]";
          arrTarget = arrTargetTemp;
          //Item.value
          arrAfterPath = targetPaths.slice(i).join(".");
          break;
        }
      }
    }

    //因为要从arrTarget.value[0]开始寻找，所以数组不能为空
    const arrAfterTarget = this.find(root, arrTarget.value[0], arrAfterPath);
    //截断点后的path找不到对应的对象，其他情况皆不考虑了
    if (!arrAfterTarget) return [null, []];

    //基于root
    const callbackPath = [];
    for (let i = 0; i < arrTarget.value.length; i++) {
      //Accout.Income.Item[i]
      const temp = arrPath.slice(0, arrPath.length - 1) + i + "]";
      //Accout.Income.Item[i].Item.value
      callbackPath.push(temp + "." + arrAfterPath);
    }
    callbackPath.push(arrPath);
    const find = this.find.bind(this);
    function getArrAfterTarget() {
      //上面的函数返回值为[]，就是为了兼容此处
      const values = [];
      for (let i = 0; i < this.value.length; i++) {
        //arrAfterPath=Item.value
        const arrAfterTarget = find(root, this.value[i], arrAfterPath);
        values.push(arrAfterTarget.value);
      }
      return values;
    }
    // console.log(basePath, param, getArrAfterTarget, callbackPath);
    return [getArrAfterTarget.bind(arrTarget), callbackPath, { dependArray: true, arrTarget, arrAfterPath }];
  }

  /**
   * 评估该函数看着也是路径无关的
   *
   * 以SUM(Item.value)为例
   * @param {*} root
   * @param {*} func SUM()对应的内建函数
   * @param {*} params ["Item.value"]，有多个参数就有字符串
   * @param {*} basePath 基于root的父路径
   * @param {*} bindPath 基于root的需要解析formula的parsedData路径
   */
  genNormalCallback(root, parsedData, func, params, basePath, bindPath) {
    //formula依赖的parsedData的path
    const contexts = [];
    //formula获取参数列表的函数
    const targets = [];
    params.forEach((param) => {
      const [getValuesFunc, callbackPaths, context] = this.getTrueParam(
        root,
        basePath,
        param
      );
      contexts.push(context);
      targets.push(getValuesFunc);
    });
    // const getTrueParam = this.getTrueParam.bind(this);
    //this绑定到formula对应的parsedData
    function callback() {
      const argv = [];
      targets.forEach((getValuesFunc) => {
        argv.push(...getValuesFunc());
      });
      this.value = func(...argv);
    }
    const bindedCallback = callback.bind(parsedData);
    contexts.forEach((context) => {
      if (context.dependArray) {
        const { arrTarget, arrAfterPath } = context;
        if (!arrTarget.callbacks[arrAfterPath]) {
          arrTarget.callbacks[arrAfterPath] = [];
        }
        arrTarget.callbacks[arrAfterPath].push(bindedCallback);
      } else {
        context.target.callbacks.push(bindedCallback);
      }
    });
  }
  genArithmeticCallback(root, parsedData, expression, params, basePath, bindPath) {
    const contexts = [];
    const targets = [];
    params.forEach((param) => {
      //此处res和callbackPaths只有单个元素
      const [getValuesFunc, callbackPaths, context] = this.getTrueParam(
        root,
        basePath,
        param
      );
      contexts.push(context);
      targets.push(getValuesFunc);
    });
    // const getTrueParam = this.getTrueParam.bind(this);
    function callback() {
      const argv = [];
      targets.forEach((getValuesFunc) => {
        argv.push(...getValuesFunc());
      });
      let calcExpr = expression;
      argv.forEach((v, i) => {
        calcExpr = calcExpr.replaceAll(params[i], v);
      });
      this.value = funcs["Arithmetic"](calcExpr);
    }

    const bindedCallback = callback.bind(parsedData);
    contexts.forEach((context) => {
      if (context.dependArray) {
        const { arrTarget, arrAfterPath } = context;
        if (!arrTarget.callbacks[arrAfterPath]) {
          arrTarget.callbacks[arrAfterPath] = [];
        }
        arrTarget.callbacks[arrAfterPath].push(bindedCallback);
      } else {
        context.target.callbacks.push(bindedCallback);
      }
    });

    // paths.forEach((path) => {
    //   if (!root.callbacks[path]) {
    //     root.callbacks[path] = {
    //       bindPath,
    //       callbacks: [],
    //     };
    //   }
    //   root.callbacks[path].callbacks.push(callback);
    // });
  }

  /**
   * 评估：应该也是路径无关的
   *
   * @param {*} root 可以是原始的root也可以是虚拟root
   * @param {*} parsedData 需要解析formula的那个解析后对象
   * @param {*} basePath 基于root的父路径
   * @param {*} bindPath 基于root的parsedData路径
   */
  parseFormula(root, parsedData, basePath, bindPath) {
    const { formula } = parsedData;
    const formulaPattern = /^[A-Z]+\(.*\)$/i;
    const expressionPattern = /^\w+(\.\w+)*(\s[-+*/]\s\w+(\.\w+)*)*$/i;
    //普通formula，例如SUM(Item.value)
    if (formulaPattern.test(formula)) {
      const [func, params] = this.parseFormulaStr(formula);
      this.genNormalCallback(root, parsedData, func, params, basePath, bindPath);
    } else if (expressionPattern.test(formula)) {
      //表达式formula，例如Now()-birthday，其中Now()是内建函数，当前还未实现，
      //另一个例子比如a-b
      const variableReg = /\w+(\.\w+)*/gi;
      const variables = Array.from(new Set(formula.match(variableReg)));
      // const operatorReg = /\s[-+*/]\s/ig
      // const operators = formula.match(operatorReg);
      this.genArithmeticCallback(root, parsedData, formula, variables, basePath, bindPath);
    }
  }

  /**
   * 解析$ref，将$ref指向的$defs里的schema取出来。
   *
   * @param {*} root
   * @param {*} schema
   * @returns
   */
  parseRef(root, schema) {
    if (!schema.hasOwnProperty("$ref")) {
      return schema;
    }
    const ref = schema["$ref"];
    if (ref.startsWith("#/$defs/")) {
      const s = ref.split("/");
      return root.schemaSource["$defs"][s[2]];
    }
  }
  parseCustomTypeSchema(root, _schema, data, path = "", title = "") {
    /**
     * TODO: 在context中寻找_schema.title同名的对象，且类型也为TwoDimensionArray，
     * 根据row或者col填入数据
     */
    return {};
  }

  /**
   * parse方法递归解析schema与data生成相应的对象格式，共后面parsecallback使用，
   * 该方法在数组增加时需要重复使用，解析新添加对象的schema。
   *
   * 评估：因为暂时还未在root上直接写数组，所以该方法与路径无关，后期数组增加对象时可以直接使用，
   * 但要注意path与title的修改
   * 在插入数组新对象时，可以生成一个虚拟root，从虚拟root处生成parseddata，应该可行，
   * 那么也就不需要修改path和title，就会生成路径无关的对象
   *
   * @param {*} root 包含最终解析的所有数据信息以及一些元数组：schemaSource、dataSource
   * @param {*} _schema 需要解析的schema
   * @param {*} data  schema对应的data，data可以直接为null，那么childData也为null
   * @param {*} path  记录各对象的[parent]的path，解析后的对象应该是路径无关的，只是为了方便调试观察，
   *                  应该不做实际用处，若使用则在数组增删时维护path中的索引项，增加维护成本
   * @param {*} title schema路径上的title，字段未指定title则使用此项
   * @returns
   */
  parse(root, _schema, data, path = "", title = "") {
    const schema = this.parseRef(root, _schema);
    const { type } = schema;
    let res = null;
    if (type === "object") {
      const totalPath = path === "" ? schema.title : `${path}.${schema.title}`;
      res = {
        path: totalPath,
        type,
        title: schema.title || title,
        value: {},
      };
      for (let [property, childSchema] of Object.entries(schema.properties)) {
        //data也许为null
        const childData = data?.[property] || null;
        //递归解析object下的子对象
        res.value[property] = this.parse(
          root,
          childSchema,
          childData,
          totalPath,
          property
        );
      }
    } else if (type === "array") {
      //array类型的递归解析object有些区别，需要根据data的数量自己添加对应索引值
      const itemsSchema = this.parseRef(root, schema.items);
      const totalPath = `${path}.${itemsSchema.title}[]`;
      res = {
        path: totalPath,
        type,
        title: itemsSchema.title || title,
        itemsSchema,
        value: {
          path: totalPath,
          type: "items",
          title: itemsSchema.title || title,
          length: 0,
        },
      };
      const itemsData = data || [null];
      itemsData.forEach((childData, i) => {
        //重新生成array下的各个child的parentpath
        const totalPath = `${path}.${itemsSchema.title}[${i}]`;
        //递归解析
        res.value[i] = this.parse(root, itemsSchema, childData, totalPath, i);
        res.value.length++;
      });
    } else if (BasicType.includes(type)) {
      const totalPath = `${path}.${title}`;
      res = {
        path: totalPath,
        type,
        title: schema.title || title,
        //应当只有基础类型可以指定依赖对象，使用公式
        formula: schema.formula || null,
        value: data || this.defaultData(type),
      };
      //   if (res.formula) {
      //     this.parseFormula(root, res.formula, path);
      //   }
    } else {
      //自定义类型
      // const totalPath = `${path}.${title}`;
      // const customTypeSchema = this.parseCustomTypeSchema(
      //   root,
      //   schema,
      //   data,
      //   path,
      //   title
      // );
      // res = {
      //   path: totalPath,
      //   type: customTypeSchema.type,
      //   title: customTypeSchema.title,
      //   value: {},
      // };
    }
    return res;
  }

  getRoot() {
    return this;
  }

  /**
   * 作用根据formula构建callback，因为数据依赖只有1-1或者1-n，其中1是依赖方，1和n是被依赖方，
   * 评估：该方法应该也是路径无关方法，即放入任意一个parseddata都可以解析，但是要记得生成虚拟root
   *
   * @param {*} root 提供存储callbacks的环境，//TODO: 以及用提供后期可能需要的context
   *                  但是对于数组的添加，应该提供一个虚拟的root，即将context里的内容提取出来（通过已绑定this的getRoot拿到root），
   *                  在添加一个自己的callbacks，得到一个基于当前要增加的那个对象的虚拟root，供后面的parseProxy使用
   * @param {*} parsedData 可改变解析根路径
   * @param {*} path
   */
  parseCallbacks(root, parsedData, path = "") {
    const { type } = parsedData;
    if (type === "object") {
      const totalPath =
        path === "" ? parsedData.title : `${path}.${parsedData.title}`;
      for (let childParsedData of Object.values(parsedData.value)) {
        this.parseCallbacks(root, childParsedData, totalPath);
      }
    } else if (type === "array") {
      for (let i = 0; i < parsedData.value.length; i++) {
        const totalPath = `${path}.${parsedData.title}[${i}]`;
        this.parseCallbacks(root, parsedData.value[i], totalPath);
      }
    } else if (BasicType.includes(type)) {
      if (parsedData.formula) {
        const bindPath = `${path}.${parsedData.title}`;
        this.parseFormula(root, parsedData, path, bindPath);
      }
    } else {
      //自定义类型
    }
  }

  distrubuteCallback(root, parsedData, path = "") {
    const { type } = parsedData;
    if (type === "object") {
      const totalPath =
        path === "" ? parsedData.title : `${path}.${parsedData.title}`;
      for (let childParsedData of Object.values(parsedData.value)) {
        this.distrubuteCallback(root, childParsedData, totalPath);
      }
    } else if (type === "array") {
      for (let i = 0; i < parsedData.value.length; i++) {
        const childParsedData = parsedData.value[i];
        for (let [path, callbacks] of Object.entries(parsedData.callbacks)) {
          const target = this.find(root, childParsedData, path);
          target.callbacks.push(...callbacks);
        }

        const totalPath = `${path}.${parsedData.title}[${i}]`;
        this.distrubuteCallback(root, childParsedData, totalPath);
      }
    }
  }

  isProxy(obj) {
    const temp = Object.prototype.toString.call(obj);
    const len = temp.length;
    return temp.slice(len - 6, len - 1) === "proxy";
  }

  clearCallbacks() {
    this.root.callbacks = {};
  }

  //绑定parsedData.callbacks下的所有回调函数
  bindThisForCallback(root, parsedData, path = "") {
    const { type } = parsedData;
    if (type === "object") {
      const totalPath =
        path === "" ? parsedData.title : `${path}.${parsedData.title}`;
      for (let childParsedData of Object.values(parsedData.value)) {
        this.bindThisForCallback(root, childParsedData, totalPath);
      }
    } else if (type === "array") {
      if (parsedData.hasOwnProperty("callbacks")) {
        // console.log(parsedData);
        const { bindPath, callbacks } = parsedData.callbacks;
        const bindParsedData = this.find(root, root.rootData, bindPath);
        parsedData.callbacks = callbacks?.map((callback) =>
          callback.bind(bindParsedData)
        ) || [];
      }
      for (let i = 0; i < parsedData.value.length; i++) {
        const totalPath = `${path}.${parsedData.title}[${i}]`;
        this.bindThisForCallback(root, parsedData.value[i], totalPath);
      }
    } else if (BasicType.includes(type)) {
      if (parsedData.hasOwnProperty("callbacks")) {
        // console.log(parsedData);
        const { bindPath, callbacks } = parsedData.callbacks;
        const bindParsedData = this.find(root, root.rootData, bindPath);
        parsedData.callbacks = callbacks?.map((callback) =>
          callback.bind(bindParsedData)
        ) || [];
      }
    } else {
      //自定义类型
    }
  }

  /**
   *
   * @param {*} root
   * @param {*} parsedData
   * @param {*} path 基于root的父路径
   * @param {*} parent  用于将parsedData替换为proxy
   * @param {*} property parent[property]指向需要代理的parsedData
   */
  parseProxy(root, parsedData, path = "", parent = null, property = "") {
    const { type } = parsedData;
    if (type === "object") {
      const totalPath =
        path === "" ? parsedData.title : `${path}.${parsedData.title}`;
      for (let [p, childParsedData] of Object.entries(parsedData.value)) {
        this.parseProxy(root, childParsedData, totalPath, parsedData, p);
      }
    } else if (type === "array") {
      const totalPath = `${path}.${parsedData.title}`;
      // parsedData.callbacks = root.callbacks[`${totalPath}[]`] || {};
      //array不进行proxy代理
      parsedData.callbacks = {};

      const parseFunc = this.parse.bind(this);
      const parseProxyFunc = this.parseProxy.bind(this);
      const parseCallbacksFunc = this.parseCallbacks.bind(this);
      const distrubuteCallbackFunc = this.distrubuteCallback.bind(this);
      const findFunc=this.find.bind(this);
      parsedData.insert = function insertFunc(index) {
        // console.log("[insert] to index " + index, this);
        if(index<0||index>this.value.index) return;
        const virtualRoot = {
          context: root.context,
          rootData: null,
          schemaSource: this.itemsSchema,
          dataSource: null,
        }
        virtualRoot.rootData=parseFunc(virtualRoot,virtualRoot.schemaSource,null);
        parseProxyFunc(virtualRoot,virtualRoot.rootData);
        parseCallbacksFunc(virtualRoot,virtualRoot.rootData);
        distrubuteCallbackFunc(virtualRoot,virtualRoot.rootData);

        for(let i=this.value.length-1;i>=index;i--){
          this.value[i+1]=this.value[i];
        }

        this.value[index]=virtualRoot.rootData;
        this.value.length++;

        for (let [path, callbacks] of Object.entries(this.callbacks)) {
          const target = findFunc(virtualRoot, virtualRoot.rootData, path);
          target.callbacks.push(...callbacks);
          callbacks.forEach(callback=>{
            callback();
          })
        }
        // console.dir(virtualRoot.rootData,{depth:Infinity});
      };
      parsedData.delete = function deleteFunc(index) {
        // console.log("[delete] index " + index, this);
        if(index<0||index>=this.value.length) return;``
        for(let i=index+1;i<this.value.length;i++){
          this.value[i-1]=this.value[i];
        }
        delete this.value[this.value.length-1];
        this.value.length--;
        for (let [, callbacks] of Object.entries(this.callbacks)) {
          callbacks.forEach(callback=>{
            callback();
          })
        }
      };

      for (let i = 0; i < parsedData.value.length; i++) {
        const childTotalPath = `${totalPath}[${i}]`;
        this.parseProxy(
          root,
          parsedData.value[i],
          childTotalPath,
          parsedData,
          i
        );
      }
    } else if (BasicType.includes(type)) {
      //因为基本类型只存在在object类型中，所以不用担心array类型
      const totalPath = `${path}.${parsedData.title}`;
      // console.log(totalPath);
      //设置callbacks
      // parsedData.callbacks = root.callbacks[totalPath] || {};
      parsedData.callbacks = [];
      parent.value[property] = new Proxy(parent.value[property], {
        set(target, property, newValue, receiver) {
          let res = null;
          res = Reflect.set(target, property, newValue, receiver);
          if (property === "value") {
            // console.log(target,property, newValue);
            //在监听set调用后后触发回调
            target.callbacks?.forEach((callback) => {
              callback();
            });
          }
          return res;
        },
      });
    } else {
      //自定义类型
    }
  }

  serialization(parsedData) {
    return this.rootData.value;
  }

  findParent(root, path = "") {
    const paths = path.split(".");
    const len = paths.length;
    return [
      this.find(root, root.rootData, paths.slice(0, len - 1).join(".")),
      paths[len - 1],
    ];
  }
  //DONE: 根据path获取对应的对象
  /**
   * 路径算法：
   * 1.有一个路径A.B...Z.a，其中不含[]，即不包含数组，且a为基础类型，则依次遍历下去获得对象，
   *  其中若只有A.B...Z，则获得object对应的对象，A.B...Z.a则获得基础类型对应的对象。
   * 2.若要想包含数组，则需要指定[index],例如A.B[1].C.a
   * 3.另外若A...C[]，只有最后的C包含[]，则相当于A...C
   *
   * 注意 path="A.B...C.a",A与rootData的根title相同，也可以更换rootData以获得更大灵活性。
   */
  find(
    root,
    parsedData = {},
    target = "Account.Income.Item[0].Item.value",
    path = ""
  ) {
    const { type } = parsedData;
    if (type === "object") {
      const totalPath =
        path === "" ? parsedData.title : `${path}.${parsedData.title}`;
      // console.log(totalPath);
      if (totalPath === target) return parsedData;
      if (target.startsWith(totalPath)) {
        for (let childParsedData of Object.values(parsedData.value)) {
          const res = this.find(root, childParsedData, target, totalPath);
          if (res) return res;
        }
      }
    } else if (type === "array") {
      const totalPath = "" ? parsedData.title : `${path}.${parsedData.title}`;
      // console.log(`${totalPath}[]`);
      //find数组时path必须加上"[]"
      if (`${totalPath}[]` === target) return parsedData;
      if (target.startsWith(totalPath)) {
        for (let i = 0; i < parsedData.value.length; i++) {
          const childPath = `${totalPath}[${i}]`;
          const res = this.find(root, parsedData.value[i], target, childPath);
          if (res) return res;
        }
      }
    } else if (BasicType.includes(type)) {
      const totalPath = `${path}.${parsedData.title}`;
      // console.log(totalPath);
      if (totalPath === target) return parsedData;
    } else {
      //自定义类型
    }
    return null;
  }

  getData() {
    console.log(this);
    return this.value;
  }

  setData(value) {
    console.log(value, this);
    this.value = value;
  }

  insertData(index, value) {
    console.log(index, value, this);
  }

  deleteData(index) {
    console.log(index, this);
  }

  //获取crud函数，并且使用bind绑定到对应的对象，使用crud时就会修改
  //后面应该要改成object里提前绑定对象，而不应该在crud里绑定
  getCRUD(root, path = "", _parsedData = null) {
    const parsedData = _parsedData || root.rootData;
    const target = this.find(root, parsedData, path);
    if (target) {
      const setData = this.setData.bind(target);
      const getData = this.getData.bind(target);
      // console.log(path,target);
      return [null, getData, setData, null];
    }

    const paths = path.split(".");
    let arrPath = "";
    let arrAfterPath = "";
    let arrTarget = null;
    const res = [];
    for (let i = 0; i < paths.length; i++) {
      const targetTemp = this.find(
        root,
        root.rootData,
        paths.slice(0, i + 1).join(".")
      );
      //找到了数组截断点
      if (!targetTemp) {
        const arrTargetTemp = this.find(
          root,
          root.rootData,
          paths.slice(0, i + 1).join(".") + "[]"
        );
        // console.log("######",paths.slice(0, i + 1).join(".") + "[]",arrTargetTemp)
        if (arrTargetTemp?.type === "array") {
          arrPath = paths.slice(0, i + 1).join(".") + "[]";
          arrTarget = arrTargetTemp;
          arrAfterPath = paths[i] + "." + paths.slice(i + 1).join(".");
          for (let i = 0; i < arrTarget.value.length; i++) {
            const arrAfterTarget = this.find(
              root,
              arrTarget.value[i],
              arrAfterPath
            );
            if (!arrAfterTarget) return [[null, null, null, null]];
            const setData = this.setData.bind(arrAfterTarget);
            const getData = this.getData.bind(arrAfterTarget);
            const insertData = this.insertData.bind(arrTarget);
            const deleteData = this.deleteData.bind(arrTarget);
            // console.log(arrAfterPath,arrAfterTarget,arrPath,arrTarget);
            res.push([insertData, getData, setData, deleteData]);
          }
        }
        break;
      }
    }
    return res;
  }
}

const handler = {
  get: function (target, property, receiver) {
    let res = null;
    res = Reflect.get(target, property, receiver);
    return res;
  },
  set: function (target, property, newValue, receiver) {
    let res = null;
    res = Reflect.set(target, property, newValue, receiver);
    return res;
  },
  deleteProperty: function (target, property) {
    let res = null;
    res = Reflect.deleteProperty(target, property);
    return res;
  },
};

const ParsedBudget = {
  schemaSource: {
    type: "object",
    title: "Budget",
    properties: {
      total: {
        type: "integer",
        _formula: "SUM(Year.total)",
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
            _formula: "quantity * cost",
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
            _formula: "SUM(CpY.total)",
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
            _formula: "SUM(CpY.total)",
          },
          CpYs: {
            _from: "TwoDimensionArray/col",
            _schema: "#/$defs/CpY",
            title: "test",
          },
        },
      },
    },
  },
  dataSource: {
    total: 0,
    categories: [
      {
        name: "pen",
        total: 0,
        cpys: [
          { year: 2005, quty: 0, cost: 0, total: 0 },
          { year: 2006, quty: 0, cost: 0, total: 0 },
        ],
      },
      {
        name: "pencil",
        total: 0,
        cpys: [
          { year: 2005, quty: 0, cost: 0, total: 0 },
          { year: 2006, quty: 0, cost: 0, total: 0 },
        ],
      },
    ],
    years: [
      {
        year: 2005,
        total: 0,
        cpys: [
          { name: "pen", quty: 0, cost: 0, total: 0 },
          { name: "pencil", quty: 0, cost: 0, total: 0 },
        ],
      },
      {
        year: 2006,
        total: 0,
        cpys: [
          { name: "pen", quty: 0, cost: 0, total: 0 },
          { name: "pencil", quty: 0, cost: 0, total: 0 },
        ],
      },
    ],
  },
  dependencies: {
    passive: {
      "Budget.total": {
        formula: "SUM(Year.total)",
        parameters: {
          "Year.total": "${Budget.Year[].total}",
        },
      },
      "Budget.Category[0].total": {
        formula: "SUM(CpY.total)",
        parameters: {
          "CpY.total": "${#/CpYs.Category[0].total}",
        },
      },
      "Budget.Year[0].total": {
        formula: "SUM(CpY.total)",
        parameters: {
          "CpY.total": "${#/CpYs.Year[0]}.total}",
        },
      },
    },
    positive: {
      "Budget.Year[0].total": ["Budget.total"],
      CpYs: ["Budget.Category[0].total", "Budget.Year[0].total"],
    },
  },
  context: {
    //CpYs: new TwoDimensionArray("category", "year", {}, "title")
  },
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
        },
      },
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
        },
      },
    ],
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
        value: 0,
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
                value: "pen",
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
                value: null, //this.parsedData.context.CpYs,
              },
            },
          },
        },
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
                value: 2022,
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
              },
            },
          },
        },
      },
    },
  },
};

const Budget = {
  context: {
    //CpY: new TwoDimensionArray("category", "year", {}, "title")
  },
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
        value: 0,
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
                value: "pen",
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
              },
            },
          },
        },
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
                value: 2022,
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
              },
            },
          },
        },
      },
    },
  },
};

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
              },
            },
          },
        },
      },
    },
  },
};

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
                  },
                },
              },
            },
          },
        },
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
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
// const arr = [];
// const proxy = new Proxy(arr, handler);

// proxy[0] = 0;
// proxy[2] = 2;
// console.log(proxy[1]);
// proxy.push(3);
// proxy.pop();
// delete proxy[0];
// console.dir(arr);

const IncomeLayout = [
  ["Income"],
  ["Item"],
  ["${Income.Item.value}", "DOWN"],
  ["Total"],
  ["${Income.total}"],
];

const AccountLayout = [
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
];

const BudgetLayout = [
  ["Budget", , "Year"],
  [, , ["${Budget.Year.year}", "RIGHT", 3]],
  [
    "Category",
    "Name",
    ["Qnty", "RIGHT", 3, "${Account.Year}.${length}"],
    ["Cost", "RIGHT", 3, "${Account.Year}.${length}"],
    ["Total", "RIGHT", 3, "${Account.Year}.${length}"],
    "Total",
  ],
  [
    ,
    ["${Budget.Category.name}", "DOWN", 1, "${Account.Category}.${length}"],
    ["${Budget.Category.CpYs}.${qnty}", "Right", 3, "DOWN", 1],
    ["${Budget.Category.CpYs}.${cost}", "Right", 3, "DOWN", 1],
    ["${Budget.Category.CpYs}.${total}", "Right", 3, "DOWN", 1],
    ["${Budget.Category.total}", "DOWN", 1, "${Account.Category}.${length}"],
  ],
  ["Total", , , , ["${Budget.Year.total}", "RIGHT", 3], ["${Budget.total}"]],
];

export default SchemaParser;
