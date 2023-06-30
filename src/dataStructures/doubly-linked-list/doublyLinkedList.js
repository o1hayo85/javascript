import DoublyLinkedListNode from "./doublyLinkedListNode";

export default class DoublyLinkedList {
  constructor(){
    /**
     * @var DoublyLinkedListNode
     */
    this.head = null;

    /**
     * @var DoublyLinkedListNode
     */
    this.tail = null;
  }

  /**
   * prepend: insert a node in the head
   * @param {*} value
   * @return {DoublyLinkedList}
   */
  prepend(value) {
    const newNode = new DoublyLinkedListNode(value, this.head);

    if(this.head) {
      this.head.previous = newNode;
    }
    this.head = newNode;

    if(!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  /**
   * append
   * @param {*} value
   * @return {DoublyLinkedList}
   */
  append(value) {
    const newNode = new DoublyLinkedListNode(value, null, this.tail);   

    if(this.tail) {
      this.tail.next = newNode;
    }
    this.tail = newNode;

    if(!this.head) {
      this.head = newNode;
    }
  }

  /**
   * delete
   * @param {*} value
   * @returns {DoublyLinkedListNode}
   */
  delete(value) {
    if(!this.head) {
      return null;
    }

    let currentNode = this.head;
    let deleteNode = null;
    while(currentNode) {
      if(currentNode.value === value) {
        deleteNode = currentNode;
        // 只有一个节点
        if(this.head === this.tail) {
          this.head = null;
          this.tail = null;
          return deleteNode;
        }

        // 当前节点是头节点
        if(deleteNode === this.head) {
          this.head = deleteNode.next;
          this.head.previous = null;
        } else if(deleteNode === this.tail) {
          this.tail = deleteNode.previous;
          this.tail.next = null;
        } else {
          deleteNode.previous.next = deleteNode.next;
          deleteNode.next.previous = deleteNode.previous;
        }
      }
      currentNode = currentNode.next;
    }

    return deleteNode;
  }

  /**
   * deleteHead
   * @returns {DoublyLinkedListNode}
   */
  deleteHead() {
    if(!this.head){
      return null;
    }

    const deleteNode = this.head;
    if(this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = deleteNode.next;
      this.head.previous = null;
    }

    return deleteNode;
  }

  /**
   * deleteTail
   * @returns {DoublyLinkedListNode}
   */
  deleteTail() {
    if(!this.tail) {
      return null;
    }

    const deleteNode = this.tail;
    if(this.tail === this.head) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = deleteNode.previous;
      this.tail.next = null;
    }

    return deleteNode;
  }

   /**
   * @param {Object} findParams
   * @param {*} findParams.value
   * @param {function} [findParams.callback]
   * @return {DoublyLinkedListNode}
   */
  find({value = undefined, callback = null}) {
    if(!this.head) {
      return null;
    }

    let currentNode = this.head;
    while(currentNode) {
      if(callback && callback(currentNode.value)) {
        return currentNode;
      }

      if (value !== undefined && currentNode.value === value) {
        return currentNode;
      }
      currentNode = currentNode.next;
    }

    return null;
  }

  /**
   * toArray
   * @return {DoublyLinkedListNode[]}
   */
  toArray() {
    const nodes = [];

    let currentNode = this.head;
    while(currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  /**
   * fromArray
   * @param {*[]} value
   * @returns {DoublyLinkedList}
   */
  static fromArray(value) {
    const doublyLinkedList = new DoublyLinkedList();
    value.forEach((el) => {
      doublyLinkedList.append(el);
    })

    return doublyLinkedList;
  }

  /**
   * reverse
   * @returns {DoublyLinkedList}
   */
  reverse() {
    if(!this.head || this.head === this.tail) {
      return this;
    }

    let currentNode = this.head;
    let previous = null;
    let next = null;
    while(currentNode) {
      next = currentNode.next;
      previous = currentNode.previous;

      currentNode.next = previous;
      currentNode.previous = next;

      previous = currentNode;
      currentNode = next;
    }
    
    this.tail = this.head;
    this.head = previous;

    return this;
  }

  /**
   * toString
   * @param {function} [callback]
   * @return {string}
   */
  toString(callback) {
    return this.toArray().map((node) => node.toString(callback)).toString();
  }
}