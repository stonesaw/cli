function isType(type, obj) {
    var toString = Object.prototype.toString.call(obj).slice(8, -1);
    return obj !== undefined && obj !== null && toString === type;
}

function type(obj) {
  var toString = Object.prototype.toString.call(obj).slice(8, -1);
  return obj !== undefined && obj !== null && toString;
}

function isString(obj)   { return isType("String",   obj); }
function isNumber(obj)   { return isType("Number",   obj); }
function isBoolean(obj)  { return isType("Boolean",  obj); }
function isDate(obj)     { return isType("Date",     obj); }
function isError(obj)    { return isType("Error",    obj); }
function isArray(obj)    { return isType("Array",    obj); }
function isFunction(obj) { return isType("Function", obj); }
function isRegExp(obj)   { return isType("RegExp",   obj); }
function isObject(obj)   { return isType("Object",   obj); }

export {
  isType,
  type,
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
