// Path: src\lib\utils\type.ts

export const _isString = (value: any) => {
  return typeof value === 'string' || value instanceof String;
};

export const _isNumber = (value: any) => {
  return typeof value === 'number' || value instanceof Number;
};

export const _isBoolean = (value: any) => {
  return typeof value === 'boolean' || value instanceof Boolean;
};

export const _isDate = (value: any) => {
  return value instanceof Date;
};

export const _isUndefined = (value: any) => {
  return typeof value === 'undefined';
};

export const _isDefined = (value: any) => {
  return typeof value !== 'undefined';
};

export const _isFunction = (value: any) => {
  return typeof value === 'function';
};

export const _isObject = (value: any) => {
  return typeof value === 'object';
};

export const _isPrimitive = (value: any) => {
  return _isString(value) || _isNumber(value) || _isBoolean(value);
};

export const _isPromise = (value: any) => {
  return _isObject(value) && _isFunction(value.then);
};

export const _isArray = (value: any) => {
  return Array.isArray(value);
};

export const _isRegExp = (value: any) => {
  return value instanceof RegExp;
};

export const _isError = (value: any) => {
  return value instanceof Error;
};

export const _isSymbol = (value: any) => {
  return typeof value === 'symbol';
};

export const _isMap = (value: any) => {
  return value instanceof Map;
};

export const _isSet = (value: any) => {
  return value instanceof Set;
};

export const _isWeakMap = (value: any) => {
  return value instanceof WeakMap;
};
