import LinkedList from "../linkedList";

describe('linkedList', () => {
  test('should create empty linked list', () => {
    const linkedList = new LinkedList();
    expect(linkedList.toString()).toBe('');
  })

  test('linkedList insert', () => {
    const linkedList = new LinkedList();

    linkedList.insert(4, 3);
    expect(linkedList.head.toString()).toBe('4');
    expect(linkedList.tail.toString()).toBe('4');

    linkedList.insert(3, 2);
    linkedList.insert(2, 1);
    linkedList.insert(1, -7);
    linkedList.insert(10, 9);
    expect(linkedList.toString()).toBe('1,4,2,3,10');
  })
})