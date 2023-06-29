import LinkedListNode from './linkedListNode';

export default class LinkedList {
  constructor() {
    /**
     * @var LinkedListNode
     */
    this.head = null;

    /**
     * @var LinkedListNode
     */
    this.tail = null;
  }

  /**
   * append 在链表后加入一个节点
   * @param {*} value
   * @return {LinkedList}
   */
  append(value) {
    const newNode = new LinkedListNode(value);
    
    if(!this.head) { // 空链表
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    // 把节点插入到最后
    this.tail.next = newNode;
    this.tail = newNode;

    return this;
  }

  /**
   * prepend 在链表头插入一个节点
   * @param {*} value
   * @return {LinkedList}
   */
  prepend(value) {
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;

    if(!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  /**
   * insert 在链表中插入一个节点
   * @param {*} value
   * @param {number} index
   * @return {LinkedList}
   */
  insert(value, index) {
    const i = index < 0 ? 0 : index;
    const newNode = new LinkedListNode(value);
    
    // 链表为空
    if(!this.head || i === 0) {
      this.prepend(value);
      return this;
    }

    let currentIndex = 0;
    let currentNode = this.head;
    // 找到需要插入的前一个节点或一直到链表末尾
    while( currentIndex + 1 < i && currentNode.next ) {
      currentNode = currentNode.next;
      currentIndex++;
    }

    const nextNode = currentNode.next; // 需要插入的位置，为空则代表需要插入到末尾
    if(nextNode) {
      currentNode.next = newNode;
      newNode.next = nextNode;
    } else {
      this.append(value);
    }
    
    return this;
  }

  /**
   * delete 删除链表中的匹配的第一个元素 只支持基本类型的删除
   * @param {*} value  要删除的元素
   * @return {LinkedListNode}
   */
  delete(value) {
    if(!this.head) {
      return null;
    }

    let currentNode = this.head;
    if(this.head.value === value) {
      this.head = currentNode.next;
      return currentNode;
    }    

    while(currentNode.next && currentNode.next.value !== value) {
      currentNode = currentNode.next;
    }

    const nextNode = currentNode.next;
    // 没有找到该节点
    if(!nextNode) {
      return null;
    } else {
      if(nextNode.next) {
        currentNode.next = nextNode.next;
      } else {
        this.tail = currentNode;
        currentNode.next = null;
      }
    }
    return nextNode;
  }

  /**
   * deleteTail 删除链表末尾节点
   * @return {LinkedListNode}
   */
  deleteTail() {
    if(!this.tail) {
      return null;
    }
    
    const deleteNode = this.tail;
    if(this.tail === this.head) {
      this.tail = null;
      this.head = null;
      return deleteNode;
    }

    let currentNode = this.head;
    while(currentNode.next) {
      // 没有下一个节点
      if(!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;
    return deleteNode;
  }

  /**
   * deleteHead 删除链表头节点
   * @return {LinkedListNode}
   */
  deleteHead() {
    if(!this.head) {
      return null;
    }

    const deleteNode = this.head;

    if(this.head.next) {
      this.head = this.head.next;
    } else {
      this.tail = null;
      this.head = null;
    }

    return deleteNode;
  }

  /**
   * @param {Object} findParams 查找的参数
   * @param {*} findParams.value
   * @param {function} [findParams.callback]
   * @return {LinkedListNode | null}
   */
  find({ value = null , callback = null }) {
    if(!this.head) {
      return null;
    }

    let currentNode = this.head;
    while(currentNode) {
      if(callback && callback(currentNode.value)) {
        return currentNode;
      }

      if(value === currentNode.value) {
        return currentNode;
      }

      currentNode = currentNode.next;
    }

    return null;
  }

  /**
   * @param {*[]} values - Array of values that need to be converted to linked list.
   * @return {LinkedList}
   */
  fromArray(values) {
    values.forEach((value) => this.append(value));

    return this;
  }

  /**
   * toArray 将链表转换为数组
   * @return {LinkedListNode[]}
   */
  toArray() {
    const list = [];
    let currentNode = this.head;

    while(currentNode) {
      list.push(currentNode);
      currentNode = currentNode.next;
    }

    return list;
  }

  /**
   * reverse 将链表翻转
   * @return {LinkedList}
   */
  reverse() {
    let currentNode = this.head;
    let preNode = null;
    let nextNode = null;

    while(currentNode) {
      nextNode = currentNode.next;
      currentNode.next = preNode;

      // next node
      preNode = currentNode;
      currentNode = nextNode;
    }

    this.tail = this.head;
    this.head = preNode;

    return this;
  }

  /**
   * forEach callback
   * @callback callback
   * @param {*} value
   * @param {number} [index]
   */

  /**
   * forEach 遍历链表
   * @param {callback} callback 
   */
  forEach(callback) {
    if(!callback) {
      return
    }

    let currentNode = this.head;
    let index = 0;
    while(currentNode) {
      callback(currentNode.value, index)
      currentNode = currentNode.next;
      index++;
    }
  }

  /**
   * reverseForEach 反向遍历
   * @param {callback} callback
   */
  reverseForEach(callback) {
    function exec(node, callback) {
      if(node) {
        exec(node.next, callback);
        callback(node.value);
      }
    }

    exec(this.head, callback);
  }


  /**
   * toString 将链表内容转换为字符串
   * @param {function} [callback]
   */
  toString(callback) {
    return this.toArray().map((node) => node.toString(callback)).toString();
  }
}