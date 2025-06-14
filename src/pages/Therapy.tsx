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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  Home,
  MessageSquare,
  BarChart3,
  Brain,
  Users,
  User,
  Lightbulb,
  Clock,
  Heart,
  Headphones,
  BookOpen,
  Moon,
  Waves,
  Play,
  CheckCircle,
  Pause,
  RotateCcw,
  Target,
  Zap,
  Volume2,
  VolumeX,
  Timer,
  Download,
  Share,
  Star,
  Calendar,
  Award,
  TrendingUp,
  Smile,
  Frown,
  Meh,
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

interface TherapySession {
  id: string;
  title: string;
  description: string;
  duration: number;
  type: "meditation" | "breathing" | "cognitive" | "journaling";
  difficulty: "beginner" | "intermediate" | "advanced";
  completed: boolean;
  rating?: number;
}

interface JournalEntry {
  id: string;
  date: string;
  prompt: string;
  content: string;
  mood: "happy" | "neutral" | "sad";
}

const Therapy = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  // State management
  const [activeTab, setActiveTab] = useState<
    "overview" | "sessions" | "tools" | "progress"
  >("overview");
  const [therapyProgress, setTherapyProgress] = useState({
    sessionsCompleted: 7,
    techniquesLearned: 3,
    wellnessStreak: 14,
    totalHours: 12.5,
  });

  // Meditation player state
  const [meditationPlayer, setMeditationPlayer] = useState({
    isPlaying: false,
    currentTime: 0,
    duration: 600, // 10 minutes
    volume: 75,
    isMuted: false,
    currentSession: null as TherapySession | null,
  });

  // Breathing exercise state
  const [breathingExercise, setBreathingExercise] = useState({
    isActive: false,
    phase: "inhale" as "inhale" | "hold" | "exhale",
    timer: 4,
    cycle: 0,
    totalCycles: 10,
  });

  // Journaling state
  const [journaling, setJournaling] = useState({
    currentPrompt: "What are three things you're grateful for today?",
    content: "",
    mood: "neutral" as "happy" | "neutral" | "sad",
    entries: [] as JournalEntry[],
  });

  // Therapy sessions data
  const [therapySessions] = useState<TherapySession[]>([
    {
      id: "1",
      title: "Mindful Breathing",
      description:
        "Learn to center yourself with conscious breathing techniques",
      duration: 10,
      type: "breathing",
      difficulty: "beginner",
      completed: true,
      rating: 5,
    },
    {
      id: "2",
      title: "Body Scan Meditation",
      description: "Progressive relaxation through body awareness",
      duration: 15,
      type: "meditation",
      difficulty: "beginner",
      completed: true,
      rating: 4,
    },
    {
      id: "3",
      title: "Cognitive Restructuring",
      description: "Challenge and reframe negative thought patterns",
      duration: 20,
      type: "cognitive",
      difficulty: "intermediate",
      completed: false,
    },
    {
      id: "4",
      title: "Gratitude Journaling",
      description: "Cultivate positivity through reflective writing",
      duration: 15,
      type: "journaling",
      difficulty: "beginner",
      completed: false,
    },
    {
      id: "5",
      title: "Advanced Mindfulness",
      description: "Deep meditation for experienced practitioners",
      duration: 30,
      type: "meditation",
      difficulty: "advanced",
      completed: false,
    },
  ]);

  // Meditation timer effect
  useEffect(() => {
    if (meditationPlayer.isPlaying && meditationPlayer.currentSession) {
      const interval = setInterval(() => {
        setMeditationPlayer((prev) => {
          if (prev.currentTime >= prev.duration) {
            // Session completed
            setTimeout(() => {
              toast({
                title: "Meditation Complete!",
                description: "Great job! Your session has been recorded.",
              });
            }, 0);
            return { ...prev, isPlaying: false, currentTime: 0 };
          }
          return { ...prev, currentTime: prev.currentTime + 1 };
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [meditationPlayer.isPlaying, toast]);

  // Breathing exercise timer
  useEffect(() => {
    if (breathingExercise.isActive) {
      const interval = setInterval(() => {
        setBreathingExercise((prev) => {
          if (prev.timer <= 1) {
            let newPhase = prev.phase;
            let newCycle = prev.cycle;

            switch (prev.phase) {
              case "inhale":
                newPhase = "hold";
                break;
              case "hold":
                newPhase = "exhale";
                break;
              case "exhale":
                newPhase = "inhale";
                newCycle = prev.cycle + 1;
                break;
            }

            if (newCycle >= prev.totalCycles) {
              setTimeout(() => {
                toast({
                  title: "Breathing Exercise Complete!",
                  description: "You've completed your breathing session.",
                });
              }, 0);
              return {
                ...prev,
                isActive: false,
                cycle: 0,
                timer: 4,
                phase: "inhale",
              };
            }

            return { ...prev, phase: newPhase, cycle: newCycle, timer: 4 };
          }
          return { ...prev, timer: prev.timer - 1 };
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [breathingExercise.isActive, toast]);

  // Handlers
  const startMeditation = (session: TherapySession) => {
    setMeditationPlayer({
      isPlaying: true,
      currentTime: 0,
      duration: session.duration * 60,
      volume: 75,
      isMuted: false,
      currentSession: session,
    });

    setTimeout(() => {
      toast({
        title: "Meditation Started",
        description: `Starting ${session.title} session.`,
      });
    }, 0);
  };

  const toggleMeditationPlayback = () => {
    setMeditationPlayer((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
  };

  const startBreathingExercise = () => {
    setBreathingExercise((prev) => ({
      ...prev,
      isActive: true,
      cycle: 0,
      timer: 4,
      phase: "inhale",
    }));
    setTimeout(() => {
      toast({
        title: "Breathing Exercise Started",
        description: "Follow the rhythm and breathe deeply.",
      });
    }, 0);
  };

  const stopBreathingExercise = () => {
    setBreathingExercise((prev) => ({
      ...prev,
      isActive: false,
      cycle: 0,
      timer: 4,
      phase: "inhale",
    }));
  };

  const saveJournalEntry = () => {
    if (!journaling.content.trim()) {
      setTimeout(() => {
        toast({
          title: "Entry Required",
          description: "Please write something before saving.",
          variant: "destructive",
        });
      }, 0);
      return;
    }

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      prompt: journaling.currentPrompt,
      content: journaling.content,
      mood: journaling.mood,
    };

    setJournaling((prev) => ({
      ...prev,
      entries: [newEntry, ...prev.entries],
      content: "",
    }));

    setTimeout(() => {
      toast({
        title: "Journal Entry Saved",
        description: "Your thoughts have been recorded.",
      });
    }, 0);
  };

  const completeSession = (sessionId: string) => {
    setTherapyProgress((prev) => ({
      ...prev,
      sessionsCompleted: prev.sessionsCompleted + 1,
      totalHours: prev.totalHours + 0.5,
    }));

    setTimeout(() => {
      toast({
        title: "Session Completed!",
        description: "Great progress! Keep up the good work.",
      });
    }, 0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-600";
      case "intermediate":
        return "bg-yellow-600";
      case "advanced":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "meditation":
        return Headphones;
      case "breathing":
        return Waves;
      case "cognitive":
        return Brain;
      case "journaling":
        return BookOpen;
      default:
        return Heart;
    }
  };

  const journalPrompts = [
    "What are three things you're grateful for today?",
    "Describe a moment when you felt truly peaceful.",
    "What challenges are you facing and how can you overcome them?",
    "Write about a person who makes you feel supported.",
    "What would you tell your younger self?",
    "Describe your ideal day for mental wellness.",
    "What emotions did you experience today and why?",
    "How have you grown in the past month?",
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
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
                UP
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">User Profile</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Therapy Center
              </h1>
              <p className="text-slate-400 text-lg">
                Your personalized mental wellness toolkit
              </p>
            </div>
            <div className="flex space-x-2">
              {["overview", "sessions", "tools", "progress"].map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? "default" : "outline"}
                  onClick={() => setActiveTab(tab as any)}
                  className={
                    activeTab === tab
                      ? "bg-blue-600"
                      : "border-slate-600 text-slate-300"
                  }
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-8">
              {/* AI Insight Card */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-1 bg-gradient-to-br from-orange-500 to-pink-600 border-none text-white">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                      <Lightbulb className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      AI Insight: Mild Anxiety & Stress
                    </h3>
                    <p className="text-orange-100 text-sm mb-4">
                      Your recent mood patterns suggest...
                    </p>
                    <p className="text-sm leading-relaxed">
                      Based on your recent entries, you've shown signs of mild
                      anxiety and increased stress levels. Focusing on
                      techniques that promote calm and emotional resilience
                      could be beneficial.
                    </p>
                  </CardContent>
                </Card>

                <Card className="lg:col-span-2 bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Your Therapy Progress
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      A quick look at your journey.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-300">
                          Sessions Completed:
                        </span>
                        <span className="text-white font-semibold">
                          {therapyProgress.sessionsCompleted}
                        </span>
                      </div>
                      <Progress
                        value={(therapyProgress.sessionsCompleted / 20) * 100}
                        className="h-2"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-300">
                          Techniques Learned:
                        </span>
                        <span className="text-white font-semibold">
                          {therapyProgress.techniquesLearned}
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-300">
                          Current Wellness Streak:
                        </span>
                        <span className="text-green-400 font-semibold">
                          {therapyProgress.wellnessStreak} days
                        </span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-slate-300">
                          Total Practice Time:
                        </span>
                        <span className="text-blue-400 font-semibold">
                          {therapyProgress.totalHours} hours
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card
                  className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors cursor-pointer"
                  onClick={() => setActiveTab("tools")}
                >
                  <CardContent className="p-6 text-center">
                    <Headphones className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-white font-semibold mb-2">
                      Start Meditation
                    </h3>
                    <p className="text-slate-400 text-sm">
                      Begin a guided session
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors cursor-pointer"
                  onClick={startBreathingExercise}
                >
                  <CardContent className="p-6 text-center">
                    <Waves className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <h3 className="text-white font-semibold mb-2">
                      Breathing Exercise
                    </h3>
                    <p className="text-slate-400 text-sm">
                      Quick stress relief
                    </p>
                  </CardContent>
                </Card>

                <Card
                  className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors cursor-pointer"
                  onClick={() => setActiveTab("tools")}
                >
                  <CardContent className="p-6 text-center">
                    <BookOpen className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-white font-semibold mb-2">
                      Journal Entry
                    </h3>
                    <p className="text-slate-400 text-sm">Reflect and write</p>
                  </CardContent>
                </Card>

                <Card
                  className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors cursor-pointer"
                  onClick={() => setActiveTab("sessions")}
                >
                  <CardContent className="p-6 text-center">
                    <Brain className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                    <h3 className="text-white font-semibold mb-2">
                      CBT Session
                    </h3>
                    <p className="text-slate-400 text-sm">Cognitive training</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Sessions Tab */}
          {activeTab === "sessions" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-white">
                  Therapy Sessions
                </h2>
                <Button
                  onClick={() => navigate("/mood-input")}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Target className="w-4 h-4 mr-2" />
                  Set Goals
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {therapySessions.map((session) => {
                  const IconComponent = getTypeIcon(session.type);
                  return (
                    <Card
                      key={session.id}
                      className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-all duration-200"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
                              <IconComponent className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                              <h3 className="text-white font-semibold">
                                {session.title}
                              </h3>
                              <p className="text-slate-400 text-sm">
                                {session.duration} minutes
                              </p>
                            </div>
                          </div>
                          {session.completed && (
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          )}
                        </div>

                        <p className="text-slate-300 text-sm mb-4">
                          {session.description}
                        </p>

                        <div className="flex items-center justify-between mb-4">
                          <Badge
                            className={`${getDifficultyColor(session.difficulty)} text-white`}
                          >
                            {session.difficulty}
                          </Badge>
                          {session.rating && (
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${i < session.rating! ? "text-yellow-400 fill-current" : "text-slate-600"}`}
                                />
                              ))}
                            </div>
                          )}
                        </div>

                        <Button
                          onClick={() => {
                            if (session.type === "meditation") {
                              startMeditation(session);
                            } else {
                              completeSession(session.id);
                            }
                          }}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                          disabled={session.completed}
                        >
                          {session.completed ? "Completed" : "Start Session"}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tools Tab */}
          {activeTab === "tools" && (
            <div className="space-y-8">
              {/* Meditation Player */}
              {meditationPlayer.currentSession && (
                <Card className="bg-slate-800 border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Headphones className="w-6 h-6 mr-2 text-blue-400" />
                      {meditationPlayer.currentSession.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Button
                        onClick={toggleMeditationPlayback}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {meditationPlayer.isPlaying ? (
                          <Pause className="w-5 h-5" />
                        ) : (
                          <Play className="w-5 h-5" />
                        )}
                      </Button>
                      <div className="flex-1">
                        <div className="flex justify-between text-sm text-slate-400 mb-2">
                          <span>
                            {formatTime(meditationPlayer.currentTime)}
                          </span>
                          <span>{formatTime(meditationPlayer.duration)}</span>
                        </div>
                        <Progress
                          value={
                            (meditationPlayer.currentTime /
                              meditationPlayer.duration) *
                            100
                          }
                          className="h-2"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setMeditationPlayer((prev) => ({
                              ...prev,
                              isMuted: !prev.isMuted,
                            }))
                          }
                        >
                          {meditationPlayer.isMuted ? (
                            <VolumeX className="w-4 h-4" />
                          ) : (
                            <Volume2 className="w-4 h-4" />
                          )}
                        </Button>
                        <Slider
                          value={[meditationPlayer.volume]}
                          onValueChange={(value) =>
                            setMeditationPlayer((prev) => ({
                              ...prev,
                              volume: value[0],
                            }))
                          }
                          max={100}
                          step={1}
                          className="w-20"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Breathing Exercise */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Waves className="w-6 h-6 mr-2 text-green-400" />
                    Breathing Exercise
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    4-4-4 breathing technique for stress relief
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {breathingExercise.isActive ? (
                    <div className="text-center space-y-6">
                      <div className="relative">
                        <div
                          className={`w-32 h-32 mx-auto rounded-full border-4 transition-all duration-1000 ${
                            breathingExercise.phase === "inhale"
                              ? "border-blue-400 scale-110"
                              : breathingExercise.phase === "hold"
                                ? "border-yellow-400 scale-100"
                                : "border-green-400 scale-90"
                          }`}
                        >
                          <div className="w-full h-full flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-2xl font-bold text-white">
                                {breathingExercise.timer}
                              </div>
                              <div className="text-slate-400 text-sm capitalize">
                                {breathingExercise.phase}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-white">
                          Cycle {breathingExercise.cycle + 1} of{" "}
                          {breathingExercise.totalCycles}
                        </p>
                        <Progress
                          value={
                            (breathingExercise.cycle /
                              breathingExercise.totalCycles) *
                            100
                          }
                          className="h-2"
                        />
                      </div>

                      <Button
                        onClick={stopBreathingExercise}
                        variant="outline"
                        className="border-slate-600 text-slate-300"
                      >
                        Stop Exercise
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center space-y-4">
                      <p className="text-slate-300">
                        A simple breathing technique to reduce stress and
                        anxiety. Follow the visual guide to breathe deeply.
                      </p>
                      <Button
                        onClick={startBreathingExercise}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Timer className="w-4 h-4 mr-2" />
                        Start Breathing Exercise
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Journaling Tool */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <BookOpen className="w-6 h-6 mr-2 text-purple-400" />
                    Reflective Journaling
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Express your thoughts and feelings through writing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-slate-300 text-sm font-medium mb-2 block">
                        Today's Prompt:
                      </label>
                      <div className="bg-slate-700 p-4 rounded-lg">
                        <p className="text-white italic">
                          "{journaling.currentPrompt}"
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const newPrompt =
                            journalPrompts[
                              Math.floor(Math.random() * journalPrompts.length)
                            ];
                          setJournaling((prev) => ({
                            ...prev,
                            currentPrompt: newPrompt,
                          }));
                        }}
                        className="text-blue-400 hover:text-blue-300 mt-2"
                      >
                        <RotateCcw className="w-4 h-4 mr-1" />
                        New Prompt
                      </Button>
                    </div>

                    <div>
                      <label className="text-slate-300 text-sm font-medium mb-2 block">
                        Your Thoughts:
                      </label>
                      <Textarea
                        placeholder="Write your thoughts and feelings here..."
                        value={journaling.content}
                        onChange={(e) =>
                          setJournaling((prev) => ({
                            ...prev,
                            content: e.target.value,
                          }))
                        }
                        className="min-h-[200px] bg-slate-900 border-slate-600 text-white placeholder-slate-500"
                      />
                    </div>

                    <div>
                      <label className="text-slate-300 text-sm font-medium mb-2 block">
                        Current Mood:
                      </label>
                      <div className="flex space-x-4">
                        {[
                          {
                            value: "happy",
                            icon: Smile,
                            color: "text-green-400",
                          },
                          {
                            value: "neutral",
                            icon: Meh,
                            color: "text-yellow-400",
                          },
                          { value: "sad", icon: Frown, color: "text-red-400" },
                        ].map(({ value, icon: Icon, color }) => (
                          <Button
                            key={value}
                            variant={
                              journaling.mood === value ? "default" : "outline"
                            }
                            onClick={() =>
                              setJournaling((prev) => ({
                                ...prev,
                                mood: value as any,
                              }))
                            }
                            className={`${journaling.mood === value ? "bg-blue-600" : "border-slate-600"}`}
                          >
                            <Icon className={`w-5 h-5 mr-2 ${color}`} />
                            {value.charAt(0).toUpperCase() + value.slice(1)}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button
                        onClick={saveJournalEntry}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        Save Entry
                      </Button>
                      <Button
                        variant="outline"
                        className="border-slate-600 text-slate-300"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </div>

                  {/* Recent Entries */}
                  {journaling.entries.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-slate-700">
                      <h4 className="text-white font-medium mb-4">
                        Recent Entries
                      </h4>
                      <div className="space-y-3 max-h-60 overflow-y-auto">
                        {journaling.entries.slice(0, 3).map((entry) => (
                          <div
                            key={entry.id}
                            className="bg-slate-700 p-3 rounded-lg"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-slate-400 text-sm">
                                {entry.date}
                              </span>
                              <Badge
                                variant="outline"
                                className="border-slate-500 text-slate-400"
                              >
                                {entry.mood}
                              </Badge>
                            </div>
                            <p className="text-slate-300 text-sm line-clamp-2">
                              {entry.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Progress Tab */}
          {activeTab === "progress" && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-white">Your Progress</h2>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="p-6 text-center">
                    <Award className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-white mb-2">
                      {therapyProgress.sessionsCompleted}
                    </div>
                    <p className="text-slate-400">Sessions Completed</p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="p-6 text-center">
                    <Clock className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-white mb-2">
                      {therapyProgress.totalHours}
                    </div>
                    <p className="text-slate-400">Hours Practiced</p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-white mb-2">
                      {therapyProgress.wellnessStreak}
                    </div>
                    <p className="text-slate-400">Day Streak</p>
                  </CardContent>
                </Card>

                <Card className="bg-slate-800 border-slate-700">
                  <CardContent className="p-6 text-center">
                    <Zap className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-white mb-2">
                      {therapyProgress.techniquesLearned}
                    </div>
                    <p className="text-slate-400">Techniques Mastered</p>
                  </CardContent>
                </Card>
              </div>

              {/* Weekly Progress Chart */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Weekly Progress</CardTitle>
                  <CardDescription className="text-slate-400">
                    Your therapy engagement over time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-slate-900 rounded-lg flex items-end justify-center p-6">
                    <div className="w-full flex items-end justify-between space-x-2 h-40">
                      {[40, 60, 45, 80, 70, 85, 75].map((height, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center space-y-2 flex-1"
                        >
                          <div
                            className="bg-gradient-to-t from-purple-600 to-purple-400 rounded-t w-full transition-all duration-1000"
                            style={{ height: `${height}%` }}
                          ></div>
                          <span className="text-xs text-slate-400">
                            {
                              ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][
                                index
                              ]
                            }
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">
                    Recent Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Mindfulness Master",
                        description: "Completed 7 meditation sessions",
                        icon: "🧘",
                        date: "2 days ago",
                      },
                      {
                        title: "Consistent Tracker",
                        description: "14-day wellness streak",
                        icon: "🔥",
                        date: "Today",
                      },
                      {
                        title: "Deep Thinker",
                        description: "Wrote 5 journal entries",
                        icon: "📝",
                        date: "1 week ago",
                      },
                    ].map((achievement, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-4 p-4 bg-slate-700 rounded-lg"
                      >
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h4 className="text-white font-medium">
                            {achievement.title}
                          </h4>
                          <p className="text-slate-400 text-sm">
                            {achievement.description}
                          </p>
                        </div>
                        <span className="text-slate-500 text-sm">
                          {achievement.date}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Therapy;
