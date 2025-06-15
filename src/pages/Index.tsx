import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import HeaderSection from "@/components/sections/HeaderSection";
import HeroSection from "@/components/sections/HeroSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CtaSection from "@/components/sections/CtaSection";
import FooterSection from "@/components/sections/FooterSection";
import Chatbot from "@/components/chatbot/Chatbot";

const Index = () => {
  // State and hooks for authentication, navigation, and user feedback
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Handle user action: redirect or prompt for authentication
  const handleGetStarted = async () => {
    if (isAuthenticated) {
      navigate("/mood-input");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        toast({
          title: "Authentication Required",
          description:
            "Please create an account or sign in to access RepeatHarmony features.",
        });
      }, 0);
    }, 1000);
  };

  // Smoothly scroll to features section and provide feedback
  const handleLearnMore = () => {
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth" });
    }

    setTimeout(() => {
      toast({
        title: "Learn about our features",
        description:
          "Discover how RepeatHarmony can help improve your mental wellness.",
      });
    }, 0);
  };

  // Handle feature exploration, redirecting authenticated users or showing prompt
  const handleFeatureExplore = (featureType: string) => {
    if (!isAuthenticated) {
      setTimeout(() => {
        toast({
          title: "Sign in Required",
          description: "Create a free account to explore this feature.",
          variant: "destructive",
        });
      }, 0);
      return;
    }

    switch (featureType) {
      case "mood-tracking":
        navigate("/mood-input");
        break;
      case "ai-therapy":
        navigate("/therapy");
        break;
      case "music-healing":
        navigate("/mood-music");
        break;
      case "community":
        navigate("/forum");
        break;
      default:
        navigate("/dashboard");
    }

    setTimeout(() => {
      toast({
        title: "Feature Access",
        description: `Exploring ${featureType.replace("-", " ")} features.`,
      });
    }, 0);
  };

  // Handle dashboard view, redirecting authenticated users or showing prompt
  const handleDashboardView = () => {
    if (!isAuthenticated) {
      setTimeout(() => {
        toast({
          title: "Authentication Required",
          description: "Sign in to view your personalized dashboard.",
          variant: "destructive",
        });
      }, 0);
      return;
    }

    navigate("/dashboard");
    setTimeout(() => {
      toast({
        title: "Dashboard Preview",
        description: "View your wellness analytics and progress.",
      });
    }, 0);
  };

  // Handle newsletter signup and provide feedback
  const handleNewsletterSignup = (email: string) => {
    if (email) {
      setTimeout(() => {
        toast({
          title: "Newsletter Subscription",
          description: "Thank you for subscribing to RepeatHarmony updates!",
        });
      }, 0);
      return true;
    }
    return false;
  };

  // Handle testimonial click and provide feedback
  const handleTestimonialClick = (author: string) => {
    setTimeout(() => {
      toast({
        title: "User Testimonial",
        description: `Read more success stories from ${author} and others.`,
      });
    }, 0);
  };

  // Main page layout with all sections and AI-powered chatbot
  return (
    <div className="min-h-screen bg-slate-950">
      <HeaderSection />
      <HeroSection
        onGetStarted={handleGetStarted}
        onLearnMore={handleLearnMore}
        isLoading={isLoading}
      />
      <FeaturesSection onFeatureExplore={handleFeatureExplore} />
      <HowItWorksSection onViewDashboard={handleDashboardView} />
      <TestimonialsSection onTestimonialClick={handleTestimonialClick} />
      <CtaSection onGetStarted={handleGetStarted} isLoading={isLoading} />
      <FooterSection onNewsletterSignup={handleNewsletterSignup} />
      <Chatbot />
    </div>
  );
};

export default Index;
