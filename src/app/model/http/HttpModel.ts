import {BlogState} from "../../logic/BlogState";

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
    internalName: string,
    comment: string,
  ) {
    return {
      data: {
        pageUuid,
        blockUuid,
        text,
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
    cover: string,
  ) {
    return {
      data: {
        uuid,
        title,
        description,
        cover,
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
    text: string,
  ) {
    return {
      data: {
        pageUuid: pageUuid,
        blockUuid: blockUuid,
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

  static createQuoteBlock(
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
    text: string,
  ) {
    return {
      data: {
        pageUuid: pageUuid,
        blockUuid: blockUuid,
        text: text,
      }
    }
  }

  static updateQuoteBlock(
    pageUuid: string,
    blockUuid: string,
    text: string,
  ) {
    return {
      data: {
        pageUuid: pageUuid,
        blockUuid: blockUuid,
        text: text,
      }
    }
  }

  static remoteLog(
    data: any,
  ) {
    return {
      data: data,
    }
  }

  static renameDirectoryModel(
    codeProjectUuid: string,
    name: string,
    directoryId: string,
    depth: number,
    newName: string,
  ) {
    return {
      data: {
        codeProjectUuid,
        name,
        directoryId,
        depth,
        newName,
      }
    }
  }

  static createDirectoryModel(
    codeProjectUuid: string,
    name: string,
    parent: string,
    isRoot: boolean,
  ) {
    return {
      data: {
        codeProjectUuid,
        name,
        parent,
        isRoot,
      }
    }
  }

  static newFileModel(
    codeProjectUuid: string,
    name: string,
    directoryId: string,
    content: string,
  ) {
    return {
      data: {
        codeProjectUuid,
        name,
        directoryId,
        content,
      }
    }
  }

  static renameFileModel(
    name: string,
    fileId: string,
    codeProjectUuid: string,
    directoryId: string,
    newName: string,
  ) {
    return {
      data: {
        name,
        fileId,
        codeProjectUuid,
        directoryId,
        newName,
      }
    }
  }

  static removeDirectoryModel(
    codeProjectUuid: string,
    directoryId: string,
  ) {
    return {
      data: {
        codeProjectUuid,
        directoryId,
      }
    }
  }

  static updateFileContentModel(
    codeProjectUuid: string,
    fileId: string,
    content: string,
  ) {
    return {
      data: {
        codeProjectUuid,
        fileId,
        content,
      },
    }
  }

  static searchDirsAndFiles(
    codeProjectUuid: string,
    searchTerm: string,
  ) {
    return {
      data: {
        codeProjectUuid,
        searchTerm,
      }
    }
  }

  static buildAndRunProject(
    content: string,
    state: string,
    executionType: string = 'private'
  ) {
    return {
      data: {
        content,
        state,
        executionType,
      }
    }
  }

  static updateAccount(
    uuid: string,
    name: string,
    lastName: string,
    profile: object,
  ) {
    return {
      data: {
        uuid: uuid,
        name: name,
        lastName: lastName,
        profile: profile,
      }
    }
  }

  static buildAndRunSingleFile(
    blogUuid: string,
    blockUuid: string,
    code: string,
    environment: string,
    state: string,
    executionType: string = 'private',
  ) {
    return {
      data: {
        blogUuid,
        blockUuid,
        code,
        environment,
        state,
        executionType,
      }
    }
  }

  static getNextBlog(
    uuids: string[],
    searchTerm: string = null,
  ) {
    return {
      data: {
        uuids: uuids,
        searchTerm: searchTerm,
      }
    }
  }

  static getNextCodeProject(
    uuids: string[],
    searchTerm: string = null,
  ) {
    return {
      data: {
        uuids: uuids,
        searchTerm: searchTerm,
      }
    }
  }

  static publish(
    uuid: string,
    hashtags: string[],
  ) {
    return {
      data: {
        state: BlogState.PUBLISHED,
        uuid: uuid,
        hashtags: hashtags,
      }
    }
  }

  static change(
    uuid: string,
    hashtags: string[],
  ) {
    return {
      data: {
        state: BlogState.CHANGED,
        uuid: uuid,
        hashtags: hashtags,
      }
    }
  }

  static buildState(
    state: string,
    sourceUuid: string,
    type: string,
  ) {
    return {
      data: {
        state,
        sourceUuid,
        type,
      }
    }
  }

  static verifyAccount(token: string) {
    return {
      data: {
        token: token,
      }
    }
  }

  static getActiveSubscriptions(uuids: string[]) {
    return {
      data: {
        uuids: uuids,
      }
    }
  }

  static getStripeSubscription(subscriptionId: string) {
    return {
      data: {
        subscriptionId: subscriptionId,
      }
    }
  }

  static updateSubscriptionStatus(
    uuid: string,
    status: string,
  ) {
    return {
      data: {
        uuid,
        status,
      }
    }
  }

  static cutFile(
    fileId: string,
    directoryId: string,
    codeProjectUuid: string) {
    return {
      data: {
        fileId,
        directoryId,
        codeProjectUuid,
      }
    }
  }

  static copyFile(
    fileId: string,
    directoryId: string,
    codeProjectUuid: string) {
    return {
      data: {
        fileId,
        directoryId,
        codeProjectUuid,
      }
    }
  }

  static cutDirectory(
    fromDirectoryId: string,
    toDirectoryId: string,
    codeProjectUuid,
  ) {
    return {
      data: {
        fromDirectoryId,
        toDirectoryId,
        codeProjectUuid,
      }
    };
  }

  static copyDirectory(
    fromDirectoryId: string,
    toDirectoryId: string,
    codeProjectUuid,
  ) {
    return {
      data: {
        fromDirectoryId,
        toDirectoryId,
        codeProjectUuid,
      }
    };
  }

  static removeFile(
    codeProjectUuid: string,
    fileId: string,
  ) {
    return {
      data: {
        codeProjectUuid,
        fileId,
      }
    }
  }

  static updateCodeResult(
    pageUuid: string,
    blockUuid: string,
    codeResult: string = null,
  ) {
    return {
      data: {
        pageUuid,
        blockUuid,
        codeResult,
      }
    }
  }
}
