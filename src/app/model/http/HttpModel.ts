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
    fileInfo: null,
    video: null,
    unsplash: null,
  ) {
    return {
      data: {
        pageUuid,
        position,
        fileInfo,
        video,
        unsplash,
      }
    }
  }

  static updateTextBlock(
    pageUuid: string,
    blockUuid: string,
    text: string,
    position: number,
    internalName: string,
    comment: string,
  ) {
    return {
      data: {
        pageUuid,
        blockUuid,
        text,
        position,
        internalName,
        comment,
      }
    }
  }

  static updateCodeBlock(
    pageUuid: string,
    blockUuid: string,
    text: string,
    isGist: boolean,
    isCode: boolean,
    gistData: any,
    emulator: any,
    position: number,
    readonly: boolean = false,
  ) {
    return {
      data: {
        pageUuid,
        blockUuid,
        text,
        readonly,
        isGist,
        isCode,
        gistData,
        emulator,
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
    position: number,
  ) {
    return {
      data: {
        pageUuid: pageUuid,
        blockUuid: blockUuid,
        fileInfo: fileInfo,
        video: video,
        unsplash: unsplash,
        position: position,
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

  static updatePosition(
    pageUuid: string,
    blockUuid: string,
    position: number,
  ) {
    return {
      data: {
        pageUuid,
        blockUuid,
        position,
      }
    }
  }

  static removeBlog(
    sourceId: string,
  ) {
    return {
      data: {
        sourceId,
      }
    }
  }

  static searchBlogs(
    pagination: object,
    searchTerm: string,
  ) {
    return {
      data: {
        pagination: pagination,
        searchTerm: searchTerm,
      }
    }
  }

  static removeCodeProject(
    codeProjectUuid: string,
  ) {
    return {
      data: {
        codeProjectUuid,
      }
    }
  }

  static searchCodeProjects(
    pagination: object,
    searchTerm: string,
  ) {
    return {
      data: {
        pagination: pagination,
        searchTerm: searchTerm,
      }
    }
  }

  static updateCodeProject(
    uuid: string,
    name: string,
    description: string,
    environment: string,
  ) {
    return {
      data: {
        codeProjectUuid: uuid,
        name: name,
        description: description,
        environment: environment,
      }
    }
  }

  static createMainHeader(
    pageUuid: string,
    position: number,
    text: string,
  ) {
    return {
      data: {
        pageUuid: pageUuid,
        position: position,
        text: text,
      }
    }
  }

  static updateMainHeader(
    pageUuid: string,
    blockUuid: string,
    position: number,
    text: string,
  ) {
    return {
      data: {
        pageUuid: pageUuid,
        blockUuid: blockUuid,
        position: position,
        text: text,
      }
    }
  }

  static createSubheader(
    pageUuid: string,
    position: number,
    text: string,
  ) {
    return {
      data: {
        pageUuid: pageUuid,
        position: position,
        text: text,
      }
    }
  }

  static updateSubheader(
    pageUuid: string,
    blockUuid: string,
    position: number,
    text: string,
  ) {
    return {
      data: {
        pageUuid: pageUuid,
        blockUuid: blockUuid,
        position: position,
        text: text,
      }
    }
  }
}
