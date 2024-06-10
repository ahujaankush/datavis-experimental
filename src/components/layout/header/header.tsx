"use client";

import ActionGroup from "./group/action";
import { Button } from "@/components/ui/basic/button";
import { CircleHelpIcon, Moon, SearchIcon, Sun } from "lucide-react";
import { searchDialogVisibilityAtom } from "@/components/dialog/search";
import { useAtom } from "jotai";
import Breadcrumbs from "./breadcrumbs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/menu/dropdown-menu";
import { useTheme } from "next-themes";
import { useTour } from "@reactour/tour";

export function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Header() {
  const [, setSearchDialogVisibility] = useAtom(searchDialogVisibilityAtom);
  const { setIsOpen: setTutorialVisibility } = useTour();

  return (
    <div className="flex px-5 border-b items-center h-14">
      <div className="flex grow justify-self-start items-center space-x-2">
        <Button
          size="icon"
          variant="outline"
          onClick={() => {
            setSearchDialogVisibility(true);
          }}
        >
          <SearchIcon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
        <Breadcrumbs />
      </div>
      <div className="flex justify-items-center space-x-2 justify-self-end">
        <Button
          size="icon"
          variant="outline"
          onClick={() => {
            setTutorialVisibility(true);
          }}
        >
          <CircleHelpIcon className="h-[1.2rem] w-[1.2rem]" />
        </Button>
        <ModeToggle />
        <ActionGroup />
      </div>
    </div>
  );
}
