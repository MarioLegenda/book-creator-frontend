import deepcopy from 'deepcopy';

/**
 * @param {string} id
 * @param {number} index
 * @param value
 * @constructor
 */
export function NodeValue(
  id,
  index,
  value
) {
  function getId() {
    return id;
  }

  function getIndex() {
    return index;
  }

  function getValue() {
    return value;
  }

  this.getId = getId;
  this.getIndex = getIndex;
  this.getNodeValue = getValue;
}

export function Parent(id, index, value) {
  function getId() {
    return id;
  }

  function getIndex() {
    return index;
  }

  function getValue() {
    return value;
  }

  this.getId = getId;
  this.getIndex = getIndex;
  this.getNodeValue = getValue;
}

/**
 *
 * @param {Children} children
 * @param {string} parent
 * @param {NodeValue} value
 * @constructor
 */
export function Node(
  children,
  parent,
  value,
) {
  const c = deepcopy(children);
  const v = deepcopy(value);

  function getParent() {
    return parent;
  }

  function getNodeValue() {
    return v;
  }

  this.getParent = getParent;
  this.getNodeValue = getNodeValue;
}

function Children() {
  const values = {};

  function add(node) {
    values[node.getNodeValue().getId()] = node;
  }

  function _dump() {
    return values;
  }

  this.add = add;
  this._dump = _dump;
}

/**
 *
 * @param {string} id
 * @param {Children} children
 * @constructor
 */
export function Root(
  id,
  children,
) {
  const c = deepcopy(children);

  function add(node) {
    if (node.getParent() === id) {
      c.add(node);
    }
  }

  function get(id) {
    if (id === id) {
      return c;
    }
  }

  this.add = add;
  this.get = get;
}
