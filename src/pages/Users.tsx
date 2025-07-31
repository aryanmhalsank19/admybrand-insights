import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricCard } from "@/components/ui/metric-card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Users as UsersIcon, UserPlus, Activity } from "lucide-react";
import { motion } from "framer-motion";
import usersData from "@/data/users.json";

export function Users() {
  const [segmentFilter, setSegmentFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");

  const filteredSegments = usersData.userSegments.filter(segment => {
    const matchesSegment = segmentFilter === "all" || segment.segmentName.toLowerCase().includes(segmentFilter.toLowerCase());
    const matchesRegion = regionFilter === "all" || segment.region === regionFilter;
    return matchesSegment && matchesRegion;
  });

  const uniqueRegions = [...new Set(usersData.userSegments.map(segment => segment.region))];

  return (
    <div className="min-h-screen bg-gradient-bg p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h1 className="text-3xl font-bold text-foreground">User Analytics</h1>
          <p className="text-muted-foreground">Monitor user growth and segment performance</p>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <MetricCard
            title="Total Users"
            value={usersData.summary.totalUsers}
            icon={<UsersIcon className="h-4 w-4" />}
            formatter={(val: number) => val.toLocaleString()}
            trend="up"
            change={8.2}
          />
          <MetricCard
            title="Active Users"
            value={usersData.summary.activeUsers}
            icon={<Activity className="h-4 w-4" />}
            formatter={(val: number) => val.toLocaleString()}
            trend="up"
            change={12.5}
          />
          <MetricCard
            title="New Users This Month"
            value={usersData.summary.newUsersThisMonth}
            icon={<UserPlus className="h-4 w-4" />}
            formatter={(val: number) => val.toLocaleString()}
            trend="up"
            change={15.3}
          />
        </motion.div>

        {/* User Growth Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>User Growth Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{
                users: { label: "Users", color: "hsl(var(--primary))" }
              }} className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={usersData.userGrowthOverTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `${(value/1000)}K`} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar 
                      dataKey="users" 
                      fill="hsl(var(--primary))" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Filters for User Segments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Select value={segmentFilter} onValueChange={setSegmentFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by segment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Segments</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="free">Free</SelectItem>
              <SelectItem value="enterprise">Enterprise</SelectItem>
              <SelectItem value="mobile">Mobile</SelectItem>
              <SelectItem value="web">Web</SelectItem>
              <SelectItem value="trial">Trial</SelectItem>
            </SelectContent>
          </Select>
          <Select value={regionFilter} onValueChange={setRegionFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by region" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Regions</SelectItem>
              {uniqueRegions.map((region) => (
                <SelectItem key={region} value={region}>{region}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </motion.div>

        {/* User Segments Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>User Segments</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Segment Name</TableHead>
                    <TableHead>Count</TableHead>
                    <TableHead>Average CTR</TableHead>
                    <TableHead>Region</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSegments.map((segment) => (
                    <TableRow key={segment.id}>
                      <TableCell className="font-medium">{segment.segmentName}</TableCell>
                      <TableCell>{segment.count.toLocaleString()}</TableCell>
                      <TableCell>{segment.averageCtr}%</TableCell>
                      <TableCell>{segment.region}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        {filteredSegments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">No user segments found matching your filters.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}