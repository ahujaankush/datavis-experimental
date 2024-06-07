"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/menu/navigation-menu";
import { cn } from "@/lib/utils/ui";
import { DownloadIcon } from "lucide-react";
import React from "react";

function NavigationMenuTriggerWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NavigationMenuTrigger
      className={cn(
        "h-auto p-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        "bg-primary hover:bg-primary/90 text-primary-foreground hover:text-primary-foreground",
        "data-[active]:bg-primary/50 data-[state=open]:bg-primary",
      )}
    >
      {children}
    </NavigationMenuTrigger>
  );
}

function ExportActionButton() {
  return (
    <NavigationMenuItem>
      <NavigationMenuTriggerWrapper>Export</NavigationMenuTriggerWrapper>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
          <li className="row-span-3">
            <NavigationMenuLink asChild>
              <a
                className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                href="/"
              >
                <DownloadIcon className="h-6 w-6" />
                <div className="mb-2 mt-4 text-lg font-medium">shadcn/ui</div>
                <p className="text-sm leading-tight text-muted-foreground">
                  Beautifully designed components that you can copy and paste
                  into your apps. Accessible. Customizable. Open Source.
                </p>
              </a>
            </NavigationMenuLink>
          </li>
          <ListItem title="Introduction">
            Re-usable components built using Radix UI and Tailwind CSS.
          </ListItem>
          <ListItem title="Installation">
            How to install dependencies and structure your app.
          </ListItem>
          <ListItem title="Typography">
            Styles for headings, paragraphs, lists...etc
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default function ActionGroup() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-3">
        <ExportActionButton />
      </NavigationMenuList>
    </NavigationMenu>
  );
}
