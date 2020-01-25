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

  static addMultimediaBlock(
    pageUuid: string,
    position: number,
  ) {
    return {
      data: {
        pageUuid,
        position,
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

  static createCodeProject(
    sourceId: string,
    name: string,
    description: string,
    environment: string,
    uuid: string = null,
    shortId: string = null,
  ) {
    return {
      data: {
        uuid,
        shortId,
        sourceId,
        name,
        environment,
        description,
      }
    }
  }

  static createLinkPageToBlog(
    pageUuid: string,
    sourceId: string,
  ) {
    return {
      data: {
        pageUuid,
        sourceId,
      }
    }
  }

  static createLinkCodeProject(
    codeProjectUuid: string,
    pageUuid: string,
    sourceId: string,
    blockUuid: string,
  ) {
    return {
      data: {
        codeProjectUuid,
        pageUuid,
        sourceId,
        blockUuid,
      }
    }
  }

  static unLinkCodeProject(
    codeProjectUuid: string,
    pageUuid: string,
    sourceId: string,
    blockUuid: string,
  ) {
    return {
      data: {
        codeProjectUuid,
        pageUuid,
        sourceId,
        blockUuid,
      }
    }
  }

  static uploadFile(
    pageUuid: string,
    blockUuid: string,
    imageData: any,
    file: any,
  ) {
    return {
      data: {
        pageUuid: pageUuid,
        blockUuid: blockUuid,
        imageData: imageData,
        file: file,
      }
    }
  }

  static updateMultimediaBlock(
    pageUuid: string,
    blockUuid: string,
    fileInfo: object,
    video: string,
    unsplash: string,
  ) {
    return {
      data: {
        pageUuid: pageUuid,
        blockUuid: blockUuid,
        fileInfo: fileInfo,
        video: video,
        unsplash: unsplash,
      }
    }
  }

  static removeMultimediaBlock(
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
}
