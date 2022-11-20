interface Root {
  entry: Entry;
  context: {
    [key: string]: {};
  };
  event: {};
}

interface Entry {
  schema: JSONSchema;
  data: {};
  children: Array<Document> | null;
}

interface Document {
  schema: ObjectSchema | ArraySchema | BasicSchema;
  data: {} | [] | any;
  children: Array<Document> | null;
}

interface ObjectSchema {
  type: "object";
  title: string;
  properties: {
    [key: string]: Ref | BasicSchema | ArraySchema;
  };
}

interface ArraySchema {
  type: "array";
  item: Ref | BasicSchema;
}

interface BasicSchema {
  type: "integer" | "number" | "string" | "boolean" | "null";
  title: string;
}

interface Ref {
  $ref: string;
}

interface JSONSchema extends ObjectSchema {
  $defs: {
    [key: string]: ObjectSchema;
  };
}
