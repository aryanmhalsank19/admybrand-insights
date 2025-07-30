import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, TrendingUp, TrendingDown, Lightbulb, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Campaign {
  id: number;
  name: string;
  channel: string;
  clicks: number;
  ctr: number;
  spend: number;
  conversions: number;
  revenue: number;
  status: string;
}

interface AIInsightsProps {
  campaigns: Campaign[];
  className?: string;
}

interface Insight {
  id: string;
  type: 'suggestion' | 'alert' | 'opportunity';
  title: string;
  description: string;
  campaign?: string;
  impact: 'high' | 'medium' | 'low';
  action?: string;
}

export function AIInsights({ campaigns, className }: AIInsightsProps) {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [topCampaigns, setTopCampaigns] = useState<Campaign[]>([]);
  const [currentInsightIndex, setCurrentInsightIndex] = useState(0);

  useEffect(() => {
    // Generate AI insights based on campaign data
    const generateInsights = () => {
      const newInsights: Insight[] = [];
      
      // Find underperforming campaigns
      const lowCTRCampaigns = campaigns.filter(c => c.ctr < 2.5);
      lowCTRCampaigns.forEach(campaign => {
        newInsights.push({
          id: `ctr-${campaign.id}`,
          type: 'alert',
          title: 'Low CTR Detected',
          description: `${campaign.name} has a CTR of ${campaign.ctr}% - consider refreshing ad creative`,
          campaign: campaign.name,
          impact: 'medium',
          action: 'Optimize Creative'
        });
      });

      // Find high performing opportunities
      const highROASCampaigns = campaigns.filter(c => (c.revenue / c.spend) > 3);
      highROASCampaigns.forEach(campaign => {
        newInsights.push({
          id: `roas-${campaign.id}`,
          type: 'opportunity',
          title: 'Scale Opportunity',
          description: `${campaign.name} shows strong ROAS - consider increasing budget`,
          campaign: campaign.name,
          impact: 'high',
          action: 'Increase Budget'
        });
      });

      // General suggestions
      newInsights.push({
        id: 'general-1',
        type: 'suggestion',
        title: 'Cross-Channel Strategy',
        description: 'Email campaigns showing 5.4% CTR - consider expanding to similar audiences on Meta',
        impact: 'medium',
        action: 'Expand Reach'
      });

      setInsights(newInsights);
    };

    // Get top 3 performing campaigns
    const sortedCampaigns = [...campaigns]
      .sort((a, b) => (b.revenue / b.spend) - (a.revenue / a.spend))
      .slice(0, 3);
    
    setTopCampaigns(sortedCampaigns);
    generateInsights();
  }, [campaigns]);

  useEffect(() => {
    // Auto-rotate insights every 5 seconds
    if (insights.length > 1) {
      const interval = setInterval(() => {
        setCurrentInsightIndex((prev) => (prev + 1) % insights.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [insights.length]);

  const getInsightIcon = (type: Insight['type']) => {
    switch (type) {
      case 'alert': return <TrendingDown className="h-4 w-4" />;
      case 'opportunity': return <TrendingUp className="h-4 w-4" />;
      case 'suggestion': return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getInsightColor = (type: Insight['type']) => {
    switch (type) {
      case 'alert': return 'text-warning bg-warning/10 border-warning/20';
      case 'opportunity': return 'text-success bg-success/10 border-success/20';
      case 'suggestion': return 'text-primary bg-primary/10 border-primary/20';
    }
  };

  const getImpactColor = (impact: Insight['impact']) => {
    switch (impact) {
      case 'high': return 'text-destructive bg-destructive/10 border-destructive/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-muted-foreground bg-muted border-border';
    }
  };

  const currentInsight = insights[currentInsightIndex];

  return (
    <div className={cn("space-y-4", className)}>
      {/* AI Smart Suggestions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="border-0 bg-gradient-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <Brain className="h-4 w-4 text-primary" />
              AI Insights
            </CardTitle>
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              <Zap className="h-3 w-3 mr-1" />
              Smart
            </Badge>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              {currentInsight && (
                <motion.div
                  key={currentInsight.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-3"
                >
                  <div className="flex items-start gap-3">
                    <Badge variant="secondary" className={cn("shrink-0", getInsightColor(currentInsight.type))}>
                      {getInsightIcon(currentInsight.type)}
                      <span className="ml-1 capitalize">{currentInsight.type}</span>
                    </Badge>
                    <Badge variant="outline" className={cn("shrink-0", getImpactColor(currentInsight.impact))}>
                      {currentInsight.impact.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-foreground mb-1">{currentInsight.title}</h4>
                    <p className="text-sm text-muted-foreground">{currentInsight.description}</p>
                  </div>

                  {currentInsight.action && (
                    <Button size="sm" variant="outline" className="text-xs">
                      {currentInsight.action}
                    </Button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {insights.length > 1 && (
              <div className="flex gap-1 mt-4">
                {insights.map((_, index) => (
                  <motion.div
                    key={index}
                    className={cn(
                      "h-1 rounded-full transition-colors",
                      index === currentInsightIndex ? "bg-primary" : "bg-muted"
                    )}
                    initial={{ width: 0 }}
                    animate={{ width: index === currentInsightIndex ? 16 : 8 }}
                    transition={{ duration: 0.3 }}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Top Performing Campaigns Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card className="border-0 bg-gradient-card">
          <CardHeader>
            <CardTitle className="text-base font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-success" />
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topCampaigns.map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center justify-between p-2 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                      index === 0 ? "bg-yellow-500/20 text-yellow-700" :
                      index === 1 ? "bg-gray-500/20 text-gray-700" :
                      "bg-orange-500/20 text-orange-700"
                    )}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{campaign.name}</p>
                      <p className="text-xs text-muted-foreground">{campaign.channel}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">
                      ${campaign.revenue.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {((campaign.revenue / campaign.spend) || 0).toFixed(1)}x ROAS
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}