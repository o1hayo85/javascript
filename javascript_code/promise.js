const isFunction = obj => typeof obj === 'function'
const isObject = obj => !!(obj && typeof obj === 'object')
const isThenable = obj => (isFunction(obj) || isObject(obj)) && 'then' in obj
const isPromise = promise => promise instanceof PromiseA

class PromiseA {
  static PENDING = 'pending';
  static FULFILLED = 'fulfilled';
  static REJECTED = 'rejected';

  executor(exec) {
    const resolve = (value) => {
      if (!this.state === PromiseA.PENDING) {
        return
      }

      this.state = PromiseA.FULFILLED;
      this.result = value;
      this.handleAllCallback(this.callbacks);
    }

    const reject = (reason) => {
      if (!this.state === PromiseA.PENDING) {
        return
      }

      this.state = PromiseA.REJECTED;
      this.result = reason;
      this.handleAllCallback(this.callbacks);
    }

    try {
      exec(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
    return new PromiseA((resolve, reject) => {
      const callback = { onFulfilled, onRejected, resolve, reject }

      if (this.state === PromiseA.PENDING) {
        this.callbacks.push(callback);
        return;
      }

      /**
       * onFulfilled or onRejected must not be called until the execution context stack contains only platform code.
       */
      setTimeout(() => this.handleCallback(callback, this.state, this.result), 0)
    })
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  static resolve(value) {
    return new PromiseA((resolve) => resolve(value));
  }

  static reject(reason) {
    return new PromiseA((_ , reject) => reject(reason))
  }

  static all(list) {
    if(!list || !list[Symbol.iterator]) {
      throw new Error('params must be iterator')
    }

    return new PromiseA((resolve, reject) => {
      const length = list.length;
      let count = 0;
      const r = new Array(length);
      const setResult = (i, v) => {
        r[i] = v;
        count++;
        if(count === length) {
          resolve(r);
        }
      }      
      list.forEach((p, i) => {
        if(isPromise(p)) {
          p.then((res) => setResult(i, res), reject);
        } else {
          setResult(i, p);
        }
      })
    })
  }

  static allSettled() {}

  static race(list) {
    if(!list[Symbol.iterator] && typeof list === 'string') {
      throw new Error('list must be iterator') 
    }

    return new PromiseA((resolve, reject) => {
      for (const p of list) {
        if(isPromise(p)) {
          p.then(resolve, reject)
        } else {
          resolve(p);
        }
      }
    })
  }

  handleCallback(callback, state, result) {
    const { onFulfilled, onRejected, resolve, reject } = callback;
    try {
      if (state === PromiseA.FULFILLED) {
        isFunction(onFulfilled) ? resolve(onFulfilled(result)) : resolve(result);
      }

      if (state === PromiseA.REJECTED) {
        isFunction(onRejected) ? reject(onRejected(result)) : reject(result);
      }
    } catch (err) {
      reject(err)
    }
  }

  handleAllCallback(callbacks) {
    while(callbacks.length) {
      this.handleCallback(this.callbacks.shift(), this.state, this.result)
    }
  }

  constructor(exec) {
    this.state = PromiseA.PENDING;
    this.result = null;
    this.callbacks = [];

    this.executor(exec);
  }
}

const p = new PromiseA((resolve, reject) => {
  setTimeout(() => {
    // throw new Error('测试时间到')
    resolve('2000')
  }, 2000)
}).then((res) => {
  console.log("🚀 ~ file: promise.js:84 ~ p ~ res:", res)
  return '1200'
})

PromiseA.all([1, 2, 3, p]).then((res) => {
  console.log("🚀 ~ file: promise.js:143 ~ PromiseA.all ~ res:", res)
})

module.exports = PromiseA;