// Path: src\lib\utils
export * from './type';
export * from './date';

export const _uuid = () => {
  return 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'.replace(/[x]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    return r.toString(16);
  });
};

export const _uuidByLength = (text: string, length: number) => {
  const uuid = _uuid();
  return text + uuid.substring(0, length);
};

export function _classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export const _get = (obj: any, path: string, defaultValue: any) => {
  const result = String.prototype.split
    .call(path, /[,[\].]+?/)
    .filter(Boolean)
    .reduce((res, key) => (res !== null && res !== undefined ? res[key] : res), obj);
  return result === undefined || result === obj ? defaultValue : result;
};
