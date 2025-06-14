import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  Home,
  MessageSquare,
  BarChart3,
  Brain,
  Users,
  User,
  TrendingUp,
  Calendar,
  Award,
  Target,
  Music,
  Lightbulb,
  RefreshCw,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const sidebarItems = [
  { icon: Home, label: "Home", href: "/", id: "home" },
  {
    icon: MessageSquare,
    label: "Repeat Input",
    href: "/mood-input",
    id: "repeat-input",
  },
  { icon: BarChart3, label: "Dashboard", href: "/dashboard", id: "dashboard" },
  { icon: Brain, label: "Therapy", href: "/therapy", id: "therapy" },
  { icon: Users, label: "Forum", href: "/forum", id: "forum" },
];

const badges = [
  {
    title: "First Insight",
    description: "Received your first personalized insight.",
    icon: "🎯",
    color: "bg-blue-600",
    unlocked: true,
  },
  {
    title: "Mindful Master",
    description: "Completed 7 mindfulness sessions.",
    icon: "🧘",
    color: "bg-purple-600",
    unlocked: true,
  },
  {
    title: "Repeat Tracker",
    description: "Tracked mood for 7 consecutive days.",
    icon: "📊",
    color: "bg-green-600",
    unlocked: true,
  },
  {
    title: "Community Contributor",
    description: "Made 3 helpful posts in the forum.",
    icon: "👥",
    color: "bg-orange-600",
    unlocked: true,
  },
  {
    title: "Music Explorer",
    description: "Listened to 10 unique therapy tracks.",
    icon: "🎵",
    color: "bg-pink-600",
    unlocked: false,
  },
  {
    title: "Growth Seeker",
    description: "Identified 5 positive emotional trends.",
    icon: "🌱",
    color: "bg-emerald-600",
    unlocked: true,
  },
  {
    title: "Calm Creator",
    description: "Successfully used calming techniques.",
    icon: "🌊",
    color: "bg-cyan-600",
    unlocked: false,
  },
  {
    title: "Empathy Ambassador",
    description: "Provided support to 5 community members.",
    icon: "💙",
    color: "bg-indigo-600",
    unlocked: false,
  },
];

interface DashboardData {
  weeklyData: number[];
  happyDays: number;
  calmMoments: number;
  streak: number;
  insightText: string;
  currentPlaylist: string;
}

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    weeklyData: [60, 45, 70, 55, 80, 75, 65],
    happyDays: 18,
    calmMoments: 42,
    streak: 25,
    insightText:
      "You tend to feel more content after engaging in creative activities. Consider journaling or drawing this week!",
    currentPlaylist: "Calm Focus Playlist",
  });
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState<
    "7d" | "30d" | "90d"
  >("7d");

  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const refreshData = async () => {
    setIsRefreshing(true);

    // Simulate API call
    setTimeout(() => {
      setDashboardData((prev) => ({
        ...prev,
        weeklyData: prev.weeklyData.map((val) =>
          Math.max(20, Math.min(100, val + (Math.random() - 0.5) * 20)),
        ),
        happyDays: prev.happyDays + Math.floor(Math.random() * 3),
        calmMoments: prev.calmMoments + Math.floor(Math.random() * 5),
      }));

      setIsRefreshing(false);
      toast({
        title: "Dashboard Updated",
        description: "Your latest mood data has been synchronized.",
      });
    }, 2000);
  };

  const handleBadgeClick = (badge: any) => {
    if (badge.unlocked) {
      toast({
        title: badge.title,
        description: badge.description,
      });
    } else {
      toast({
        title: "Badge Locked",
        description: `Complete more activities to unlock "${badge.title}".`,
        variant: "destructive",
      });
    }
  };

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "record":
        navigate("/mood-input");
        break;
      case "therapy":
        navigate("/therapy");
        break;
      case "forum":
        navigate("/forum");
        break;
      case "music":
        navigate("/mood-music");
        break;
    }
  };

  const timeRangeData = {
    "7d": { label: "7 Days", data: dashboardData.weeklyData },
    "30d": {
      label: "30 Days",
      data: Array.from(
        { length: 30 },
        () => Math.floor(Math.random() * 40) + 40,
      ),
    },
    "90d": {
      label: "90 Days",
      data: Array.from(
        { length: 90 },
        () => Math.floor(Math.random() * 40) + 35,
      ),
    },
  };

  const currentData = timeRangeData[selectedTimeRange];

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">RepeatHarmony</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.href;

              return (
                <li key={item.id}>
                  <Link
                    to={item.href}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-slate-400 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-slate-800">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-sm">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">John Doe</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Your Emotional Dashboard
              </h1>
              <p className="text-slate-400 text-lg">
                Overview of your mood trends and wellness progress.
              </p>
            </div>
            <Button
              onClick={refreshData}
              disabled={isRefreshing}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
              />
              {isRefreshing ? "Syncing..." : "Refresh Data"}
            </Button>
          </div>

          {/* Weekly Trends Chart */}
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-white text-xl">
                  Weekly Repeat Trends
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Your average mood progression over the selected period.
                </CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                {Object.entries(timeRangeData).map(([key, value]) => (
                  <Button
                    key={key}
                    variant={selectedTimeRange === key ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTimeRange(key as any)}
                    className={
                      selectedTimeRange === key
                        ? "bg-blue-600"
                        : "border-slate-600 text-slate-300"
                    }
                  >
                    {value.label}
                  </Button>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-slate-900 rounded-lg flex items-end justify-center p-6">
                {/* Dynamic Chart */}
                <div className="w-full flex items-end justify-between space-x-2 h-40">
                  {currentData.data
                    .slice(
                      0,
                      selectedTimeRange === "7d"
                        ? 7
                        : selectedTimeRange === "30d"
                          ? 15
                          : 10,
                    )
                    .map((value, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center space-y-2 flex-1 group cursor-pointer"
                      >
                        <div
                          className="bg-gradient-to-t from-blue-600 to-blue-400 rounded-t w-full transition-all duration-1000 hover:from-blue-500 hover:to-blue-300"
                          style={{ height: `${value}%` }}
                          onClick={() => {
                            toast({
                              title: "Mood Details",
                              description: `${selectedTimeRange === "7d" ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index] : `Day ${index + 1}`}: ${value}% wellness score`,
                            });
                          }}
                        ></div>
                        <span className="text-xs text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          {selectedTimeRange === "7d"
                            ? ["M", "T", "W", "T", "F", "S", "S"][index]
                            : index + 1}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
              <div className="flex justify-between items-center mt-4 text-sm text-slate-400">
                <span>Neutral</span>
                <Button
                  variant="outline"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  View Full Report
                </Button>
                <span>Joyful</span>
              </div>
            </CardContent>
          </Card>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Happy Days */}
            <Card
              className="bg-slate-800 border-slate-700 cursor-pointer hover:border-slate-600 transition-colors"
              onClick={() => handleQuickAction("record")}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {dashboardData.happyDays}
                    </p>
                    <p className="text-sm text-slate-400 mt-1">days</p>
                    <p className="text-slate-300 font-medium">
                      Happy Days This Month
                    </p>
                    <p className="text-green-400 text-xs mt-2">+5%</p>
                    <p className="text-slate-500 text-xs">
                      Compared to previous month.
                    </p>
                  </div>
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Calm Moments */}
            <Card
              className="bg-slate-800 border-slate-700 cursor-pointer hover:border-slate-600 transition-colors"
              onClick={() => handleQuickAction("therapy")}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-white">
                      {dashboardData.calmMoments}
                    </p>
                    <p className="text-sm text-slate-400 mt-1">entries</p>
                    <p className="text-slate-300 font-medium">
                      Calm Moments Recorded
                    </p>
                    <p className="text-blue-400 text-xs mt-2">+12%</p>
                    <p className="text-slate-500 text-xs">
                      Compared to previous week.
                    </p>
                  </div>
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Target className="w-4 h-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Insight */}
            <Card
              className="bg-slate-800 border-slate-700 cursor-pointer hover:border-slate-600 transition-colors"
              onClick={() => handleQuickAction("therapy")}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <Lightbulb className="w-4 h-4 text-white" />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-400 hover:text-white"
                  >
                    <span className="text-xs">View Details</span>
                  </Button>
                </div>
                <p className="text-slate-300 font-medium">
                  Your Recent Insight
                </p>
                <p className="text-slate-400 text-sm mt-2">
                  {dashboardData.insightText}
                </p>
              </CardContent>
            </Card>

            {/* Music Recommendation */}
            <Card
              className="bg-slate-800 border-slate-700 cursor-pointer hover:border-slate-600 transition-colors"
              onClick={() => handleQuickAction("music")}
            >
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <Music className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      {dashboardData.currentPlaylist}
                    </p>
                    <p className="text-slate-400 text-sm">RepeatHarmony AI</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 w-full"
                >
                  Play Now
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Streak Counter */}
            <Card className="bg-gradient-to-br from-purple-900 to-blue-900 border-slate-700">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <p className="text-4xl font-bold text-white mb-2">
                  {dashboardData.streak}
                </p>
                <p className="text-blue-200 font-medium mb-4">
                  Days of consistent mood tracking!
                </p>
                <Button
                  variant="outline"
                  className="border-purple-400 text-purple-200 hover:bg-purple-800"
                  onClick={() => {
                    toast({
                      title: "Streak History",
                      description: `Your longest streak was ${dashboardData.streak + 8} days!`,
                    });
                  }}
                >
                  View Streak History
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Quick Actions</CardTitle>
                <CardDescription className="text-slate-400">
                  Jump back into key tasks.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700"
                  onClick={() => handleQuickAction("record")}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Record New Repeat
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700"
                  onClick={() => handleQuickAction("therapy")}
                >
                  <Brain className="w-4 h-4 mr-2" />
                  Explore Therapy Suggestions
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700"
                  onClick={() => handleQuickAction("forum")}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Visit Community Forum
                </Button>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-white">
                    Your Repeat Badges
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Achievements for your consistent mood tracking.
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-400 hover:text-blue-300"
                  onClick={() => {
                    const unlockedCount = badges.filter(
                      (b) => b.unlocked,
                    ).length;
                    toast({
                      title: "Badge Collection",
                      description: `You've unlocked ${unlockedCount} out of ${badges.length} badges!`,
                    });
                  }}
                >
                  View all badges
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-3">
                  {badges.slice(0, 8).map((badge, index) => (
                    <div
                      key={index}
                      className="text-center group cursor-pointer"
                      onClick={() => handleBadgeClick(badge)}
                    >
                      <div
                        className={`w-12 h-12 ${badge.unlocked ? badge.color : "bg-slate-600"} rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition-transform ${!badge.unlocked && "opacity-50"}`}
                      >
                        <span className="text-lg">{badge.icon}</span>
                      </div>
                      <p
                        className={`text-xs ${badge.unlocked ? "text-slate-300 group-hover:text-white" : "text-slate-500"} transition-colors`}
                      >
                        {badge.title}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
