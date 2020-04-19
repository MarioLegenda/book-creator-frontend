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

    if (this.getParent().getId() === parent.getId()) {
      if (this.children.length() === 0) {
        this.setIndex(this.getParent().getIndex() + 1);

        this.children.add(node);

        return node;
      }

      const parentIdx: number = node.getParent().getIndex();
      const len: number = this.children.length();
      node.setIndex((parentIdx + len) + 1);

      this.children.add(node);

      return node;
    }

    return this.children.addToNode(node);
  }

  setIndex(idx: number): void {
    this.index = idx;
  }

  getParent(): Parent {
    return this.parent;
  }

  searchParent(id: string): Parent | null {
    if (this.getParent().getId() === this.parent.getId()) {
      return this.parent;
    }

    return this.children.searchParent(id);
  }

  getIndex(): number {
    return this.index;
  }

  getNodeValue(): NodeValue {
    return this.value;
  }
}

export class Children {
  private values: {[key: string]: Node} = {};

  add(node: Node) {
    this.values[node.getNodeValue().getId()] = node;
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

  searchParent(id: string): Parent | null {
    const keys = Object.keys(this.values);

    for (const k of keys) {
      const node = this.values[k];
      const parent: Parent = node.searchParent(id);

      if (parent) return parent;
    }

    return null;
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
    }

    return this.children.addToNode(node);
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

  asParent(): Parent {
    return new Parent(this.id, this.getIndex(), this.value.copy());
  }
}
