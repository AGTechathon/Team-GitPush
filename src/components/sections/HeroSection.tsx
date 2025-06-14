
import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles } from "lucide-react";

interface HeroSectionProps {
  onGetStarted: () => void;
  onLearnMore: () => void;
  isLoading?: boolean;
}

const HeroSection = ({
  onGetStarted,
  onLearnMore,
  isLoading = false,
}: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Animated background waves */}
      <div className="absolute inset-0 z-0">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient
              id="wave-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
              <stop offset="50%" stopColor="rgba(147, 197, 253, 0.2)" />
              <stop offset="100%" stopColor="rgba(219, 234, 254, 0.1)" />
            </linearGradient>
          </defs>
          <path
            d="M0,400 C320,300 420,600 1440,400 L1440,800 L0,800 Z"
            fill="url(#wave-gradient)"
            className="animate-pulse"
          />
          <path
            d="M0,500 C360,350 440,650 1440,500 L1440,800 L0,800 Z"
            fill="rgba(59, 130, 246, 0.2)"
            className="animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <path
            d="M0,600 C400,450 480,700 1440,600 L1440,800 L0,800 Z"
            fill="rgba(147, 197, 253, 0.1)"
            className="animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="mb-8 animate-in fade-in slide-in-from-bottom duration-1000">
          <div className="inline-flex items-center space-x-2 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-200 text-sm font-medium">
              AI-Powered Mental Wellness
            </span>
          </div>
        </div>

        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
          Find Your Inner{" "}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent animate-gradient">
            Calm
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
          RepeatHarmony is your personal AI-powered mental health companion.
          Track emotions, get personalized therapy, and find peace through
          guided experiences.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-in fade-in slide-in-from-bottom duration-1000 delay-700">
          <Button
            size="lg"
            onClick={onGetStarted}
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Starting Journey...
              </>
            ) : (
              "Get Started Free"
            )}
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={onLearnMore}
            className="border-2 border-blue-300 text-blue-100 hover:bg-blue-600 hover:text-white hover:border-blue-600 px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 group"
          >
            Learn More
            <ChevronDown className="w-5 h-5 ml-2 group-hover:translate-y-1 transition-transform" />
          </Button>
        </div>

        <div className="mt-16 animate-in fade-in slide-in-from-bottom duration-1000 delay-1000">
          <div className="flex items-center justify-center space-x-8 text-blue-200">
            <div className="text-center">
              <div className="text-2xl font-bold">10K+</div>
              <div className="text-sm opacity-80">Active Users</div>
            </div>
            <div className="w-px h-8 bg-blue-400/30"></div>
            <div className="text-center">
              <div className="text-2xl font-bold">95%</div>
              <div className="text-sm opacity-80">Success Rate</div>
            </div>
            <div className="w-px h-8 bg-blue-400/30"></div>
            <div className="text-center">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-sm opacity-80">AI Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 z-5">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-blue-300 opacity-60" />
      </div>
    </section>
  );
};

export default HeroSection;
