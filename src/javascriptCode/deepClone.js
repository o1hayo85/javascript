import is from './is';

function deepClone(target, map = new WeakMap()) {
  // 返回基础类型
  if(is.Null(target) || !is.Object(target)) {
    return target;
  }

  // 日期类型或正则类型
  if(is.Date(target) || is.RegExp(target)) {
    const Constructor = target.constructor;
    return new Constructor(target);
  }

  // 防止循环引用
  if(map.get(target)) {
    return map.get(target)
  }
  
  let result = null;
  const isFunc = typeof target === 'function';

  if(isFunc) {
    // 箭头函数
    if(!target.hasOwnProperty('prototype')) {
      result = new Function(`return ${target.toString()}`)();
    }

    // 普通函数
    result = function (...args) {
      return target.call(this, ...args)
    }
    map.set(target, result);
    return result;
  }
  

  const isArr = is.Array(target);
  result = isArr ? [] : {};

  if(isArr) {
    for (let index = 0; index < target.length; index++) {
      const el = array[index];
      result[index] = deepClone(el, map);
    }
    map.set(target, result);
    return result;
  }

  Object.keys(target).forEach(([key, value]) => {
    result[key] = deepClone(value, map);
  })
  map.set(target, result);

  return result;
}

export default deepClone;
