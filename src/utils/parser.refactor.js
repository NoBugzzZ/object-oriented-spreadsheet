import EventEmitter from "./Event.js"

function resolveRef(ref = "", $defs) {
  if (ref.startsWith("#/$defs/")) {
    const s = ref.split("/");
    return $defs[s[2]];
  }
}

function resolveFrom(from) {
  const froms = from.split("/");
  const className = froms[0];
  const context = froms[1];
  return [className, context];
}

function isBasicType(type) {
  const basicTypes = ["integer", "number", "string", "boolean", "null"];
  return basicTypes.includes(type);
}

function parse(schema) {
  const root = { entry: null, context: {}, event: null };
  root.event = new EventEmitter(schema.title);
  root.entry = parseSchema(schema, null, schema, root);
  return root;
}

function parseSchema(schema, parent, rootSchema, root) {
  const _schema = schema.hasOwnProperty("$ref") ?
    resolveRef(schema["$ref"], rootSchema["$defs"]) : schema;
  const { type } = _schema;
  const entry = { schema: _schema, data: null, children: {}, parent };
  if (type === "object") {
    for (let [key, value] of Object.entries(_schema.properties)) {
      entry.children[key] = parseSchema(value, entry, rootSchema, root);
    }
  } else if (type === "array") {
    let itemShema = _schema.items.hasOwnProperty("$ref") ?
      resolveRef(_schema.items["$ref"], rootSchema["$defs"]) : _schema.items;
    entry.children = new Proxy([], {});
    entry.children.splice(0, 0, parseSchema(itemShema, entry, rootSchema, root));
  } else if (isBasicType(type)) {
    entry.children = null;
  } else if (_schema.hasOwnProperty("_from")) {
    entry.children = null;
  }
  return entry;
}

const Parser = {
  parse
}

export default Parser;