"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/lib/utils/ui";

const VaulDrawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
);
VaulDrawer.displayName = "VaulDrawer";

const VaulDrawerTrigger = DrawerPrimitive.Trigger;

const VaulDrawerPortal = DrawerPrimitive.Portal;

const VaulDrawerClose = DrawerPrimitive.Close;

const VaulDrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
));
VaulDrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const VaulDrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <VaulDrawerPortal>
    <VaulDrawerOverlay />
    <DrawerPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className,
      )}
      {...props}
    >
      <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </DrawerPrimitive.Content>
  </VaulDrawerPortal>
));
VaulDrawerContent.displayName = "DrawerContent";

const VaulDrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
);
VaulDrawerHeader.displayName = "DrawerHeader";

const VaulDrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
);
VaulDrawerFooter.displayName = "DrawerFooter";

const VaulDrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));
VaulDrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const VaulDrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
VaulDrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  VaulDrawer,
  VaulDrawerPortal,
  VaulDrawerOverlay,
  VaulDrawerTrigger,
  VaulDrawerClose,
  VaulDrawerContent,
  VaulDrawerHeader,
  VaulDrawerFooter,
  VaulDrawerTitle,
  VaulDrawerDescription,
};
