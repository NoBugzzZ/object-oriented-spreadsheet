import TwoDimensionArray from "./TwoDimensionArray.refactor.js"

class SchemaParse {
    constructor(schema, data) {
        this.schemaSource = schema;
        this.dataSource = data;
        this.parsedData = this.parse(this.schemaSource, this.dataSource);
        this.queue={};
    }
    parse(schema, data) {
        return {
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
                    }
                }
            }
        }
    }

    serialization(parsedData) {
        return this.rootData.value;
    }

    getDataByPath(path="Budget.categories[0].Category.CpYs"){
        const obj=this.this.findByPath(path);
        return obj.value;
    }

    setDataByPath(path,value){
        const obj=this.findByPath(path);
        obj.value=value;
    }

    insert(path){
        const obj=this.findByPath(path);
        obj.value.insert();
    }

    delete(path){
        const obj=this.findByPath(path);
        obj.value.delete();
    }

    findByPath(path="Budget.categories[0].Category.CpYs"){
        return {};
    }

    getAccess(path){
        return[this.insert,this,this.getDataByPath,this.setDataByPath,this.delete];
    }

    register(path="",callback=()=>{}){
        this.queue[path].push(callback);
    }
}

function getInstance(schema,data){
    const parser=new SchemaParse({},{});
    return ()=>parser;
}

const Instance=getInstance();

export default Instance;