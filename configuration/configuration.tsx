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
          title: "Interpretation",
          description: "",
          icon: <></>,
          id: "interpretation"
        },
        {
          title: "EU",
          description: "",
          icon: <></>,
          content: [
            {
              title: "Collected",
              description: "",
              icon: <></>,
              id: "eu/collected",
            },
            {
              title: "Treated",
              description: "",
              icon: <></>,
              id: "eu/treated",
            },
          ],
        },
      ],
    },
    {
      title: "Country",
      pages: [
        {
          title: "Austria",
          description: "",
          id: "austria",
          icon: <></>,
        },
        {
          title: "Germany",
          description: "",
          id: "germany",
          icon: <></>,
        },
        {
          title: "Czech",
          description: "",
          id: "czech",
          icon: <></>,
        },
        {
          title: "France",
          description: "",
          id: "france",
          icon: <></>,
        },
        {
          title: "Italy",
          description: "",
          id: "italy",
          icon: <></>,
        },
      ],
    },
  ],
};

export default configuration;
