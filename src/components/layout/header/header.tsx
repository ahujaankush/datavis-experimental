"use client";

import ActionGroup from "./group/action";
import { Button } from "@/components/ui/basic/button";
import { SearchIcon } from "lucide-react";
import { searchDialogVisibilityAtom } from "@/components/dialog/search";
import { useAtom } from "jotai";
import Breadcrumbs from "./breadcrumbs";

export default function Header() {
  const [, setSearchDialogVisibility] = useAtom(searchDialogVisibilityAtom);

  return (
    <div className="flex px-5 border-b items-center h-14">
      <div className="flex grow justify-self-start items-center space-x-2">
        <Button
          variant="outline"
          className="p-1 h-7 w-7"
          onClick={() => {
            setSearchDialogVisibility(true);
          }}
        >
          <SearchIcon />
        </Button>
        <Breadcrumbs />
      </div>
      <div className="justify-self-end">
        <ActionGroup />
      </div>
    </div>
  );
}
