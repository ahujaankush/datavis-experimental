"use client";

import { Button } from "@/components/ui/basic/button";
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

function DialogTriggerWrapper({ children }: { children: React.ReactNode }) {
  return (
    <DialogTrigger
      className={cn(
        "h-auto p-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        "bg-primary hover:bg-primary/90 text-primary-foreground hover:text-primary-foreground",
        "data-[active]:bg-primary/50 data-[state=open]:bg-primary",
      )}
    >
      {children}
    </DialogTrigger>
  );
}

export default function ActionGroup() {
  return (
    <Dialog>
      <DialogTriggerWrapper>Export</DialogTriggerWrapper>
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
