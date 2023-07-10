/**
 * heap:
 * 一种完全二叉树结构(父节点的编号存在可计算关系，不需要存储边的信息)，可以使用一维数组来表示
 * 节点位置：以当前节点为i节点为例，父节点位置为(i-1)/2, 左子节点位置i*2+1, 右子节点位置i*2+2
 */

export default class Heap {
  /**
   * @constructs Heap
   * @param {function} [compareFunction] 
   */
  constructor(compare) {
    // 模拟抽象类
    if(new.target === 'Heap') {
      throw new TypeError('Cannot construct Heap instance directly')
    }

    this.heapPool = [];
    this.compare = compare ? compare : this.defaultCompare;    
  }

  /**
   * @param {number} a 
   * @param {number} b 
   * @returns 
   */
  static defaultCompare(a, b) {
    if(a === b) {
      return 0
    }

    return a < b ? -1 : 1;
  }

  /**
   * @param {number} currentIndex 
   * @returns {number}
   */
  getLeftChildIndex(currentIndex) {
    return currentIndex * 2 + 1;
  }

  /**
   * 
   * @param {number} currentIndex 
   * @returns {number}
   */
  getRightChildIndex(currentIndex) {
    return currentIndex * 2 + 2
  }
}