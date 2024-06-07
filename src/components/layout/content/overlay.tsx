import {
  ContentTreeNode,
  generateLayoutPageTree,
} from "@/lib/utils/page";
import configuration from "../../../../configuration/configuration";
import { atomWithStorage } from "jotai/utils";

export const layoutPageTreeNodeAtom = atomWithStorage<ContentTreeNode>(
  "pageContent",
  generateLayoutPageTree(configuration.defaultPage),
);
