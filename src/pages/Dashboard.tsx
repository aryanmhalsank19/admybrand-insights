import { useState, useEffect } from "react";
import { MetricCard } from "@/components/ui/metric-card";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { ChannelChart } from "@/components/charts/ChannelChart";
import { TrafficChart } from "@/components/charts/TrafficChart";
import { CampaignTable } from "@/components/tables/CampaignTable";
import { TimeFilter, TimeRange } from "@/components/filters/TimeFilter";
import { AIInsights } from "@/components/ai/AIInsights";
import { DollarSign, Users, Target, TrendingUp, MousePointer } from "lucide-react";
import { motion } from "framer-motion";
import { useUser } from "@/contexts/UserContext";

// Import mock data
import metricsData from "@/data/metrics.json";
import campaignsData from "@/data/campaigns.json";
import trafficData from "@/data/traffic.json";

export function Dashboard() {
  const { user, hasPermission } = useUser();
  const [metrics, setMetrics] = useState(metricsData);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<TimeRange>('7d');

  // Simulate real-time data updates
  useEffect(() => {
    setIsLoading(false);
    
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        revenue: {
          ...prev.revenue,
          current: prev.revenue.current + Math.floor(Math.random() * 1000) - 500
        },
        users: {
          ...prev.users,
          current: prev.users.current + Math.floor(Math.random() * 20) - 10
        }
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleTimeRangeChange = (range: TimeRange, customDates?: { from: Date; to: Date }) => {
    setTimeRange(range);
    // In a real app, you would filter data based on the selected range
    console.log('Time range changed to:', range, customDates);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-bg p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="h-24 bg-muted/50 rounded-lg animate-pulse"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
        >
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {user.name}
            </h1>
            <p className="text-muted-foreground">
              Track your marketing performance and campaign insights
            </p>
          </div>
          <TimeFilter 
            selectedRange={timeRange} 
            onRangeChange={handleTimeRangeChange}
            className="shrink-0"
          />
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 metric-cards"
        >
          {[
            {
              title: "Total Revenue",
              value: metrics.revenue.current,
              change: metrics.revenue.change,
              trend: metrics.revenue.trend as 'up' | 'down',
              icon: <DollarSign className="h-4 w-4" />,
              formatter: (val: number) => `$${val.toLocaleString()}`
            },
            {
              title: "Active Users",
              value: metrics.users.current,
              change: metrics.users.change,
              trend: metrics.users.trend as 'up' | 'down',
              icon: <Users className="h-4 w-4" />
            },
            {
              title: "Conversions",
              value: metrics.conversions.current,
              change: metrics.conversions.change,
              trend: metrics.conversions.trend as 'up' | 'down',
              icon: <Target className="h-4 w-4" />
            },
            {
              title: "Click Rate",
              value: metrics.ctr.current,
              change: metrics.ctr.change,
              trend: metrics.ctr.trend as 'up' | 'down',
              icon: <MousePointer className="h-4 w-4" />,
              formatter: (val: number) => `${val.toFixed(1)}%`
            },
            {
              title: "Growth Rate",
              value: metrics.growth.current,
              change: metrics.growth.change,
              trend: metrics.growth.trend as 'up' | 'down',
              icon: <TrendingUp className="h-4 w-4" />,
              formatter: (val: number) => `${val.toFixed(1)}%`
            }
          ].map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
            >
              <MetricCard {...metric} />
            </motion.div>
          ))}
        </motion.div>

        {/* AI Insights & Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <AIInsights campaigns={campaignsData as any} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="lg:col-span-2 xl:col-span-3"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="lg:col-span-2 revenue-chart">
                <RevenueChart data={trafficData.revenueOverTime} />
              </div>
              <div className="traffic-chart">
                <TrafficChart data={trafficData.sources} />
              </div>
              <div>
                <ChannelChart data={trafficData.channelPerformance} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Campaign Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="campaign-table"
        >
          <CampaignTable data={campaignsData as any} />
        </motion.div>
      </div>
    </div>
  );
}