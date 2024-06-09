"use client"

import { ScaleType } from "recharts/types/util/types";

export type XAxisProps = {
  dataKey: string;
  label?: string;
  tickCount?: number;
  scale?: ScaleType;
};

export type GenericChartProps = {
  dataKey: string;
  name?: string
  strokeWidth?: number;
  strokeColor?: string;
  unit?: string;
};
