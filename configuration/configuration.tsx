import { CpuIcon, PaperclipIcon } from "lucide-react";

export type Configuration = {
  title: string;
  logo: string;
  defaultPage: string;
  categories: Category[];
  userConfiguration: UserConfiguration;
};

// Defaults, will be cached for each user
export type UserConfiguration = {
  defaultColorMode?: "dark" | "light";
  homepageLink?: string;
};

// A category is a collection of pages displayed under one label -> used for further organization
export type Category = {
  title: string;
  pages: Page[];
};

// content -> may contain other elements or the id of the page to be displayed under this label
export type Page = {
  title: string;
  description: string;
  icon: JSX.Element;
  content?: Page[];
  id?: string;
};

const configuration: Configuration = {
  title: "E-Waste",
  defaultPage: "general",
  logo: "https://github.com/shadcn.png",
  userConfiguration: {
    defaultColorMode: "dark",
  },
  categories: [
    {
      title: "General",
      pages: [
        {
          title: "Austria",
          description: "",
          id: "general",
          icon: <></>,
          content: [
            {
              title: "Vienna",
              description: "",
              icon: <></>,
              content: [
                {
                  title: "20. District",
                  description: "",
                  icon: <></>,
                  id: "general",
                },
                {
                  title: "10. District",
                  description: "",
                  icon: <></>,
                  id: "general/home",
                },
              ],
            },
          ],
        },
        {
          title: "Lower Austria",
          description: "",
          icon: <></>,
          id: "Lower Austria",
        },
        {
          title: "Upper Austria",
          description: "",
          icon: <></>,
          id: "general/example",
        },
      ],
    },
  ],
};

export default configuration;
