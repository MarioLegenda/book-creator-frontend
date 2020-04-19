import deepcopy from 'deepcopy';

export class NodeValue {
  private value: any;

  constructor(
    private id: string,
    value: any
  ) {
    this.value = deepcopy(value);
  }

  getId() {
    return this.id;
  }

  getValue() {
    return this.value;
  }

  copy(): NodeValue {
    return new NodeValue(this.id, deepcopy(this.value));
  }
}

export class Parent {
  private readonly value: any;
  constructor(
    private readonly id: string,
    private readonly index: number,
    value: any)
  {
    this.value = deepcopy(value);
  }

  getId(): string {
    return this.id;
  }

  getIndex(): number {
    return this.index;
  }

  getValue(): any {
    return this.value;
  }
}

export class Node {
  private index: number;

  constructor(
    private readonly children: Children,
    private parent: Parent,
    private value: NodeValue,
  ) {}

  addToNode(node: Node): Node {
    const parent: Parent = node.getParent();

    if (this.getNodeValue().getId() === parent.getId()) {
      if (this.children.length() === 0) {
        const idx = parent.getIndex() + 1;
        node.setIndex(idx);

        this.children.add(node);

        return node;
      }

      const parentIdx: number = parent.getIndex();
      const len: number = this.children.length();
      const idx = (parentIdx + len) + 1;

      node.setIndex(idx);

      this.children.add(node);

      return node;
    }

    return this.children.addToNode(node);
  }

  getNode(id: string): Node {
    return this.children.getNode(id);
  }

  setIndex(idx: number): void {
    this.index = idx;
  }

  getParent(): Parent {
    return this.parent;
  }

  searchParent(id: string): Parent | null {
    if (this.getNodeValue().getId() === id) {
      return this.asParent();
    }

    return this.children.searchParent(id);
  }

  getIndex(): number {
    return this.index;
  }

  getNodeValue(): NodeValue {
    return this.value;
  }

  reduceArray(fn: Function, reducer: NodeValue[]): NodeValue[] {
    const confirm: boolean = fn.call(null, this.getNodeValue());
    if (confirm) reducer.push(this.getNodeValue());

    return this.children.reduceArray(fn, reducer);
  }

  asParent(): Parent {
    return new Parent(this.getNodeValue().getId(), this.getIndex(), this.value.copy());
  }
}

export class Children {
  private values: {[key: string]: Node} = {};

  add(node: Node) {
    this.values[node.getNodeValue().getId()] = node;

    return node;
  }

  addToNode(node: Node): Node {
    const keys = Object.keys(this.values);

    for (const k of keys) {
      const existingNode: Node = this.values[k];

      if (existingNode.addToNode(node)) {
        return node;
      }
    }

    return null;
  }

  getNode(id: string): Node {
    const keys = Object.keys(this.values);

    // first, search immediate children only
    for (const k of keys) {
      const node = this.values[k];

      if (node.getNodeValue().getId() === id) {
        return node;
      }
    }

    // first, search immediate children only
    for (const k of keys) {
      const node: Node = this.values[k];

      const found: Node = node.getNode(id);

      if (found) {
        return found;
      }
    }

    return null;
  }

  searchParent(id: string): Parent | null {
    const keys = Object.keys(this.values);

    // first, search immediate children only
/*    for (const k of keys) {
      const node = this.values[k];

      if (node.getNodeValue().getId() === id) {
        return node.asParent();
      }
    }*/

    // then search node children
    for (const k of keys) {
      const node = this.values[k];
      const parent: Parent = node.searchParent(id);

      if (parent) return parent;
    }

    return null;
  }

  reduceArray(fn: Function, reducer: NodeValue[]): NodeValue[] {
    const keys = Object.keys(this.values);

    console.log(this.values);
    for (const key of keys) {
      const node: Node = this.values[key];

      console.log(node.reduceArray(fn, reducer));

      reducer = [...reducer, ...node.reduceArray(fn, reducer)];
    }

    return reducer;
  }

  length(): number {
    return Object.keys(this.values).length;
  }
}

export class Tree {
  private readonly id: string;
  private readonly children: Children;
  private readonly value: NodeValue;
  private readonly index: number = 0;

  constructor(id: string, children: Children, value: NodeValue) {
    this.id = id;
    this.children = children;
    this.value = value;
  }

  getId(): string {
    return this.id;
  }

  add(node: Node): Node {
    if (node.getParent().getId() === this.getId()) {
      if (this.children.length() === 0) {
        node.setIndex(this.index + 1);

        this.children.add(node);

        return node;
      }

      const parentIdx: number = this.index;
      const len: number = this.children.length();
      node.setIndex((parentIdx + len) + 1);

      return this.children.add(node);
    }

    return this.children.addToNode(node);
  }

  get(id: string): Node {
    return this.children.getNode(id);
  }

  getIndex(): number {
    return this.index;
  }

  searchParent(id: string): Parent {
    if (id === this.id) {
      return this.asParent();
    }

    return this.children.searchParent(id);
  }

  getNodeValue(): NodeValue {
    return this.value;
  }

  reduceArray(fn: Function, reducer: NodeValue[]): NodeValue[] {
    return this.children.reduceArray(fn, reducer);
  }

  asParent(): Parent {
    return new Parent(this.id, this.getIndex(), this.value.copy());
  }
}
