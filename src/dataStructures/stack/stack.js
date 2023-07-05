import LinkedList from '../linked-list/linkedList';

export default class Stack {
  constructor() {
    this.linkedList = new LinkedList();
  }

  /**
   * @returns {boolean} 
   */
  isEmpty() {
    return !this.linkedList.head
  }

  /**
   * @returns {*}
   */
  peek() {
    if(this.isEmpty()) {
      return null;
    }

    return this.linkedList.head.value;
  }

  /**
   * @param {*} value 
   */
  push(value) {
    this.linkedList.prepend(value);
  }

  /**
   * @returns {*} 
   */
  pop() {
    if(this.isEmpty()) {
      return null;
    }

    return this.linkedList.deleteHead().value;
  }

  /**
   * @returns {*[]} 
   */
  toArray() {
    return this.linkedList.toArray().map((node) => node.value)
  }

  /**
   * @param {function} [callback] 
   * @returns 
   */
  toString(callback) {
    return this.linkedList.toString(callback);
  }
}