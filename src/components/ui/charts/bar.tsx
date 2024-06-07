"use client"

import {
  BarChart as Chart,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
} from "recharts";
import { ScaleType } from "recharts/types/util/types";
import { v4 as uuidv4 } from "uuid";
import { GenericChartProps, XAxies, XAxiesProps } from "./chart";

const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#ff3860"];

export default function BarChart({
  data,
  xAxies,
  yAxies,
  scale,
}: {
  data: object[];
  xAxies: XAxiesProps;
  yAxies: (GenericChartProps & { stackId?: string | number })[];
  scale?: ScaleType;
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <Chart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxies {...xAxies} />
        <YAxis scale={scale} axisLine={false} fontSize={12} tickLine={false} />
        <Tooltip />
        <Legend />
        {yAxies.map((e, i) => {
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
