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
      this.children.add(node);

      return node;
    }

    return this.children.addToNode(node);
  }

  getNode(id: string): Node {
    return this.children.getNode(id);
  }

  getParent(): Parent {
    return this.parent;
  }

  createParent(id: string): Parent | null {
    if (this.getNodeValue().getId() === id) {
      return this.asParent();
    }

    return this.children.createParent(id);
  }

  getIndex(): number {
    return this.getParent().getIndex() + this.children.length() + 1;
  }

  getNodeValue(): NodeValue {
    return this.value;
  }

  reduceArray(fn: Function, reducer: any[]): any[] {
    fn.call(null, this, reducer);

    this.children.reduceArray(fn, reducer);

    return deepcopy(reducer);
  }

  asParent(): Parent {
    return new Parent(this.getNodeValue().getId(), this.getParent().getIndex(), this.value.copy());
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

  createParent(id: string): Parent | null {
    const keys = Object.keys(this.values);

    for (const k of keys) {
      const node = this.values[k];
      const parent: Parent = node.createParent(id);

      if (parent) return parent;
    }

    return null;
  }

  reduceArray(fn: Function, reducer: any[]): void {
    const keys = Object.keys(this.values);

    for (const key of keys) {
      const node: Node = this.values[key];

      node.reduceArray(fn, reducer);
    }

    return deepcopy(reducer);
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
      this.children.add(node);

      return node;
    }

    return this.children.addToNode(node);
  }

  get(id: string): Node {
    return this.children.getNode(id);
  }

  getIndex(): number {
    return this.index;
  }

  createParent(id: string): Parent {
    if (id === this.id) {
      return this.asParent();
    }

    return this.children.createParent(id);
  }

  getNodeValue(): NodeValue {
    return this.value;
  }

  reduceArray(fn: Function, reducer: any[]) {
    this.children.reduceArray(fn, reducer);

    return deepcopy(reducer);
  }

  asParent(): Parent {
    let idx: number;
    if (this.children.length() === 0) {
      idx = this.index + 1;
    } else {
      const len: number = this.children.length();
      idx = (this.index + len) + 1;
    }

    console.log(idx);

    return new Parent(this.id, idx, this.value.copy());
  }
}
