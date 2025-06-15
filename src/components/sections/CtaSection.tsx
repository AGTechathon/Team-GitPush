import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, Users, Award, Shield } from "lucide-react";

// Define the props interface for CtaSection
interface CtaSectionProps {
  onGetStarted: () => void; // Callback for "Get Started" button
  isLoading?: boolean;       // Loading state for button
}

const CtaSection = ({ onGetStarted, isLoading = false }: CtaSectionProps) => {
  // State for hover effect on features
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);

  // List of key features to highlight
  const features = [
    "Free forever plan available",
    "No credit card required",
    "Start in under 2 minutes",
    "Cancel anytime",
  ];

  // List of benefits with icons, titles, and descriptions
  const benefits = [
    {
      icon: Users,
      title: "10,000+ Users",
      description: "Join our growing community",
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Best Mental Health App 2024",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your data is always secure",
    },
  ];

  return (
    <section className="py-24 px-6 bg-gradient-to-r from-blue-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background decoration: animated gradient circles for visual appeal */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Header section with badge, headline, and subheading */}
        <div className="mb-12">
          <Badge
            variant="secondary"
            className="bg-white/20 text-white mb-6 backdrop-blur-sm"
          >
            Start Your Journey
          </Badge>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
            Start Your Journey to{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
              Well-being
            </span>{" "}
            Today
          </h2>

          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Take the first step towards a calmer, more balanced life with
            RepeatHarmony. Join thousands who have transformed their mental
            wellness.
          </p>
        </div>

        {/* Main CTA Button: Triggers account setup or shows loading state */}
        <div className="mb-12">
          <Button
            size="lg"
            onClick={onGetStarted}
            disabled={isLoading}
            className="bg-white text-slate-900 hover:bg-slate-100 px-12 py-6 text-xl font-bold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:transform-none group"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-900 mr-3"></div>
                Setting up your account...
              </>
            ) : (
              <>
                Get Started Free
                <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </div>

        {/* Features List: Interactive list of key selling points */}
        <div className="mb-16">
          <div className="flex flex-wrap justify-center gap-6 text-blue-200">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 hover:text-white transition-colors cursor-pointer"
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
              >
                <Check
                  className={`w-5 h-5 text-green-400 transition-transform ${hoveredFeature === index ? "scale-110" : ""}`}
                />
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Grid: Visual cards highlighting main benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div
                key={index}
                className="text-center p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-blue-200">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        {/* Social Proof: Trust indicators from reputable organizations */}
        <div className="text-center">
          <p className="text-blue-200 mb-4">
            Trusted by mental health professionals worldwide
          </p>

          {/* Mock company logos */}
          <div className="flex justify-center items-center space-x-8 opacity-60">
            {[
              "Stanford Health",
              "Mayo Clinic",
              "Johns Hopkins",
              "UCLA Health",
            ].map((org, index) => (
              <div
                key={index}
                className="text-white/40 text-sm font-medium hover:text-white/60 transition-colors"
              >
                {org}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom disclaimer: Important legal and health information */}
        <div className="mt-16 pt-8 border-t border-white/20">
          <p className="text-sm text-blue-200 opacity-80 max-w-2xl mx-auto">
            RepeatHarmony is designed to support your mental wellness journey.
            While our AI provides valuable insights, it's not a replacement for
            professional medical advice. Please consult healthcare providers for
            serious mental health concerns.
          </p>
        </div>
      </div>

      {/* Floating elements: Decorative dots for visual interest */}
      <div
        className="absolute top-20 left-20 w-4 h-4 bg-white/20 rounded-full animate-bounce"
        style={{ animationDelay: "0s" }}
      ></div>
      <div
        className="absolute top-40 right-32 w-3 h-3 bg-blue-400/30 rounded-full animate-bounce"
        style={{ animationDelay: "1s" }}
      ></div>
      <div
        className="absolute bottom-32 left-1/4 w-5 h-5 bg-purple-400/30 rounded-full animate-bounce"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute bottom-20 right-20 w-2 h-2 bg-white/30 rounded-full animate-bounce"
        style={{ animationDelay: "3s" }}
      ></div>
    </section>
  );
};

export default CtaSection;
