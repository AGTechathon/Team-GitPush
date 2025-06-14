
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  Home,
  MessageSquare,
  BarChart3,
  Brain,
  Users,
  User,
  Mic,
  Camera,
  Edit3,
  CheckCircle,
  AlertCircle,
  Meh,
  Smile,
  Frown,
  Sparkles,
  MicIcon,
  Square,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const sidebarItems = [
  { icon: Home, label: "Home", href: "/", id: "home" },
  {
    icon: MessageSquare,
    label: "Mood Input",
    href: "/mood-input",
    id: "mood-input",
  },
  { icon: BarChart3, label: "Dashboard", href: "/dashboard", id: "dashboard" },
  { icon: Brain, label: "Therapy", href: "/therapy", id: "therapy" },
  { icon: Users, label: "Forum", href: "/forum", id: "forum" },
];

interface MoodEntry {
  mood: string;
  time: string;
  color: string;
  icon: any;
  confidence: number;
  description: string;
}

const moodKeywords = {
  happy: [
    "happy",
    "joy",
    "excited",
    "great",
    "amazing",
    "wonderful",
    "fantastic",
    "good",
    "positive",
    "cheerful",
  ],
  sad: [
    "sad",
    "down",
    "depressed",
    "blue",
    "low",
    "unhappy",
    "tearful",
    "crying",
    "hurt",
    "disappointed",
  ],
  anxious: [
    "anxious",
    "worried",
    "nervous",
    "stressed",
    "panic",
    "fear",
    "overwhelmed",
    "tense",
    "restless",
  ],
  calm: [
    "calm",
    "peaceful",
    "relaxed",
    "serene",
    "tranquil",
    "centered",
    "balanced",
    "quiet",
    "still",
  ],
  angry: [
    "angry",
    "mad",
    "furious",
    "irritated",
    "frustrated",
    "annoyed",
    "rage",
    "livid",
  ],
  neutral: [
    "okay",
    "fine",
    "normal",
    "average",
    "alright",
    "decent",
    "moderate",
  ],
  energetic: [
    "energetic",
    "pumped",
    "motivated",
    "active",
    "vigorous",
    "dynamic",
    "lively",
  ],
};

const MoodInput = () => {
  const [selectedInputMethod, setSelectedInputMethod] = useState("text");
  const [moodText, setMoodText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [detectedMood, setDetectedMood] = useState<string | null>(null);
  const [moodConfidence, setMoodConfidence] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [recentMoods, setRecentMoods] = useState<MoodEntry[]>([
    {
      mood: "Calm",
      time: "2 hours ago",
      color: "bg-green-500",
      icon: CheckCircle,
      confidence: 85,
      description: "Feeling peaceful after meditation",
    },
    {
      mood: "Neutral",
      time: "Yesterday",
      color: "bg-yellow-500",
      icon: Meh,
      confidence: 72,
      description: "Average day, nothing special",
    },
    {
      mood: "Anxious",
      time: "2 days ago",
      color: "bg-red-500",
      icon: AlertCircle,
      confidence: 91,
      description: "Work presentation stress",
    },
    {
      mood: "Relaxed",
      time: "3 days ago",
      color: "bg-blue-500",
      icon: Smile,
      confidence: 88,
      description: "Weekend vibes",
    },
    {
      mood: "Stressed",
      time: "4 days ago",
      color: "bg-purple-500",
      icon: Frown,
      confidence: 79,
      description: "Deadline pressure",
    },
  ]);

  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setRecordingTime(0);
    }
  }, [isRecording]);

  const analyzeMoodFromText = (text: string) => {
    const words = text.toLowerCase().split(/\s+/);
    const moodScores: { [key: string]: number } = {};

    Object.entries(moodKeywords).forEach(([mood, keywords]) => {
      moodScores[mood] = 0;
      keywords.forEach((keyword) => {
        words.forEach((word) => {
          if (word.includes(keyword) || keyword.includes(word)) {
            moodScores[mood] += 1;
          }
        });
      });
    });

    const topMood = Object.entries(moodScores).reduce((a, b) =>
      moodScores[a[0]] > moodScores[b[0]] ? a : b,
    );

    const confidence = Math.min(
      95,
      Math.max(60, topMood[1] * 20 + Math.random() * 15),
    );
    return { mood: topMood[0], confidence: Math.round(confidence) };
  };

  const handleSubmit = async () => {
    if (!moodText.trim() && selectedInputMethod === "text") {
      toast({
        title: "Please enter your thoughts",
        description:
          "Write something about how you're feeling to analyze your mood.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setIsAnalyzing(true);
    setAnalysisProgress(0);

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Analyze mood
    const analysis = analyzeMoodFromText(moodText);

    setTimeout(() => {
      setDetectedMood(analysis.mood);
      setMoodConfidence(analysis.confidence);
      setIsAnalyzing(false);

      // Add to recent moods
      const newMoodEntry: MoodEntry = {
        mood: analysis.mood.charAt(0).toUpperCase() + analysis.mood.slice(1),
        time: "Just now",
        color: `bg-${getMoodColor(analysis.mood)}-500`,
        icon: getMoodIcon(analysis.mood),
        confidence: analysis.confidence,
        description:
          moodText.substring(0, 50) + (moodText.length > 50 ? "..." : ""),
      };

      setRecentMoods((prev) => [newMoodEntry, ...prev.slice(0, 4)]);

      toast({
        title: "Mood Analysis Complete!",
        description: `Detected ${analysis.mood} mood with ${analysis.confidence}% confidence.`,
      });

      setIsSubmitting(false);
    }, 3000);
  };

  const getMoodColor = (mood: string) => {
    const colors: { [key: string]: string } = {
      happy: "yellow",
      sad: "blue",
      anxious: "red",
      calm: "green",
      angry: "red",
      neutral: "gray",
      energetic: "orange",
    };
    return colors[mood] || "gray";
  };

  const getMoodIcon = (mood: string) => {
    const icons: { [key: string]: any } = {
      happy: Smile,
      sad: Frown,
      anxious: AlertCircle,
      calm: CheckCircle,
      angry: AlertCircle,
      neutral: Meh,
      energetic: Sparkles,
    };
    return icons[mood] || Meh;
  };

  const handleVoiceRecording = () => {
    if (!isRecording) {
      // Start recording
      setIsRecording(true);
      toast({
        title: "Recording Started",
        description: "Speak clearly about your feelings...",
      });
    } else {
      // Stop recording
      setIsRecording(false);
      toast({
        title: "Recording Stopped",
        description: "Processing your voice input...",
      });
      // Simulate voice processing
      setTimeout(() => {
        setMoodText(
          "I've been feeling a bit stressed lately with work deadlines, but I'm trying to stay positive and focus on the things I can control.",
        );
        toast({
          title: "Voice Processed",
          description: "Your speech has been converted to text for analysis.",
        });
      }, 2000);
    }
  };

  const handleCameraToggle = () => {
    setIsCameraActive(!isCameraActive);
    if (!isCameraActive) {
      toast({
        title: "Camera Activated",
        description: "Analyzing facial expressions...",
      });
      // Simulate facial analysis
      setTimeout(() => {
        const randomMoods = ["calm", "neutral", "slightly_happy"];
        const randomMood =
          randomMoods[Math.floor(Math.random() * randomMoods.length)];
        setDetectedMood(randomMood);
        setMoodConfidence(Math.floor(Math.random() * 20) + 75);
        toast({
          title: "Facial Analysis Complete",
          description: `Detected ${randomMood.replace("_", " ")} expression.`,
        });
      }, 3000);
    } else {
      toast({
        title: "Camera Deactivated",
        description: "Facial analysis stopped.",
      });
    }
  };

  const inputMethods = [
    {
      id: "text",
      label: "Text Input",
      icon: Edit3,
      description: "Write about your feelings",
    },
    {
      id: "voice",
      label: "Voice Recognition",
      icon: Mic,
      description: "Speak your thoughts aloud",
    },
    {
      id: "facial",
      label: "Facial Analysis",
      icon: Camera,
      description: "Use camera to detect emotions",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">MoodHarmony</span>
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
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">John Doe</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex">
        {/* Center Content */}
        <div className="flex-1 p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-4xl font-bold text-white mb-4">
                How are you feeling today?
              </h1>
              <p className="text-slate-400 text-lg">
                Let MoodHarmony understand your current emotional state to
                provide personalized support.
              </p>
            </div>

            {/* Input Method Selection */}
            <Card className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {inputMethods.map((method) => {
                    const IconComponent = method.icon;
                    return (
                      <Button
                        key={method.id}
                        variant={
                          selectedInputMethod === method.id
                            ? "default"
                            : "outline"
                        }
                        onClick={() => setSelectedInputMethod(method.id)}
                        className={`h-auto p-6 flex flex-col items-center space-y-3 transition-all duration-200 ${
                          selectedInputMethod === method.id
                            ? "bg-blue-600 border-blue-500 text-white"
                            : "border-slate-600 text-slate-300 hover:border-slate-500 hover:bg-slate-700"
                        }`}
                      >
                        <IconComponent className="w-8 h-8" />
                        <div className="text-center">
                          <div className="font-semibold">{method.label}</div>
                          <div className="text-sm opacity-80 mt-1">
                            {method.description}
                          </div>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Analysis Progress */}
            {isAnalyzing && (
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center space-x-3 text-blue-400">
                      <Brain className="w-6 h-6 animate-pulse" />
                      <span className="text-lg font-medium">
                        AI is analyzing your mood...
                      </span>
                    </div>
                    <Progress
                      value={analysisProgress}
                      className="w-full max-w-md mx-auto"
                    />
                    <p className="text-slate-400">
                      Processing: {Math.round(analysisProgress)}%
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Input Interface */}
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">
                  Express Yourself in Words
                </CardTitle>
                <CardDescription className="text-slate-400">
                  {selectedInputMethod === "text" &&
                    "Write down your thoughts and feelings..."}
                  {selectedInputMethod === "voice" &&
                    "Click the microphone to start voice recording..."}
                  {selectedInputMethod === "facial" &&
                    "Position your face in the camera frame for emotion detection..."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedInputMethod === "text" && (
                  <Textarea
                    placeholder="Write down your thoughts and feelings..."
                    className="min-h-[200px] bg-slate-900 border-slate-600 text-white placeholder-slate-500 resize-none"
                    value={moodText}
                    onChange={(e) => setMoodText(e.target.value)}
                  />
                )}

                {selectedInputMethod === "voice" && (
                  <div className="min-h-[200px] bg-slate-900 border border-slate-600 rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div
                        className={`w-20 h-20 ${isRecording ? "bg-red-600 animate-pulse" : "bg-blue-600"} rounded-full flex items-center justify-center mx-auto`}
                      >
                        {isRecording ? (
                          <Square className="w-10 h-10 text-white" />
                        ) : (
                          <MicIcon className="w-10 h-10 text-white" />
                        )}
                      </div>
                      <p className="text-slate-400">
                        {isRecording
                          ? `Recording... ${recordingTime}s`
                          : "Click to start recording your voice"}
                      </p>
                      <Button
                        onClick={handleVoiceRecording}
                        className={`${isRecording ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}`}
                      >
                        {isRecording ? "Stop Recording" : "Start Recording"}
                      </Button>
                    </div>
                  </div>
                )}

                {selectedInputMethod === "facial" && (
                  <div className="min-h-[200px] bg-slate-900 border border-slate-600 rounded-lg flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div
                        className={`w-20 h-20 ${isCameraActive ? "bg-green-600 animate-pulse" : "bg-purple-600"} rounded-full flex items-center justify-center mx-auto`}
                      >
                        <Camera className="w-10 h-10 text-white" />
                      </div>
                      <p className="text-slate-400">
                        {isCameraActive
                          ? "Camera active - analyzing expressions..."
                          : "Enable camera for facial emotion analysis"}
                      </p>
                      <Button
                        onClick={handleCameraToggle}
                        className={`${isCameraActive ? "bg-red-600 hover:bg-red-700" : "bg-purple-600 hover:bg-purple-700"}`}
                      >
                        {isCameraActive ? "Stop Camera" : "Enable Camera"}
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Mood Visualization */}
            <Card className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-slate-700">
              <CardContent className="p-8">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Your mood visualized here
                  </h3>
                  <div className="w-full h-32 bg-slate-800/50 rounded-lg flex items-center justify-center">
                    {detectedMood ? (
                      <div className="text-center space-y-2">
                        <div className="text-3xl font-bold text-white capitalize">
                          {detectedMood.replace("_", " ")}
                        </div>
                        <div className="text-lg text-blue-300">
                          {moodConfidence}% confidence
                        </div>
                        <div className="w-32 h-2 bg-slate-700 rounded-full mx-auto">
                          <div
                            className="h-2 bg-blue-500 rounded-full transition-all duration-1000"
                            style={{ width: `${moodConfidence}%` }}
                          ></div>
                        </div>
                      </div>
                    ) : (
                      <p className="text-slate-400">
                        Mood visualization will appear after analysis
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="text-center">
              <Button
                onClick={handleSubmit}
                disabled={
                  isSubmitting ||
                  isAnalyzing ||
                  (selectedInputMethod === "text" && !moodText.trim())
                }
                className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-lg font-semibold rounded-lg disabled:opacity-50"
              >
                {isSubmitting ? "Analyzing..." : "Submit Mood for Analysis"}
              </Button>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Recent Moods */}
        <aside className="w-80 bg-slate-900 border-l border-slate-800 p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Your Recent Moods
              </h2>
              <p className="text-slate-400">
                A quick glance at your emotional journey.
              </p>
            </div>

            <div className="space-y-4">
              {recentMoods.map((mood, index) => {
                const IconComponent = mood.icon;
                return (
                  <Card
                    key={index}
                    className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-10 h-10 ${mood.color} rounded-full flex items-center justify-center`}
                          >
                            <IconComponent className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-white">
                              {mood.mood}
                            </p>
                            <p className="text-sm text-slate-400">
                              {mood.time}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className="border-slate-600 text-slate-400"
                        >
                          {mood.confidence}%
                        </Badge>
                      </div>
                      <p className="text-slate-400 text-sm">
                        {mood.description}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-400 hover:text-blue-300 hover:bg-slate-700 mt-2 w-full"
                        onClick={() => navigate("/dashboard")}
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Separator className="bg-slate-700" />

            <div className="text-center">
              <Button
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800 w-full"
                onClick={() => navigate("/dashboard")}
              >
                View Full History
              </Button>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default MoodInput;
