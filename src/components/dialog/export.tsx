import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog/dialog";
import { exportHandlerPDF } from "@/lib/utils/export";
import { cn } from "@/lib/utils/ui";
import React, { useRef } from "react";
import { Button } from "@/components/ui/basic/button";
import { atom } from "jotai";

export const exportDialogVisibilityAtom = atom(false);

export default function ExportDialog() {

return(
  <Dialog open>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Export page as PDF</DialogTitle>
        <DialogDescription>
          Select target file format for export
        </DialogDescription>
      </DialogHeader>
      <div className="space-x-2 justify-right flex grow">
        <Button>PDF</Button>
        <Button>PNG</Button>
        <Button>JPG</Button>
      </div>
    </DialogContent>
  </Dialog>
  );
}
