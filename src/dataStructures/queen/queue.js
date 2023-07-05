import LinkedList from '../linked-list/linkedList';

/**
 * 队列原则先进先出
 */
export default class Queue {
  constructor() {
    this.linkedList = new LinkedList();
  }

  /**
   * isEmpty 检查Queue是否是空队列
   * @returns {boolean} 
   */
  isEmpty() {
    return !this.linkedList.head
  }

  /**
   * peek 读取队列最前一个的值
   * @returns {*}
   */
  peek() {
    if(this.isEmpty()) {
      return null;
    }

    return this.linkedList.head.value;
  }

  /**
   * enqueue 在队列末插入一个元素
   * @param {*} value
   */
  enqueue(value) {
    this.linkedList.append(value)
  }

  /**
   * dequeue 移除队列最前面元素
   * @returns {*}
   */
  dequeue() {
    if(this.isEmpty()) {
      return null
    }

    return this.linkedList.deleteHead().value
  }

  /**
   * toString  
   * @param {Function} [callback]
   * @returns {string}
   */
  toString(callback) {
    return this.linkedList.toString(callback)
  }
}
