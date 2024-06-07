"use client"

import {
  LineChart as Chart,
  Line,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ScaleType } from "recharts/types/util/types";
import { v4 as uuidv4 } from "uuid";
import { GenericChartProps, XAxies, XAxiesProps } from "./chart";
import { CurveType } from "recharts/types/shape/Curve";

const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#ff3860"];

export default function LineChart({
  data,
  xAxies,
  yAxies,
  scale,
}: {
  data: object[];
  xAxies: XAxiesProps;
  yAxies: (GenericChartProps & {
    type?: CurveType;
  })[];
  scale?: ScaleType;
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <Chart
        data={data}
        width={500}
        height={300}
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
        {yAxies.map((e, i) => (
          <Line
            key={`linechart-${uuidv4()}-${i}`}
            type={e.type}
            dataKey={e.dataKey}
            name={e.name}
            stroke={e.strokeColor || colors.at(i % colors.length)}
            strokeWidth={e.strokeWidth}
            unit={e.unit}
            activeDot={{ r: 8 }}
          />
        ))}
      </Chart>
    </ResponsiveContainer>
  );
}
