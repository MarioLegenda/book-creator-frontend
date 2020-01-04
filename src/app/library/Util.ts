export default class Util {
  static is(type: string, val) {
    const res = `[object ${Util.ucFirst(type)}]`;

    if (type === "float") {
      return val === +val && val !== (val | 0);
    }

    if (type === 'generator') {
      return /\[object Generator|GeneratorFunction\]/.test(Object.prototype.toString.call(val));
    }

    if (type.toLowerCase() === "nan") {
      return val !== val;
    }

    return Object.prototype.toString.call(val) === res;
  }

  static ucFirst (str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  static hasKey(obj: object, key: string | number): boolean {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }

  static setHeightFromWrapper(wrapper, el) {
    const width = wrapper.offsetWidth;
    const height = wrapper.offsetHeight;

    el.setAttribute('style', `width: ${width}px`);
    el.setAttribute('style', `height: ${height}px`);
  }

  static objectFilter(obj, fn) {
    const entries = Object.entries(obj);
    const filtered = {};

    for (const entry of entries) {
      const key = entry[0];
      const value = entry[1];

      const res = fn.call(null, key, value);

      if (res === true) filtered[key] = value;
    }

    return filtered;
  }
}
