"use client";

import { ChevronsLeftIcon, HomeIcon, SettingsIcon } from "lucide-react";
import { Button } from "@/components/ui/basic/button";
import { CandlestickChartIcon } from "lucide-react";
import { Heading3, Paragraph } from "@/components/ui/typography/heading";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/display/avatar";
import configuration from "../../../../configuration/configuration";
import { SidebarNavigation } from "./navigation";

function Logo() {
  return (
    <div className="flex gap-x-2 items-center">
      <CandlestickChartIcon className="w-8 h-8" />
      <Heading3 className="font-medium text-3-lg">DataVis</Heading3>
    </div>
  );
}

function Branding({ collapseTrigger }: { collapseTrigger: Function }) {
  return (
    <div className="flex items-center h-14 py-2">
      <div className="flex grow justify-self-start">
        <Logo />
      </div>
      <div className="flex justify-self-end">
        <Button
          onClick={() => collapseTrigger()}
          variant="ghost"
          className="h-6 w-6 p-1"
        >
          <ChevronsLeftIcon />
        </Button>
      </div>
    </div>
  );
}

function ContentProviderBadge() {
  return (
    <div className="flex items-center py-2 mt-2">
      <div className="flex grow gap-x-2 items-center justify-self-start">
        <Avatar className="h-7 w-7">
          <AvatarImage src={configuration.logo} />
          <AvatarFallback>Logo</AvatarFallback>
        </Avatar>
        <Paragraph className="block p-0 !mt-0">{configuration.title}</Paragraph>
      </div>
      <div className="flex justify-self-end">
        <Button variant="ghost" className="h-6 w-6 p-1">
          <SettingsIcon />
        </Button>
      </div>
    </div>
  );
}

export default function Sidebar({
  collapseTrigger,
}: {
  collapseTrigger: Function;
}) {
  return (
    <div className="flex flex-col grow h-full w-full px-5 bg-secondary/100">
      <Branding collapseTrigger={collapseTrigger} />
      <ContentProviderBadge />
      <SidebarNavigation categories={configuration.categories} />
    </div>
  );
}
