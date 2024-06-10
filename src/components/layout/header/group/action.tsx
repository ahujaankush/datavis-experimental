"use client";

import { exportDialogVisibilityAtom } from "@/components/dialog/export";
import { Button } from "@/components/ui/basic/button";
import { useAtom } from "jotai";

export default function ActionGroup() {
  const [visibility, setVisibility] = useAtom(exportDialogVisibilityAtom);
  return (
    <div className="flex flex-col">
      <Button onClick={() => {setVisibility(true)}}>Export</Button>
    </div>
  );
}
