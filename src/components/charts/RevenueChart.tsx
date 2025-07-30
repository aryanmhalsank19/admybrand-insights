import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { format, parseISO } from "date-fns";

interface RevenueData {
  date: string;
  revenue: number;
  users: number;
}

interface RevenueChartProps {
  data: RevenueData[];
}

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
  users: {
    label: "Users",
    color: "hsl(var(--chart-2))",
  },
};

export function RevenueChart({ data }: RevenueChartProps) {
  const [timeRange, setTimeRange] = useState("7d");
  const [chartData, setChartData] = useState(data);

  useEffect(() => {
    // Simulate different time ranges by filtering data
    const processedData = data.map(item => ({
      ...item,
      formattedDate: format(parseISO(item.date), 'MMM dd')
    }));
    setChartData(processedData);
  }, [data, timeRange]);

  return (
    <Card className="border-0 bg-gradient-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Revenue Overview</CardTitle>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="formattedDate" 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <ChartTooltip 
              content={<ChartTooltipContent 
                formatter={(value, name) => [
                  name === 'revenue' ? `$${value.toLocaleString()}` : value.toLocaleString(),
                  name === 'revenue' ? 'Revenue' : 'Users'
                ]}
              />} 
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="var(--color-revenue)"
              strokeWidth={2}
              dot={{ fill: "var(--color-revenue)", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: "var(--color-revenue)" }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}