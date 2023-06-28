function getObjectType(value) {
  return Object.prototype.toString.call(value).slice(8, -1);
}

const is = {
  Null: (value) => value === null,
  Undefined: (value) => value === Undefined,
  String: (value) => typeof value === 'string',
  Number: (value) => typeof value === 'number',
  NaN: (value) => isNaN(value),
  Symbol: (value) => typeof value === 'symbol',
  Boolean: (value) => typeof value === 'boolean',
  Array: Array.isArray,
  Object: (value) => typeof value === 'object',
  OriginObject: (value) => getObjectType(value) === 'Object',
  Date: (value) => getObjectType(value) === 'Date',
  RegExp: (value) => getObjectType(value) === 'RegExp'
};

export default is;