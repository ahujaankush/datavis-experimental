import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import configuration, {
  Category,
  Page,
} from "../../../configuration/configuration";
import {
  SearchDialogContentType,
  SearchDialogPageType,
} from "@/components/dialog/search";
import { PageRegisterType } from "@/components/layout/layout";
import { register } from "module";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

// Reduces multi dimensional configuration tree different formats
// @Effect: Configuration doesn't need a new "recursive" mapping for each component
export function configurationCompiler() {
  let result: {
    dialog: SearchDialogContentType[];
    sidebar: React.ReactNode[];
    register: PageRegisterType;
  } = {
    dialog: [],
    sidebar: [],
    register: {},
  };

  configuration.categories.map((e) => {
    let local: {
      dialog: SearchDialogPageType[];
      sidebar: React.ReactNode[];
      register: PageRegisterType;
    } = { dialog: [], sidebar: [], register: result.register };

    pageRecursion(e.pages, local);

    result.dialog.push({ title: e.title, content: local.dialog });
  });

  return result;
}

// Utility method for `configurationCompiler`
export function pageRecursion(
  pages: Page[],
  result: {
    dialog: SearchDialogPageType[];
    sidebar: React.ReactNode[];
    register: PageRegisterType;
  },
  dump: { label: string; url?: string }[] = [],
) {
  pages.forEach((e) => {
    const newDump = [...dump, { label: e.title, url: e.id }];
    if (e.id) {
      result.dialog.push({
        icon: e.icon,
        title:
          dump.map((e) => e.label).join("/") +
          (dump.length > 0 ? "/" : "") +
          e.title,
        url: e.id,
      });
      result.register[e.id] = newDump;
    }

    console.log(result);

    if (e.content) {
      pageRecursion(e.content, result, newDump);
    }
  });
}
