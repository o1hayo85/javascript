/**
 * 1.arguments对象的值不反映参数的默认值，只反映传给函数的参数
 *  如果使用了默认参数，使用arguments对象获取参数值则为空
 * 2.默认参数可以是函数返回值, 但是只有在函数执行并且对应参数未传参的情况下才会调用 
 * 
 */
function makeKing(name = 'Jack') {
  console.log('Henry', name);
  console.log('Henry', arguments[0]);
}

// makeKing();  
// Henry Jack
// Henry undefined


/**
 * 1. 函数参数的作用域和暂时性死区，即前面的参数不能引用后面的参数
 *  
 */
function makeKingA(name, nameTem = name) {
  console.log(name, nameTem)
}

makeKingA('Henry');


/**
 * 函数的this
 */
function Queen() {
  this.royaltyName = 'Elizabeth';
  // this 引用 window 对象
  setTimeout(function () { // 计时器指向的是Time
    console.log(this)
    console.log(this.royaltyName);
  }, 1000);
}

new Queen();

console.log(Queen.toString())

/**
 * 斐波纳契数列
 */
function fib(n) {
  if (n < 2) {
    return n;
  }

  return fib(n - 1) + fib(n - 2);
}

console.log(fib(5));

/**
 * closure
 * 函数闭包
 */
function createComparisonFunction(propertyName) {
  return function (object1, object2) {
    let value1 = object1[propertyName];
    let value2 = object2[propertyName];

    if (value1 < value2) {
      return -1;
    } else if (value1 > value2) {
      return 1;
    } else {
      return 0;
    }
  };
}

const compare = createComparisonFunction('name')
console.log("🚀 ~ file: function.js:77 ~ compare:", compare)


/**
 * 闭包内的this
 * 闭包内不能访问外部函数的this和arguments对象
 */

var identity = 'The Window';

let object = {
  identity: 'My Object',
  getIdentityFunc() {
    console.log(this)
    return function () {
      console.log(this)
      return this.identity;
    };
  }
};

console.log(object.getIdentityFunc()())