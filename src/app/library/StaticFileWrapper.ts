export class StaticFileWrapper {
  static getExtension(file): string {
    const splitted = file.name.split('.');

    return splitted[splitted.length - 1];
  }

  static isJavascript(file): boolean {
    return StaticFileWrapper.getExtension(file) === 'js';
  }

  static isHtml(file): boolean {
    return StaticFileWrapper.getExtension(file) === 'html' ||
      StaticFileWrapper.getExtension(file) === 'htm';
  }

  static isJson(file): boolean {
    return StaticFileWrapper.getExtension(file) === 'json';
  }
}
