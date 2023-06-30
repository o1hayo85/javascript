export default class DoublyLinkedListNode {
  /**
   * @param {*} value node value
   * @param {*} next nextNode
   * @param {*} previous prevNode
   */
  constructor(value, next = null, previous = null) {
      this.value = value;
      this.previous = previous;
      this.next = next;
  }

  toString(callback) {
    return callback ? callback(this.value) : `${this.value}`
  }
}