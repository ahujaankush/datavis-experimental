"use client";

import { pageIdAtom } from "@/components/layout/layout";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import configuration from "../../../configuration/configuration";
import Content, { ParsedXMLType } from "@/components/layout/content/content";

export default function Home({ params }: { params: { id: string[] } }) {
  const [pageId, setPageId] = useAtom(pageIdAtom);
  const [pageDefinition, setPageDefinition] = useState<ParsedXMLType[]>([]);

  useEffect(() => {
    setPageId(decodeURI(params.id?.join("/")) || configuration.defaultPage);
  }, [params, setPageId]);

  useEffect(() => {
    if (pageId)
      fetch(`/api/handler/static/page?location=${pageId}.xml`)
        .then((e) => e.json())
        .then((e) => {
          if (e.data.elements) setPageDefinition(e.data.elements);
        });
  }, [pageId]);

  return (
    <main className="flex grow">
      <Content content={pageDefinition} />
    </main>
  );
}
