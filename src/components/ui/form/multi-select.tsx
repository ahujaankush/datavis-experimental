"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Badge } from "@/components/ui/display/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/utility/command";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "@/lib/utils/ui";

type MultiSelectInputType = {
  label: string;
  value: string;
  icon?: JSX.Element;
};

export function MultiSelect({
  elements,
  selected = [],
  setSelected,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  elements: MultiSelectInputType[];
  selected?: MultiSelectInputType[];
  setSelected?: (selected: MultiSelectInputType[]) => void;
  value?: string;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [selectedElements, setSelectedElements] =
    React.useState<MultiSelectInputType[]>(selected);
  const [inputValue, setInputValue] = React.useState("");

  const handleUnselect = React.useCallback((element: MultiSelectInputType) => {
    setSelectedElements((prev) =>
      prev.filter((s) => s.value !== element.value),
    );
  }, []);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            setSelectedElements((prev) => {
              const newSelected = [...prev];
              newSelected.pop();
              return newSelected;
            });
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    [],
  );

  const selectables = elements.filter(
    (element) => !selectedElements.includes(element),
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex flex-wrap gap-1">
          {selectedElements.map((element) => {
            return (
              <Badge key={element.value} variant="secondary">
                {element.label}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(element);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(element)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
            {...props}
          />
        </div>
      </div>
      {open && selectables.length > 0 ? (
        <div className="relative mt-2">
          <CommandList>
            <div
              className={cn(
                "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md",
                "animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2",
              )}
            >
              <CommandGroup className="h-full overflow-auto">
                {selectables.map((element) => {
                  return (
                    <CommandItem
                      key={element.value}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onSelect={(value) => {
                        setInputValue("");
                        setSelectedElements((prev) => {
                          let elements = [...prev, element];
                          if (setSelected) setSelected(elements);
                          return elements;
                        });
                      }}
                      className={"cursor-pointer"}
                    >
                      {element.icon}
                      {element.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </div>
          </CommandList>
        </div>
      ) : null}
    </Command>
  );
}
