import {IDirectory} from "../models/IDirectory";
import {Children, Node, NodeValue, Parent, Tree} from "./Tree";

export function createRootTree(directory: IDirectory): Tree {
  return new Tree(
    directory.id,
    new Children(),
    new NodeValue(directory.id, directory),
  );
}

export function createNode(fileSystemStructure: any, parent: Parent) {
  return new Node(
    new Children(),
    parent,
    new NodeValue(fileSystemStructure.id, fileSystemStructure),
  );
}

export function createParent(directory: IDirectory) {

}
