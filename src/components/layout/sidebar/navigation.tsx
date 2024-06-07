import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/layout/accordion";
import { useState } from "react";
import { Category, Page } from "../../../../configuration/configuration";
import { Large, Small } from "@/components/ui/typography/heading";
import React from "react";
import { cn } from "@/lib/utils/ui";
import { navigate } from "@/lib/utils/redirect";
import { Button } from "@/components/ui/basic/button";
import { PlusIcon } from "lucide-react";
import { atom, useAtom } from "jotai";
import { pageIdAtom } from "../layout";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

export const sidebarItemDraggedAtom = atom(false);
interface AccordionStateStore {
  [id: string]: string[];
}
const jotaiSessionStorage = createJSONStorage<AccordionStateStore>(
  () => sessionStorage,
);

const sidebarItemsOpenAtom = atomWithStorage(
  "sidebar-items",
  {},
  jotaiSessionStorage,
);

function SidebarButton({
  children,
  className,
  url,
  active = false,
}: {
  children: React.ReactNode;
  className: string;
  url?: string;
  active?: boolean;
}) {
  return (
    <div
      onClick={
        url
          ? () => {
              navigate("/" + url);
            }
          : undefined
      }
      className={cn(
        "flex items-center",
        active
          ? " bg-primary text-primary-foreground hover:bg-primary/90"
          : "hover:bg-accent hover:text-accent-foreground",
        url ? "cursor-pointer" : "",
        "h-9 rounded-md px-2 group",
        className,
      )}
    >
      {children}
      <Button
        variant="ghost"
        className="p-0 h-4 w-4 text-muted-foreground hidden group-hover:flex"
      >
        <PlusIcon />
      </Button>
    </div>
  );
}

export function SidebarItem(props: Page) {
  const [pageId] = useAtom(pageIdAtom);

  return (
    <AccordionItem
      value={`${props.title}-${props.content?.length}`}
      className="flex grow flex-col"
    >
      <SidebarButton
        url={props.id}
        active={pageId === props.id}
        className="flex grow space-x-1 justify-start"
      >
        {props.icon}
        <AccordionTrigger className="flex grow items-end" />
        <Large className="text-sm text-left justify-start grow">
          {props.title}
        </Large>
      </SidebarButton>
      <AccordionContent className="p-0">
        {props.content ? (
          <SidebarAccordion
            intent
            pages={props.content}
            id={`${props.title}-${props.content?.length}`}
          />
        ) : (
          <Small className="m-3 text-muted-foreground">No subpages.</Small>
        )}
      </AccordionContent>
    </AccordionItem>
  );
}

export function SidebarAccordion({
  pages,
  intent = false,
  id,
}: {
  pages: Page[];
  intent?: boolean;
  id: string;
}) {
  const [open, setOpen] = useAtom(sidebarItemsOpenAtom);

  return (
    <Accordion
      type="multiple"
      className={`*:border-0 ${intent ? "ml-3" : null} space-y-1 mt-1`}
      value={open[id]}
      onValueChange={(values) => {
        setOpen((old) => {
          old[id] = values;
          return { ...old };
        });
      }}
    >
      {pages.map((f, j) => {
        return (
          <SidebarItem
            {...f}
            key={`sidebar-parent-element-nesting-root-${j}-${f.title}-${f.id}-${f.description}`}
          />
        );
      })}
    </Accordion>
  );
}

export function SidebarNavigation({ categories }: { categories: Category[] }) {
  const [open, setOpen] = useAtom(sidebarItemsOpenAtom);
  const id = "categories";
  return (
    <Accordion
      type="multiple"
      className="flex flex-col grow"
      value={open[id]}
      onValueChange={(values) => {
        setOpen((old) => {
          old[id] = values;
          return { ...old };
        });
      }}
    >
      {categories.map((e, i) => {
        return (
          <AccordionItem
            key={`sidebar-category-${i}-${e.title}`}
            value={`${e.title}-${e.pages?.length}`}
            className="flex flex-col border-0"
          >
            <div className="flex grow flex-row space-x-1 text-muted-foreground px-2 h-9 items-center">
              <AccordionTrigger className="block h-fit p-0 "></AccordionTrigger>
              <Small className="flex justify-start grow ">{e.title}</Small>
              <Button variant="ghost" className="p-0 h-4 w-4">
                <PlusIcon />
              </Button>
            </div>
            <AccordionContent className="p-0 ml-3">
              <SidebarAccordion
                pages={e.pages}
                id={`sidebar-category-${i}-${e.title}`}
              />
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
