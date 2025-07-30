import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface TrafficSource {
  name: string;
  value: number;
  sessions: number;
  color: string;
}

interface TrafficChartProps {
  data: TrafficSource[];
}

const chartConfig = {
  organic: {
    label: "Organic Search",
    color: "hsl(var(--chart-1))",
  },
  paid: {
    label: "Paid Search",
    color: "hsl(var(--chart-2))",
  },
  social: {
    label: "Social Media",
    color: "hsl(var(--chart-3))",
  },
  direct: {
    label: "Direct",
    color: "hsl(var(--chart-4))",
  },
  referral: {
    label: "Referral",
    color: "hsl(var(--chart-5))",
  },
};

export function TrafficChart({ data }: TrafficChartProps) {
  return (
    <Card className="border-0 bg-gradient-card">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Traffic Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <ChartTooltip 
              content={<ChartTooltipContent 
                formatter={(value, name, props) => [
                  `${value}% (${props.payload.sessions.toLocaleString()} sessions)`,
                  props.payload.name
                ]}
              />} 
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              formatter={(value, entry) => (
                <span style={{ color: entry.color }}>
                  {value}: {entry.payload.value}%
                </span>
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}