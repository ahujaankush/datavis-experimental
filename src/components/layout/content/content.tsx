import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/layout/resizable";
import { v4 as uuidv4 } from "uuid";
import Markdown from "markdown-to-jsx";
import AreaChart from "@/components/ui/charts/area";
import { useEffect, useState } from "react";
import BarChart from "@/components/ui/charts/bar";
import LineChart from "@/components/ui/charts/line";

export type ContentType = "text" | "chart";
export type ChartType = "area" | "bar" | "line" | "pie";
export type ContainerDirectionType = "row" | "col";

export type ParsedXMLType = {
  attributes?: any;
  elements?: ParsedXMLType[];
  text?: string;
  name: string;
  type: string;
};

export function Container({ content }: { content: ParsedXMLType }) {
  return (
    <ResizablePanelGroup
      direction={
        (content?.attributes.direction as ContainerDirectionType) === "row"
          ? "vertical"
          : "horizontal"
      }
    >
      {content.elements === undefined
        ? null
        : content.elements?.map((e, i) => {
            return (
              <>
                <ResizablePanel>
                  <Content content={[e]} key={`${uuidv4()}-${i}`} />
                </ResizablePanel>
                {i + 1 < (content.elements?.length || 0) ? (
                  <ResizableHandle />
                ) : null}
              </>
            );
          })}
    </ResizablePanelGroup>
  );
}

function combine(
  a: object[],
  b: object[],
  key: string,
  injectKey: string,
  injectedKey: string,
) {
  // externes
  a.forEach((e) => {
    let found = false;
    b.every((f, i) => {
      if (
        e[key as keyof object] &&
        f[key as keyof object] &&
        e[key as keyof object] === f[key as keyof object]
      ) {
        b[i] = { ...f, [injectKey]: e[injectedKey as keyof object] };
        found = true;
        return false;
      }
      return true;
    });
    if (!found) {
      b.push({
        [key]: e[key as keyof object],
        [injectKey as keyof object]: e[injectedKey as keyof object],
      });
    }
  });
  return b;
}

export function Chart({ content }: { content: ParsedXMLType }) {
  const [data, setData] = useState<object[]>([]);

  useEffect(() => {
    content.elements?.forEach((e) => {
      if (e.name === "data")
        fetch("/api/handler/static/data/?source=" + e.attributes.source)
          .then((res) => res.json())
          .then((res) =>
            setData((old) => {
              return combine(
                old,
              res.data,
                "year" as any,
                e.attributes.id,
                e.attributes.key,
              );
            }),
          );
    });
  }, [content.elements]);

  console.log(data);

  switch (content.attributes.type) {
    case "area":
      return (
        <AreaChart
          data={data}
          xAxies={{ dataKey: "year" }}
          yAxies={
            content.elements?.flatMap((e) => {
              if (e.name !== "item") return e;
              return e.attributes ? [{ ...e.attributes }] : e;
            }) as any
          }
        />
      );
    case "bar":
      return (
        <BarChart
          data={data}
          xAxies={{ dataKey: "year" }}
          yAxies={
            content.elements?.flatMap((e) => {
              if (e.name !== "item") return e;
              return e.attributes
                ? [{ ...e.attributes, data: data[e.attributes.id] }]
                : e;
            }) as any
          }
        />
      );
    case "line":
      return (
        <LineChart
          data={data}
          xAxies={{ dataKey: "year" }}
          yAxies={
            content.elements?.flatMap((e) => {
              if (e.name !== "item") return e;
              return e.attributes
                ? [{ ...e.attributes, data: data[e.attributes.id] }]
                : e;
            }) as any
          }
        />
      );
  }

  return <></>;
}

export default function Content({ content }: { content: ParsedXMLType[] }) {
  console.log(content);
  return (
    <>
      {content.map((e, i) => {
        switch (e.name) {
          case "container":
            return <Container content={e} />;
          case "chart":
            return <Chart content={e} />;
          case "text":
            return (
              <div className="p-8">
                <Markdown>{e?.elements?.[0].text?.trim() || ""}</Markdown>
              </div>
            );
        }
      })}
    </>
  );
}