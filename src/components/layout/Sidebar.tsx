import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  BarChart3, 
  Settings, 
  Download, 
  TrendingUp,
  Users,
  DollarSign,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: BarChart3,
    description: "Overview & Analytics"
  },
  {
    name: "Campaigns",
    href: "/campaigns",
    icon: Target,
    description: "Manage Campaigns"
  },
  {
    name: "Revenue",
    href: "/revenue",
    icon: DollarSign,
    description: "Revenue Analytics"
  },
  {
    name: "Users",
    href: "/users",
    icon: Users,
    description: "User Analytics"
  },
  {
    name: "Performance",
    href: "/performance",
    icon: TrendingUp,
    description: "Performance Metrics"
  }
];

const secondaryNavigation = [
  {
    name: "Export Data",
    href: "/export",
    icon: Download,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  }
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:pt-16 lg:border-r lg:bg-card">
      <div className="flex flex-1 flex-col overflow-y-auto px-4 py-6">
        {/* Primary Navigation */}
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={cn(
                  "group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-4 w-4 transition-colors duration-200",
                    isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                  )}
                />
                <div className="flex-1">
                  <div className="font-medium">{item.name}</div>
                  <div className={cn(
                    "text-xs",
                    isActive ? "text-primary-foreground/80" : "text-muted-foreground"
                  )}>
                    {item.description}
                  </div>
                </div>
              </NavLink>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="my-6 border-t border-border"></div>

        {/* Secondary Navigation */}
        <nav className="space-y-1">
          {secondaryNavigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={cn(
                  "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <item.icon
                  className={cn(
                    "mr-3 h-4 w-4",
                    isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                  )}
                />
                {item.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Bottom CTA */}
        <div className="mt-auto pt-6">
          <div className="rounded-lg bg-gradient-primary p-4 text-center">
            <h3 className="text-sm font-semibold text-primary-foreground">
              Upgrade to Pro
            </h3>
            <p className="mt-1 text-xs text-primary-foreground/80">
              Get advanced analytics and unlimited exports
            </p>
            <Button
              size="sm"
              variant="secondary"
              className="mt-3 w-full bg-white/20 hover:bg-white/30 text-primary-foreground border-0"
            >
              Upgrade Now
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}