import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface ChannelData {
  channel: string;
  conversions: number;
  revenue: number;
}

interface ChannelChartProps {
  data: ChannelData[];
}

const chartConfig = {
  conversions: {
    label: "Conversions",
    color: "hsl(var(--chart-1))",
  },
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-2))",
  },
};

export function ChannelChart({ data }: ChannelChartProps) {
  return (
    <Card className="border-0 bg-gradient-card">
      <CardHeader>
        <CardTitle className="text-base font-semibold">Conversions by Channel</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="channel" 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <ChartTooltip 
              content={<ChartTooltipContent 
                formatter={(value, name) => [
                  name === 'conversions' ? value.toLocaleString() : `$${value.toLocaleString()}`,
                  name === 'conversions' ? 'Conversions' : 'Revenue'
                ]}
              />} 
            />
            <Bar 
              dataKey="conversions" 
              fill="var(--color-conversions)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}