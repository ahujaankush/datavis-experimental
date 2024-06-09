"use client";

import {
  AreaChart as Chart,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  XAxis,
  Label,
} from "recharts";
import { ScaleType } from "recharts/types/util/types";
import { v4 as uuidv4 } from "uuid";
import { GenericChartProps, XAxisProps } from "./chart";
import { CurveType } from "recharts/types/shape/Curve";

const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#ff3860"];

export default function AreaChart({
  data,
  xAxis,
  yAxis,
  scale,
}: {
  data: object[];
  xAxis: XAxisProps;
  yAxis: (GenericChartProps & {
    type?: CurveType;
    stackId?: string | number;
  })[];
  scale?: ScaleType;
}) {
  return (
      <ResponsiveContainer width="99%" height="99%">
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
          <XAxis dataKey={xAxis.dataKey} spacing={10} className="!fg-primary">
            <Label position="insideBottom" offset={-10} value={xAxis.label} />
          </XAxis>
          <YAxis
            scale={scale}
            axisLine={false}
            fontSize={12}
            tickLine={false}
          />
          <Tooltip />
          <Legend verticalAlign="top" />
          {yAxis.map((e, i) => {
            return (
              <Area
                key={`areachart-${uuidv4()}-${i}`}
                dataKey={e.dataKey}
                type={e.type}
                name={e.name}
                fill={e.strokeColor || colors.at(i % colors.length)}
                stroke={e.strokeColor || colors.at(i % colors.length)}
                strokeWidth={e.strokeWidth}
                unit={e.unit}
                activeDot={{ r: 8 }}
                stackId={e.stackId}
              />
            );
          })}
        </Chart>
      </ResponsiveContainer>
  );
}
