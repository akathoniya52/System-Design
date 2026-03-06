class Node {
  constructor(key) {
    this.key = key;
    this.prev = null;
    this.next = null;
  }
}

class RecentlyUsedCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();

    this.head = null; // most recent
    this.tail = null; // least recent
  }

  insert(key) {
    if (this.map.has(key)) {
      this._moveToHead(this.map.get(key));
      this.print(key);
      return;
    }

    const node = new Node(key);
    this.map.set(key, node);
    this._addToHead(node);

    if (this.map.size > this.capacity) {
      const removed = this.tail;
      this._removeNode(removed);
      this.map.delete(removed.key);
    }

    this.print(key);
  }

  read(key) {
    if (!this.map.has(key)) return;

    const node = this.map.get(key);
    this._moveToHead(node);

    this.print(key);
  }

  delete(key) {
    if (!this.map.has(key)) return;

    const node = this.map.get(key);
    this._removeNode(node);
    this.map.delete(key);

    const recent = this.head ? this.head.key : null;
    this.print(recent);
  }

  _addToHead(node) {
    node.next = this.head;
    node.prev = null;

    if (this.head) this.head.prev = node;
    this.head = node;

    if (!this.tail) this.tail = node;
  }

  _removeNode(node) {
    if (node.prev) node.prev.next = node.next;
    else this.head = node.next;

    if (node.next) node.next.prev = node.prev;
    else this.tail = node.prev;
  }

  _moveToHead(node) {
    this._removeNode(node);
    this._addToHead(node);
  }

  print(recent) {
    let curr = this.head;
    const arr = [];

    while (curr) {
      arr.push(curr.key);
      curr = curr.next;
    }

    console.log(arr.reverse().join(" "), "recent ->", recent);
  }
}



const cache = new RecentlyUsedCache(4);

cache.insert("A");
cache.insert("B");
cache.insert("C");
cache.insert("D");
cache.delete("D");
cache.insert("E");
cache.read("B");
cache.delete("B");
cache.insert("F");
