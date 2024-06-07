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
            <Bar
              key={`barchart-${uuidv4()}-${i}`}
              dataKey={e.dataKey}
              name={e.name}
              stroke={e.strokeColor}
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
