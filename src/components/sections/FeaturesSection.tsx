
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RotateCcw, Brain, Music, Users, ArrowRight } from "lucide-react";

interface FeaturesSectionProps {
  onFeatureExplore: (featureType: string) => void;
}

const features = [
  {
    icon: RotateCcw,
    title: "Intuitive Repeat Tracking",
    description:
      "Log your emotions effortlessly with quick check-ins and mood recognition. Our AI understands your feelings and guides your wellness journey.",
    cta: "Explore Repeat Logs",
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    type: "mood-tracking",
    badge: "Smart AI",
  },
  {
    icon: Brain,
    title: "Personalized AI Therapy",
    description:
      "Receive tailored therapeutic suggestions and coaching based on your unique emotional state and wellness goals.",
    cta: "Discover Therapies",
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    type: "ai-therapy",
    badge: "Personalized",
  },
  {
    icon: Music,
    title: "Music for Healing",
    description:
      "Immerse yourself in AI-curated soundscapes and therapeutic music designed to soothe your mind and uplift your spirit.",
    cta: "Find Your Sound",
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    type: "music-healing",
    badge: "Therapeutic",
  },
  {
    icon: Users,
    title: "Supportive Community Forum",
    description:
      "Connect with a compassionate community. Share experiences, find certified therapists for shared experiences and mutual support.",
    cta: "Join the Community",
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    type: "community",
    badge: "Community",
  },
];

const FeaturesSection = ({ onFeatureExplore }: FeaturesSectionProps) => {
  return (
    <section id="features" className="py-24 px-6 bg-slate-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-600/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-2 mb-6">
            <Brain className="w-4 h-4 text-blue-400" />
            <span className="text-blue-200 text-sm font-medium">
              Comprehensive Features
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Key Features of RepeatHarmony
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Discover how RepeatHarmony empowers you to understand and manage
            your emotional well-being through innovative technology and
            compassionate support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={index}
                className={`bg-slate-800 border-slate-700 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-105 group cursor-pointer relative overflow-hidden ${feature.bgColor}/5`}
                onClick={() => onFeatureExplore(feature.type)}
              >
                {/* Background gradient effect */}
                <div
                  className={`absolute inset-0 ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>

                <CardHeader className="text-center pb-4 relative z-10">
                  <div className="flex items-center justify-center mb-4">
                    <Badge
                      variant="secondary"
                      className="bg-slate-700 text-slate-300 mb-2"
                    >
                      {feature.badge}
                    </Badge>
                  </div>
                  <div
                    className={`mx-auto mb-4 p-4 bg-slate-700 rounded-full w-16 h-16 flex items-center justify-center group-hover:bg-slate-600 transition-colors ${feature.bgColor}`}
                  >
                    <IconComponent className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl font-semibold text-white mb-2 group-hover:text-blue-100 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center relative z-10">
                  <CardDescription className="text-slate-400 mb-6 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {feature.description}
                  </CardDescription>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-200 group-hover:border-slate-500 w-full group"
                  >
                    {feature.cta}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional stats section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="text-3xl font-bold text-blue-400 mb-2">50+</div>
            <div className="text-slate-300 font-medium">
              Therapeutic Techniques
            </div>
          </div>
          <div className="text-center p-6 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="text-3xl font-bold text-green-400 mb-2">1000+</div>
            <div className="text-slate-300 font-medium">
              Curated Music Tracks
            </div>
          </div>
          <div className="text-center p-6 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
            <div className="text-slate-300 font-medium">Community Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
