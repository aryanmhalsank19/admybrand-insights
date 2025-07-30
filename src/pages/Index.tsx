// Update this page (the content is just a fallback if you fail to update the page)

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-primary">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary-glow/20"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 sm:py-32">
          <div className="text-center space-y-8">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="h-16 w-16 rounded-2xl bg-white shadow-glow flex items-center justify-center animate-pulse-glow">
                <span className="text-2xl font-bold text-primary">A</span>
              </div>
            </div>
            
            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl font-bold text-white animate-fade-in">
                ADmyBRAND
                <span className="block text-primary-glow">Insights</span>
              </h1>
              <p className="text-xl text-white/80 max-w-2xl mx-auto animate-slide-up">
                The most powerful marketing analytics dashboard for modern businesses. 
                Track performance, optimize campaigns, and drive growth with beautiful insights.
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 animate-scale-in">
              <a 
                href="/dashboard"
                className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-lg bg-white text-primary hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-glow"
              >
                View Dashboard
              </a>
              <a 
                href="/settings"
                className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-lg border-2 border-white/30 text-white hover:bg-white/10 transition-all duration-300"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to give you complete control over your marketing analytics
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Real-time Analytics",
                description: "Monitor your campaigns with live data updates and instant insights",
                icon: "📊"
              },
              {
                title: "Beautiful Charts",
                description: "Visualize your data with stunning, interactive charts and graphs",
                icon: "📈"
              },
              {
                title: "Export Reports",
                description: "Generate PDF and CSV reports for stakeholder presentations",
                icon: "📄"
              }
            ].map((feature, index) => (
              <div 
                key={feature.title}
                className="text-center p-8 rounded-xl bg-gradient-card border border-border/50 hover:border-primary/20 transition-all duration-300 hover:scale-105 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-muted/30 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to get started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join thousands of marketers who trust ADmyBRAND Insights for their analytics needs
          </p>
          <a 
            href="/dashboard"
            className="inline-flex items-center px-8 py-4 text-lg font-medium rounded-lg bg-gradient-primary text-white hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-glow"
          >
            Start Dashboard Tour
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
