"use client"

import "../globals.css";
import { ThemeProvider } from "next-themes";
import configuration from "@/../configuration/configuration";
import { Layout } from "@/components/layout/layout";
import { Provider } from "jotai";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <Provider>
        <head />
        <body>
          <ThemeProvider
            disableTransitionOnChange
            attribute="class"
            enableSystem
            defaultTheme={configuration.userConfiguration.defaultColorMode}
          >
              <main className="datavis-selector">
                <Layout>{children}</Layout>
              </main>
          </ThemeProvider>
        </body>
      </Provider>
    </html>
  );
}
