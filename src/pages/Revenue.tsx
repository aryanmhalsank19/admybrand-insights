import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/ui/metric-card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { DollarSign, TrendingUp, Target } from "lucide-react";
import { motion } from "framer-motion";
import revenueData from "@/data/revenue.json";

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--accent))', 'hsl(var(--muted))', 'hsl(var(--destructive))'];

export function Revenue() {
  return (
    <div className="min-h-screen bg-gradient-bg p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h1 className="text-3xl font-bold text-foreground">Revenue Analytics</h1>
          <p className="text-muted-foreground">Track your revenue performance and growth metrics</p>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <MetricCard
            title="Total Revenue"
            value={revenueData.summary.totalRevenue}
            icon={<DollarSign className="h-4 w-4" />}
            formatter={(val: number) => `₹${val.toLocaleString()}`}
            trend="up"
            change={15.2}
          />
          <MetricCard
            title="Monthly Growth"
            value={revenueData.summary.monthlyGrowth}
            icon={<TrendingUp className="h-4 w-4" />}
            formatter={(val: number) => `${val}%`}
            trend="up"
            change={8.3}
          />
          <MetricCard
            title="Active Campaigns"
            value={revenueData.summary.activeCampaigns}
            icon={<Target className="h-4 w-4" />}
            trend="up"
            change={12.5}
          />
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend (Last 6 Months)</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{
                  revenue: { label: "Revenue", color: "hsl(var(--primary))" }
                }} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData.revenueOverTime}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `₹${(value/1000)}K`} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        dot={{ fill: "hsl(var(--primary))" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Revenue by Platform */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Platform</CardTitle>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{
                  revenue: { label: "Revenue", color: "hsl(var(--primary))" }
                }} className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={revenueData.revenueByPlatform}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ platform, percentage }) => `${platform} (${percentage}%)`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="revenue"
                      >
                        {revenueData.revenueByPlatform.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip 
                        content={<ChartTooltipContent 
                          formatter={(value) => [`₹${Number(value).toLocaleString()}`, "Revenue"]}
                        />} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Revenue per Campaign Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Revenue per Campaign</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign Name</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>CTR</TableHead>
                    <TableHead>CPM</TableHead>
                    <TableHead>Conversion Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {revenueData.campaignRevenue.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">{campaign.name}</TableCell>
                      <TableCell>₹{campaign.revenue.toLocaleString()}</TableCell>
                      <TableCell>{campaign.ctr}%</TableCell>
                      <TableCell>₹{campaign.cpm}</TableCell>
                      <TableCell>{campaign.conversionRate}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}