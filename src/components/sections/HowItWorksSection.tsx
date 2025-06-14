import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, BarChart3, Users, Clock, TrendingUp } from "lucide-react";

interface HowItWorksSectionProps {
  onViewDashboard: () => void;
}

const HowItWorksSection = ({ onViewDashboard }: HowItWorksSectionProps) => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Mock data for the animated chart
  const weeklyData = [
    [60, 45, 70, 55, 80, 75, 65],
    [55, 70, 65, 80, 75, 85, 78],
    [65, 75, 80, 70, 85, 88, 82],
    [70, 80, 85, 90, 88, 92, 87],
  ];

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWeek((prev) => (prev + 1) % weeklyData.length);
        setIsAnimating(false);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleDashboardClick = () => {
    setIsAnimating(true);
    setTimeout(() => {
      onViewDashboard();
      setIsAnimating(false);
    }, 300);
  };

  return (
    <section className="py-24 px-6 bg-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <Badge
                variant="secondary"
                className="bg-blue-600/20 text-blue-300 mb-4"
              >
                How It Works
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                How RepeatHarmony Works
              </h2>
              <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                RepeatHarmony simplifies emotional tracking and therapeutic
                guidance. Our advanced AI analyzes your mood input, providing
                personalized insights and recommending strategies to foster
                mental well-being. Experience a journey towards emotional
                balance.
              </p>
            </div>

            {/* Process Steps */}
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Track Your Mood
                  </h3>
                  <p className="text-slate-400">
                    Input your feelings through text, voice, or facial
                    recognition.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    AI Analysis
                  </h3>
                  <p className="text-slate-400">
                    Our AI processes your input and identifies patterns in your
                    emotional state.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    Get Recommendations
                  </h3>
                  <p className="text-slate-400">
                    Receive personalized therapy suggestions, music, and
                    community support.
                  </p>
                </div>
              </div>
            </div>

            <Button
              size="lg"
              onClick={handleDashboardClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200 group"
              disabled={isAnimating}
            >
              <Play className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
              {isAnimating ? "Loading..." : "View Your Dashboard"}
            </Button>
          </div>

          {/* Interactive Dashboard Preview */}
          <div className="relative">
            <Card className="bg-slate-700 border-slate-600 p-6 shadow-2xl transform hover:scale-105 transition-all duration-300">
              {/* Mock Dashboard */}
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-600 pb-4">
                  <h3 className="text-2xl font-semibold text-white">
                    Your Dashboard
                  </h3>
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                    <div
                      className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    <div
                      className="w-3 h-3 bg-green-400 rounded-full animate-pulse"
                      style={{ animationDelay: "1s" }}
                    ></div>
                  </div>
                </div>

                {/* Animated Mood Chart */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-medium text-white">
                      Weekly Mood Trends
                    </h4>
                    <Badge
                      variant="outline"
                      className="border-green-500 text-green-400"
                    >
                      Week {currentWeek + 1}
                    </Badge>
                  </div>
                  <div className="bg-slate-600 rounded-lg p-4 h-32 flex items-end justify-center space-x-2">
                    {/* Animated Chart Bars */}
                    {weeklyData[currentWeek].map((height, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center space-y-1 flex-1"
                      >
                        <div
                          className={`bg-gradient-to-t from-blue-600 to-blue-400 rounded-t transition-all duration-1000 ease-in-out ${
                            isAnimating ? "scale-y-50 opacity-50" : ""
                          }`}
                          style={{
                            height: isAnimating ? "50%" : `${height}%`,
                            width: "100%",
                            maxWidth: "24px",
                          }}
                        ></div>
                        <span className="text-xs text-slate-400">
                          {daysOfWeek[index]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Stats with Real-time Updates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-600 rounded-lg p-4 text-center hover:bg-slate-500 transition-colors cursor-pointer">
                    <div className="text-2xl font-bold text-green-400 flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 mr-1" />
                      {85 + currentWeek * 2}%
                    </div>
                    <div className="text-sm text-slate-400">Wellness Score</div>
                  </div>
                  <div className="bg-slate-600 rounded-lg p-4 text-center hover:bg-slate-500 transition-colors cursor-pointer">
                    <div className="text-2xl font-bold text-blue-400 flex items-center justify-center">
                      <Clock className="w-6 h-6 mr-1" />
                      {12 + currentWeek * 3}
                    </div>
                    <div className="text-sm text-slate-400">Days Streak</div>
                  </div>
                </div>

                {/* Recent Activity with Live Updates */}
                <div className="space-y-3">
                  <h4 className="text-lg font-medium text-white">
                    Recent Activities
                  </h4>
                  <div className="space-y-2">
                    {[
                      {
                        activity: "Meditation Session",
                        time: `${2 + currentWeek} hours ago`,
                        color: "bg-purple-500",
                      },
                      {
                        activity: "Mood Check-in",
                        time: `${4 + currentWeek} hours ago`,
                        color: "bg-blue-500",
                      },
                      {
                        activity: "Therapy Session",
                        time: `${1 + currentWeek} day ago`,
                        color: "bg-green-500",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-3 bg-slate-600 rounded p-3 hover:bg-slate-500 transition-colors"
                      >
                        <div
                          className={`w-3 h-3 rounded-full ${item.color} animate-pulse`}
                        ></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium text-white">
                            {item.activity}
                          </div>
                          <div className="text-xs text-slate-400">
                            {item.time}
                          </div>
                        </div>
                        <BarChart3 className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Elements */}
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white flex-1"
                  >
                    <Users className="w-4 h-4 mr-1" />
                    Join Forum
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white flex-1"
                  >
                    <Play className="w-4 h-4 mr-1" />
                    Play Music
                  </Button>
                </div>
              </div>
            </Card>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
            <div
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
