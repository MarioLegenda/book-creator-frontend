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
  private readonly index: number;

  constructor(
    private readonly children: Children,
    private parent: Parent,
    private value: NodeValue,
  ) {
    this.index = this.parent.getIndex() + 1;
  }

  getParent(): Parent {
    return this.parent;
  }

  searchParent(id: string): Parent | null {
    if (this.getParent().getId() === this.value.getId()) {
      return this.parent;
    }

    return this.children.getParent(id);
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

  getParent(id: string): Parent | null {
    const keys = Object.keys(this.values);

    for (const k of keys) {
      const node = this.values[k];
      const parent: Parent = node.searchParent(id);

      if (parent) return parent;
    }
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

  add(node: Node) {
    this.children.add(node);
  }

  getIndex(): number {
    return this.index;
  }

  getParent(id: string): Parent | null {
    if (id === this.id) {
      return this.asParent();
    }

    return this.children.getParent(id);
  }

  getNodeValue(): NodeValue {
    return this.value;
  }

  asParent(): Parent {
    return new Parent(this.id, this.getIndex(), this.value.copy());
  }
}
