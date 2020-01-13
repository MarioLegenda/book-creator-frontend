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

  static updateCodeBlock(
    pageUuid: string,
    blockUuid: string,
    text: string,
    position: number,
    isGist: boolean,
    isCode: boolean,
    gistData: any,
    emulator: any,
    readonly: boolean = false,
  ) {
    return {
      data: {
        pageUuid,
        blockUuid,
        text,
        position,
        readonly,
        isGist,
        isCode,
        gistData,
        emulator,
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

  static updateBlog(
    uuid: string,
    title: string,
    description: string,
  ) {
    return {
      data: {
        uuid,
        title,
        description,
      },
    };
  }
}
