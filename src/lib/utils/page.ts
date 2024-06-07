import { v4 as uuidv4 } from "uuid";

export enum Split {
  HORIZONTAL,
  VERTICAL,
}

export type ContentTreeNode = {
  content: ContentTreeNode[] | string;
  id?: string;
  split?: Split;
};

function insertPageHelper(
  node: ContentTreeNode,
  traversal: number[],
  swapped: boolean,
  newID: string,
  split: Split,
) {
  if (traversal.length === 0) {
    if (!swapped) {
      node.content = [
        {
          content: node.content,
          id: node.id,
        },
        {
          content: newID,
          id: uuidv4(),
        },
      ];
    } else {
      node.content = [
        {
          content: newID,
          id: uuidv4(),
        },
        {
          content: node.content,
          id: node.id,
        },
      ];
    }
    node.id = uuidv4();
    node.split = split;
  }

  const n = traversal.shift();
  if (n === undefined || typeof node.content[n] == "string") return;
  insertPageHelper(
    node.content[n] as ContentTreeNode,
    traversal,
    swapped,
    newID,
    split,
  );
}

function deletePageHelper(
  node: ContentTreeNode,
  traversal: number[],
  uid: string,
) {
  // one as I dont need the direct container but the parent (the node above)
  if (traversal.length === 1) {
    if (typeof node.content == "string") return;
    node.content.forEach((e, i) => {
      if (e.id === uid) {
        (node.content as ContentTreeNode[]).splice(i, 1);
        node.split = (node.content[0] as ContentTreeNode).split;
        node.id = (node.content[0] as ContentTreeNode).id;
        // NOTE: clear node at last or the previous actions cant transfer the properties -> undefined -> further operations fail !!!
        node.content = (node.content[0] as ContentTreeNode).content;
        return;
      }
    });
  }

  const n = traversal.shift();
  if (n === undefined || typeof node.content[n] == "string") return;
  deletePageHelper(node.content[n] as ContentTreeNode, traversal, uid);
}

// Not using atom as each provider manages oen content -> not global
export function insertPage(
  setTree: Function,
  traversal: number[],
  newElementPageID: string,
  split: Split,
  swapped = false,
) {
  setTree((old: ContentTreeNode) => {
    insertPageHelper(old, traversal, swapped, newElementPageID, split);
    return { ...old };
  });
}

function removePage(setTree: Function, traversal: number[], uid: string) {
  setTree((old: ContentTreeNode) => {
    deletePageHelper(old, traversal, uid);
    return { ...old };
  });
}

export function generateLayoutPageTree(content: string) {
  return {
    content: content,
    id: uuidv4(),
  };
}
