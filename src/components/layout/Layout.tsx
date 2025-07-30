import { useState, useRef, useEffect } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { OnboardingTour } from "@/components/onboarding/OnboardingTour";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [userRole, setUserRole] = useState<'admin' | 'viewer'>('admin');
  const [showTour, setShowTour] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const location = useLocation();
  const dashboardRef = useRef<HTMLDivElement>(null);

  // Check if user is new (for onboarding)
  useEffect(() => {
    const hasSeenTour = localStorage.getItem('admybrand-tour-completed');
    if (!hasSeenTour && location.pathname === '/dashboard') {
      setShowTour(true);
    }
  }, [location.pathname]);

  const handleTourComplete = () => {
    setShowTour(false);
    localStorage.setItem('admybrand-tour-completed', 'true');
  };

  const handleSettingsClick = () => {
    setShowSettings(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        userRole={userRole} 
        onSettingsClick={handleSettingsClick}
      />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1 lg:ml-64" ref={dashboardRef}>
          {children}
        </main>
      </div>

      <OnboardingTour 
        run={showTour} 
        onComplete={handleTourComplete} 
      />
    </div>
  );
}