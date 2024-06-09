"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/layout/resizable";
import Header from "./header/header";
import Sidebar from "./sidebar/sidebar";
import { RefObject, useEffect, useRef } from "react";
import { atom, useAtom } from "jotai";
import { searchDialogContentAtom } from "../dialog/search";
import { configurationCompiler } from "@/lib/utils/ui";
import configuration from "../../../configuration/configuration";
import { ImperativePanelHandle } from "react-resizable-panels";

export interface PageRegisterType {
  [key: string]: { url?: string; label: string }[];
}

// pageId : path definition
export const pageRegisterAtom = atom<PageRegisterType>({});
export const pageIdAtom = atom<string>(configuration.defaultPage);
export const sidebarColapsedAtom = atom(false);

export function Layout({ children }: { children: React.ReactNode }) {
  const [, setSearchDialogContent] = useAtom(searchDialogContentAtom);
  const [, setPageRegister] = useAtom(pageRegisterAtom);

  // const [sidebarDialogContent] = useAtom(searchDialogContentAtom);

  const sidebarPanelRef = useRef<ImperativePanelHandle>(null);

  const collapsePanel = () => {
    const sidebarPanel = sidebarPanelRef.current;
    if (sidebarPanel) {
      sidebarPanel.collapse();
    }
  };

  useEffect(() => {
    const res = configurationCompiler();
    setSearchDialogContent(res.dialog);
    setPageRegister(res.register);
  }, [setSearchDialogContent, setPageRegister]);

  return (
    <div className="flex grow w-screen h-screen flex-row">
      <ResizablePanelGroup direction="horizontal" autoSaveId={'layout-general-split-sidebar'}>
        <ResizablePanel
          maxSize={40}
          defaultSize={18}
          collapsedSize={0}
          minSize={10}
          collapsible
          ref={sidebarPanelRef}
        >
          <Sidebar collapseTrigger={collapsePanel} />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel className="flex grow flex-col">
          <Header />
          {children}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
