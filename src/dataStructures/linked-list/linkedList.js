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
   * delete 删除链表中的某个元素
   * @param {*} value  要删除的元素
   * @return {LinkedListNode}
   */
  delete(value) {
    if(!this.head) {
      return null;
    }
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
   * toString 将链表内容转换为字符串
   * @param {function} [callback]
   */
  toString(callback) {
    return this.toArray().map((node) => node.toString(callback)).toString();
  }
}