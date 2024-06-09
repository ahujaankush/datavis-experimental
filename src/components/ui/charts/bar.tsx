"use client";

import {
  BarChart as Chart,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  Label,
  XAxis,
} from "recharts";
import { ScaleType } from "recharts/types/util/types";
import { v4 as uuidv4 } from "uuid";
import { GenericChartProps, XAxisProps } from "./chart";

const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#ff3860"];

export default function BarChart({
  data,
  xAxis,
  yAxis,
  scale,
}: {
  data: object[];
  xAxis: XAxisProps;
  yAxis: (GenericChartProps & { stackId?: string | number })[];
  scale?: ScaleType;
}) {
  return (
    <ResponsiveContainer width="99%" height="100%">
      <Chart
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: 10,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxis.dataKey} spacing={10}>
          <Label position="insideBottom" offset={-10} value={xAxis.label} />
        </XAxis>
        <YAxis scale={scale} axisLine={false} fontSize={12} tickLine={false} />
        <Tooltip />
        <Legend verticalAlign="top" />
        {yAxis.map((e, i) => {
          return (
            <Bar
              key={`barchart-${uuidv4()}-${i}`}
              radius={[4, 4, 0, 0]}
              dataKey={e.dataKey}
              name={e.name}
              stroke={e.strokeColor || colors.at(i % colors.length)}
              fill={e.strokeColor || colors.at(i % colors.length)}
              strokeWidth={e.strokeWidth}
              unit={e.unit}
              stackId={e.stackId}
            />
          );
        })}
      </Chart>
    </ResponsiveContainer>
  );
}
