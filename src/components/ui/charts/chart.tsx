"use client"

import { XAxis } from "recharts";
import { ScaleType } from "recharts/types/util/types";

export type XAxiesProps = {
  dataKey: string;
  label?: string;
  tickCount?: number;
  scale?: ScaleType;
};

export function XAxies(props: XAxiesProps) {
  return (
    <XAxis
      dataKey={props.dataKey}
      scale={props.scale}
      tickCount={props.tickCount}
      label={props.label}
    />
  );
}

export type GenericChartProps = {
  dataKey: string;
  name?: string
  strokeWidth?: number;
  strokeColor?: string;
  unit?: string;
};
