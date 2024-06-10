"use client";

import * as React from "react";
import { Calendar } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/utility/command";

import { atom, useAtom } from "jotai";
import configuration from "../../../configuration/configuration";
import { Dialog, DialogContent } from "../ui/dialog/dialog";
import { navigate } from "@/lib/utils/redirect";

export type SearchDialogPageType = {
  title: string;
  icon: JSX.Element;
  url: string;
};

export type SearchDialogContentType = {
  title: string;
  content: SearchDialogPageType[];
};

export const searchDialogVisibilityAtom = atom(false);
export const searchDialogContentAtom = atom<SearchDialogContentType[]>([]);

export default function SearchDialog() {
  const [open, setOpen] = useAtom(searchDialogVisibilityAtom);
  const [content] = useAtom(searchDialogContentAtom);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "j" || e.key === "/") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [setOpen]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          <CommandInput placeholder="What are you looking for?" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {content.map((e, i) => (
              <React.Fragment key={`${e.title}-${i}`}>
                <CommandGroup heading={e.title}>
                  {e.content.map((f, j) => (
                    <CommandItem
                      onSelect={() => {
                        navigate("/" + f.url);
                        setOpen(false);
                      }}
                      key={`${f.title}-${j}-${e.title}-commando-item`}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>{f.title}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
                {i + 1 < configuration.categories.length ? (
                  <CommandSeparator key={`${e.title}-seperator`} />
                ) : null}
              </React.Fragment>
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
