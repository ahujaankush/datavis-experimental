import {
  AreaChart as Chart,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
} from "recharts";
import { ScaleType } from "recharts/types/util/types";
import { v4 as uuidv4 } from "uuid";
import { GenericChartProps, XAxies, XAxiesProps } from "./chart";
import { CurveType } from "recharts/types/shape/Curve";

export default function AreaChart({
  data,
  xAxies,
  yAxies,
  scale,
}: {
  data: object[];
  xAxies: XAxiesProps;
  yAxies: (GenericChartProps & {
    type?: CurveType;
    stackId?: string | number;
  })[];
  scale?: ScaleType;
}) {
  console.log(data)
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
        <YAxis scale={scale} />
        <Tooltip />
        <Legend />
        {yAxies.map((e, i) => {
          return (
            <Area
              key={`areachart-${uuidv4()}-${i}`}
              dataKey={e.dataKey}
              type={e.type}
              name={e.name}
              stroke={e.strokeColor}
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
