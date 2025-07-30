import { useState, useEffect } from "react";
import { MetricCard } from "@/components/ui/metric-card";
import { RevenueChart } from "@/components/charts/RevenueChart";
import { ChannelChart } from "@/components/charts/ChannelChart";
import { TrafficChart } from "@/components/charts/TrafficChart";
import { CampaignTable } from "@/components/tables/CampaignTable";
import { DollarSign, Users, Target, TrendingUp, MousePointer } from "lucide-react";

// Import mock data
import metricsData from "@/data/metrics.json";
import campaignsData from "@/data/campaigns.json";
import trafficData from "@/data/traffic.json";

export function Dashboard() {
  const [metrics, setMetrics] = useState(metricsData);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-bg p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-24 bg-muted/50 rounded-lg animate-pulse" />
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
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground animate-fade-in">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground animate-fade-in">
            Track your marketing performance and campaign insights
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 metric-cards">
          <MetricCard
            title="Total Revenue"
            value={metrics.revenue.current}
            change={metrics.revenue.change}
            trend={metrics.revenue.trend as 'up' | 'down'}
            icon={<DollarSign className="h-4 w-4" />}
            formatter={(val) => `$${val.toLocaleString()}`}
            className="animate-slide-up"
          />
          <MetricCard
            title="Active Users"
            value={metrics.users.current}
            change={metrics.users.change}
            trend={metrics.users.trend as 'up' | 'down'}
            icon={<Users className="h-4 w-4" />}
            className="animate-slide-up"
          />
          <MetricCard
            title="Conversions"
            value={metrics.conversions.current}
            change={metrics.conversions.change}
            trend={metrics.conversions.trend as 'up' | 'down'}
            icon={<Target className="h-4 w-4" />}
            className="animate-slide-up"
          />
          <MetricCard
            title="Click Rate"
            value={metrics.ctr.current}
            change={metrics.ctr.change}
            trend={metrics.ctr.trend as 'up' | 'down'}
            icon={<MousePointer className="h-4 w-4" />}
            formatter={(val) => `${val.toFixed(1)}%`}
            className="animate-slide-up"
          />
          <MetricCard
            title="Growth Rate"
            value={metrics.growth.current}
            change={metrics.growth.change}
            trend={metrics.growth.trend as 'up' | 'down'}
            icon={<TrendingUp className="h-4 w-4" />}
            formatter={(val) => `${val.toFixed(1)}%`}
            className="animate-slide-up"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 animate-scale-in revenue-chart">
            <RevenueChart data={trafficData.revenueOverTime} />
          </div>
          <div className="animate-scale-in traffic-chart">
            <TrafficChart data={trafficData.sources} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="animate-scale-in">
            <ChannelChart data={trafficData.channelPerformance} />
          </div>
          <div className="animate-scale-in campaign-table">
            <CampaignTable data={campaignsData as any} />
          </div>
        </div>
      </div>
    </div>
  );
}