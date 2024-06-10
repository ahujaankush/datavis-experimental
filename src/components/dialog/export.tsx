"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog/dialog";
import React from "react";
import { Button } from "@/components/ui/basic/button";
import { atom, useAtom } from "jotai";
import {
  exportHandlerJPEG,
  exportHandlerPDF,
  exportHandlerPNG,
} from "@/lib/utils/export";

// Define atom for dialog visibility
export const exportDialogVisibilityAtom = atom(false);
export const exportRefAtom = atom<any>(undefined);

// ExportDialog component
export default function ExportDialog() {
  const [visibility, setVisibility] = useAtom(exportDialogVisibilityAtom);
  const [exportRef] = useAtom(exportRefAtom);

  return (
    <Dialog open={visibility} onOpenChange={setVisibility}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export page as PDF</DialogTitle>
          <DialogDescription>
            Select target file format for export
          </DialogDescription>
        </DialogHeader>
        <div className="space-x-2 justify-right flex grow">
          <Button
            onClick={() => {
              exportHandlerPDF(exportRef);
            }}
          >
            PDF
          </Button>
          <Button
            onClick={() => {
              exportHandlerPNG(exportRef);
            }}
          >
            PNG
          </Button>
          <Button
            onClick={() => {
              exportHandlerJPEG(exportRef);
            }}
          >
            JPG
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
