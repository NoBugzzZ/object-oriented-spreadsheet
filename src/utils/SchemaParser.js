import TwoDimensionArray from "./TwoDimensionArray.refactor.js"

class SchemaParse {
    constructor(schema, data) {
        this.schemaSource = schema;
        this.dataSource = data;
        this.parsedData = this.parse(this.schemaSource, this.dataSource);
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
        const obj=find(path);
        return path.value;
    }

    setDataByPath(path,value){
        const obj=find(path);
        path.value=value;
    }

    insert(){

    }

    delete(){
        
    }

    find(path="Budget.categories[0].Category.CpYs"){

    }
}