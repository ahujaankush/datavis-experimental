"use client";

import { pageIdAtom } from "@/components/layout/layout";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import configuration from "../../../configuration/configuration";
import Content, { ParsedXMLType } from "@/components/layout/content/content";

export default function Home({ params }: { params: { id: string[] } }) {
  const [, setPageId] = useAtom(pageIdAtom);
  const [pageDefinition, setPageDefinition] = useState<ParsedXMLType[]>([]);

  useEffect(() => {
    let url = decodeURI(params.id?.join("/")) || configuration.defaultPage;
    setPageId(url);
    fetch(`/api/handler/static/page?location=${url}.xml`)
      .then((e) => e.json())
      .then((e) => {
        console.log(e.data.elements);
        setPageDefinition(e.data.elements);
      });
  }, [params, setPageId]);

  return (
    <main className="flex grow">
      <Content content={pageDefinition} />
    </main>
  );
}
