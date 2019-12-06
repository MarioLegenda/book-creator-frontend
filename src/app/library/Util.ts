export default class Util {
  static is(type, val) {
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

  static ucFirst (str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
