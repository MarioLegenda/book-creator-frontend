export class HttpModel {
  static addTextBlock(
    pageUuid: string,
    position: number,
  ) {
    return {
      data: {
        pageUuid: pageUuid,
        position: position,
        text: '',
      }
    }
  }

  static updateTextBlock(
    pageUuid: string,
    blockUuid: string,
    text: string,
    position: number,
  ) {
    return {
      data: {
        pageUuid,
        blockUuid,
        text,
        position,
      }
    }
  }

  static removeBlock(
    pageUuid: string,
    blockUuid: string,
  ) {
    return {
      data: {
        pageUuid,
        blockUuid,
      }
    }
  }

  static addCodeBlock(
    pageUuid: string,
    position: number,
  ) {
    return {
      data: {
        pageUuid: pageUuid,
        text: '',
        position: position,
      }
    }
  }
}
