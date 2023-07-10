import LinkedList from '../linked-list/linkedList';

/**
 * 默认hashTable的大小
 */
const defaultHashTableSize = 32;

export default class HashTable {
  /**
   * @param {number} size
   */
  constructor(size = defaultHashTableSize) {
    this.buckets = (new Array(size)).fill(null).map(() => new LinkedList());
    this.keys = {};
  }

  /**
   * 将key string转换为hash number
   * @param {string} key 
   * @return {number}
   */
  hash(key) {
    let hashCode = 0;
    for (let i = 0; i < key.length; i++) {
      hashCode = 37 * hashCode + key.charCodeAt(i);
    }

    return  hashCode % this.size;
  }

  /**
   * hashTable的大小
   */
  get size() {
    return this.buckets.length || 0;
  }

  /**
   * @param {string} key 
   * @param {*} value 
   */
  set(key, value) {
    const keyHash = this.hash(key);
    this.keys[key] = keyHash;

    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({callback: (value) => value.key === key})

    if(!node) {
      // 增加节点值
      bucketLinkedList.append({ key, value });
    } else {
      // 更新节点值
      node.value.value = value;
    }
  }
  
  /**
   * @param {*} key 
   * @return {*} 
   */
  get(key) {
    const bucketLinkedList = this.buckets[this.hash(key)];
    const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key });

    return node ? node.value.value : undefined;
  }

  /**
   * @param {*} key 
   * @return {*} 
   */
  has(key) {
    return Object.prototype.hasOwnProperty.call(this.keys, key)
  }

  /**
   * 
   * @param {string} key 
   * @returns {*}
   */
  delete(key) {
    const keyHash = this.hash(key);
    delete this.keys[key];

    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key });
    
    if(node) {
      return bucketLinkedList.delete(node.value);
    }

    return null;
  }

  
  /**
   * @return {string[]}
   */
  getKeys() {
    return Object.keys(this.keys);
  }

  /**
   * @returns {*[]}
   */
  getValues() {
    return this.buckets.reduce((values, bucket) => {
      const bucketValues = bucket.toArray()
        .map((linkedListNode) => linkedListNode.value.value);
      return values.concat(bucketValues);
    }, []);
  }
}