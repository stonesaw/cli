function isType(type: string, obj: any) {
  const toString = Object.prototype.toString.call(obj).slice(8, -1);
  return obj !== undefined && obj !== null && toString === type;
}

function isString(obj: any)   { return isType("String",   obj); }
function isNumber(obj: any)   { return isType("Number",   obj); }
function isBoolean(obj: any)  { return isType("Boolean",  obj); }
function isDate(obj: any)     { return isType("Date",     obj); }
function isError(obj: any)    { return isType("Error",    obj); }
function isArray(obj: any)    { return isType("Array",    obj); }
function isFunction(obj: any) { return isType("Function", obj); }
function isRegExp(obj: any)   { return isType("RegExp",   obj); }
function isObject(obj: any)   { return isType("Object",   obj); }

export {
  isType,
  isString,
  isNumber,
  isBoolean,
  isDate,
  isError,
  isArray,
  isFunction,
  isRegExp,
  isObject
}