import Heap from "../heap";

describe('heap', () => {
  it('should not allow to create instance of Heap directly', () => {
    const initHeap = () => {
      const heap = new Heap();
      heap.add(5);
    }

    expect(initHeap).toThrow()
  })
})