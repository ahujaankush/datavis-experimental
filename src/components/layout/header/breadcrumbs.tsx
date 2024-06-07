"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/navigation/breadcrumb";
import { atom, useAtom } from "jotai";
import React, { useEffect } from "react";
import { pageIdAtom, pageRegisterAtom } from "../layout";

export const breadcrumbsContentAtom = atom<{ label: string; url?: string }[]>(
  [],
);

export default function Breadcrumbs() {
  const [breadcrumbsContent, setBreadcrumbsContent] = useAtom(
    breadcrumbsContentAtom,
  );
  const [pageId] = useAtom(pageIdAtom);
  const [register] = useAtom(pageRegisterAtom);

  useEffect(() => {
    setBreadcrumbsContent(register[pageId] || []);
  }, [pageId, register, setBreadcrumbsContent]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbsContent.map((e, i) => (
          <React.Fragment key={`breadcrumbs-${e}-${i}`}>
            {i + 1 < breadcrumbsContent.length ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink href={e.url ? "/" + e.url : undefined}>
                    {e.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            ) : (
              <BreadcrumbPage>{e.label}</BreadcrumbPage>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
