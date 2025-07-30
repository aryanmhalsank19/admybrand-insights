import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";
import CountUp from "react-countup";

interface MetricCardProps {
  title: string;
  value: number;
  previousValue?: number;
  change?: number;
  trend?: 'up' | 'down';
  icon?: React.ReactNode;
  formatter?: (value: number) => string;
  className?: string;
}

export function MetricCard({
  title,
  value,
  previousValue,
  change,
  trend,
  icon,
  formatter = (val) => val.toLocaleString(),
  className
}: MetricCardProps) {
  const isPositive = trend === 'up';
  const changeColor = isPositive ? 'text-success' : 'text-destructive';
  const TrendIcon = isPositive ? TrendingUp : TrendingDown;

  return (
    <Card className={cn(
      "transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-0 bg-gradient-card",
      className
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className="text-muted-foreground">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-2xl font-bold text-foreground">
            <CountUp
              end={value}
              duration={2}
              formattingFn={formatter}
              preserveValue
            />
          </div>
          
          {change !== undefined && (
            <div className="flex items-center space-x-1">
              <Badge
                variant="secondary"
                className={cn(
                  "flex items-center space-x-1 px-2 py-1 text-xs",
                  isPositive 
                    ? "bg-success/10 text-success border-success/20" 
                    : "bg-destructive/10 text-destructive border-destructive/20"
                )}
              >
                <TrendIcon className="h-3 w-3" />
                <span>
                  {isPositive ? '+' : ''}{change.toFixed(1)}%
                </span>
              </Badge>
              <span className="text-xs text-muted-foreground">vs last period</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}