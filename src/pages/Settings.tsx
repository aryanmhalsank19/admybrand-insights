import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import { Moon, Sun, User, Shield, Bell, Download, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";

export function Settings() {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const { user, setUserRole } = useUser();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
    monthly: true
  });

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    toast({
      title: "Settings updated",
      description: "Your notification preferences have been saved.",
    });
  };

  const handleRoleToggle = () => {
    const newRole = user.role === 'admin' ? 'viewer' : 'admin';
    setUserRole(newRole);
    toast({
      title: "Role updated",
      description: `You are now logged in as ${newRole}.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Page Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-foreground animate-fade-in">
            Settings
          </h1>
          <p className="text-muted-foreground animate-fade-in">
            Manage your account preferences and application settings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile & Role */}
          <Card className="lg:col-span-2 border-0 bg-gradient-card animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile & Permissions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Current Role</Label>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={user.role === 'admin' ? 'default' : 'secondary'}
                      className={user.role === 'admin' ? 'bg-primary' : ''}
                    >
                      <Shield className="h-3 w-3 mr-1" />
                      {user.role === 'admin' ? 'Administrator' : 'Viewer'}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {user.role === 'admin' 
                      ? 'Full access to all features and settings'
                      : 'Read-only access to dashboard and reports'
                    }
                  </p>
                </div>
                <Switch
                  checked={user.role === 'admin'}
                  onCheckedChange={handleRoleToggle}
                />
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Account Information</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <Label className="text-muted-foreground">Name</Label>
                    <p className="font-medium">John Doe</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Email</Label>
                    <p className="font-medium">john@admybrand.com</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Team</Label>
                    <p className="font-medium">Marketing Analytics</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Last Login</Label>
                    <p className="font-medium">2 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Theme Settings */}
          <Card className="border-0 bg-gradient-card animate-slide-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="text-sm font-medium">Theme</Label>
                  <p className="text-xs text-muted-foreground">
                    Choose your preferred theme
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="w-20"
                >
                  {theme === "dark" ? (
                    <>
                      <Sun className="h-4 w-4 mr-1" />
                      Light
                    </>
                  ) : (
                    <>
                      <Moon className="h-4 w-4 mr-1" />
                      Dark
                    </>
                  )}
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Color Scheme</Label>
                <div className="grid grid-cols-3 gap-2">
                  {['Blue', 'Green', 'Purple'].map((color) => (
                    <Button
                      key={color}
                      variant={color === 'Blue' ? 'default' : 'outline'}
                      size="sm"
                      className="text-xs"
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications */}
        <Card className="border-0 bg-gradient-card animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Delivery Method</h4>
                {[
                  { key: 'email' as const, label: 'Email notifications', description: 'Receive updates via email' },
                  { key: 'push' as const, label: 'Push notifications', description: 'Browser push notifications' }
                ].map(({ key, label, description }) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">{label}</Label>
                      <p className="text-xs text-muted-foreground">{description}</p>
                    </div>
                    <Switch
                      checked={notifications[key]}
                      onCheckedChange={() => handleNotificationChange(key)}
                    />
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Frequency</h4>
                {[
                  { key: 'weekly' as const, label: 'Weekly reports', description: 'Summary of weekly performance' },
                  { key: 'monthly' as const, label: 'Monthly insights', description: 'Detailed monthly analysis' }
                ].map(({ key, label, description }) => (
                  <div key={key} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <Label className="text-sm font-medium">{label}</Label>
                      <p className="text-xs text-muted-foreground">{description}</p>
                    </div>
                    <Switch
                      checked={notifications[key]}
                      onCheckedChange={() => handleNotificationChange(key)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data & Export */}
        <Card className="border-0 bg-gradient-card animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Data & Export
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="justify-start">
                Export Dashboard (PDF)
              </Button>
              <Button variant="outline" className="justify-start">
                Download Campaign Data (CSV)
              </Button>
              <Button variant="outline" className="justify-start">
                Export All Analytics (JSON)
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Export your data in various formats for reporting and analysis.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}