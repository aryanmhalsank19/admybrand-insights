import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/ui/metric-card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { MousePointer, Target, DollarSign, TrendingDown, Percent } from "lucide-react";
import { motion } from "framer-motion";
import performanceData from "@/data/performance.json";

export function Performance() {
  const [platformFilter, setPlatformFilter] = useState("all");
  const [campaignFilter, setCampaignFilter] = useState("all");

  const filteredCampaigns = performanceData.campaignMetrics.filter(campaign => {
    const matchesCampaign = campaignFilter === "all" || campaign.name.toLowerCase().includes(campaignFilter.toLowerCase());
    return matchesCampaign;
  });

  return (
    <div className="min-h-screen bg-gradient-bg p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Performance Analytics</h1>
            <p className="text-muted-foreground">Analyze campaign performance and optimization opportunities</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="google">Google Ads</SelectItem>
                <SelectItem value="meta">Meta Ads</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="email">Email</SelectItem>
              </SelectContent>
            </Select>
            <Select value={campaignFilter} onValueChange={setCampaignFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by campaign" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Campaigns</SelectItem>
                <SelectItem value="summer">Summer Sale</SelectItem>
                <SelectItem value="brand">Brand Awareness</SelectItem>
                <SelectItem value="product">Product Launch</SelectItem>
                <SelectItem value="newsletter">Newsletter</SelectItem>
                <SelectItem value="retargeting">Retargeting</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          <MetricCard
            title="CTR"
            value={performanceData.metrics.ctr}
            icon={<MousePointer className="h-4 w-4" />}
            formatter={(val: number) => `${val}%`}
            trend="up"
            change={8.2}
          />
          <MetricCard
            title="CPM"
            value={performanceData.metrics.cpm}
            icon={<DollarSign className="h-4 w-4" />}
            formatter={(val: number) => `₹${val}`}
            trend="down"
            change={-5.1}
          />
          <MetricCard
            title="CPC"
            value={performanceData.metrics.cpc}
            icon={<DollarSign className="h-4 w-4" />}
            formatter={(val: number) => `₹${val}`}
            trend="down"
            change={-3.2}
          />
          <MetricCard
            title="Bounce Rate"
            value={performanceData.metrics.bounceRate}
            icon={<TrendingDown className="h-4 w-4" />}
            formatter={(val: number) => `${val}%`}
            trend="down"
            change={-12.4}
          />
          <MetricCard
            title="Conversion Rate"
            value={performanceData.metrics.conversionRate}
            icon={<Percent className="h-4 w-4" />}
            formatter={(val: number) => `${val}%`}
            trend="up"
            change={15.8}
          />
        </motion.div>

        {/* CTR Comparison Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Campaign CTR Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{
                ctr: { label: "CTR", color: "hsl(var(--primary))" }
              }} className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData.campaignComparison}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="campaign" />
                    <YAxis tickFormatter={(value) => `${value}%`} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar 
                      dataKey="ctr" 
                      fill="hsl(var(--primary))" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Campaign Metrics Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Campaign Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign Name</TableHead>
                    <TableHead>Clicks</TableHead>
                    <TableHead>Impressions</TableHead>
                    <TableHead>Conversions</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>ROI (%)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCampaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell className="font-medium">{campaign.name}</TableCell>
                      <TableCell>{campaign.clicks.toLocaleString()}</TableCell>
                      <TableCell>{campaign.impressions.toLocaleString()}</TableCell>
                      <TableCell>{campaign.conversions}</TableCell>
                      <TableCell>₹{campaign.budget.toLocaleString()}</TableCell>
                      <TableCell className="text-green-600 font-semibold">{campaign.roi}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        {filteredCampaigns.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">No campaigns found matching your filters.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}