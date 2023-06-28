import LinkedListNode from "../linkedListNode";

describe('linkedListNode', () => {
  it('should create list node with value', () => {
    const node = new LinkedListNode(2);
    expect(node.value).toBe(2);
    expect(node.next).toBeNull();
  })

  it('should create list node with object as a value', () => {
    const o = { key: 'name', value: 'jack' }
    const node = new LinkedListNode(o);

    expect(node.value.key).toBe('name');
    expect(node.value.value).toBe('jack');
    expect(node.next).toBeNull();
  })

  it('should linked nodes together', () => {
    const node1 = new LinkedListNode(1);
    const node2 = new LinkedListNode(2, node1)

    expect(node2.next).toBe(node1);
    expect(node2.next.value).toBe(1);
    expect(node1.next).toBeNull();
  })

  it('should convert node to string', () => {
    const node = new LinkedListNode(1);
    expect(node.toString()).toBe('1');
    node.value = { key: 'key' };
    expect(node.toString()).toBe('[object Object]')
  })

  it('should convert node to string with custom stringifier', () => {
    const nodeValue = { value: 1, key: 'test' };
    const node = new LinkedListNode(nodeValue);
    const toStringCallback = (value) => `value: ${value.value}, key: ${value.key}`;

    expect(node.toString(toStringCallback)).toBe('value: 1, key: test');
  });
})