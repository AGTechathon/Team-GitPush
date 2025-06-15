import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  MessageCircle,
  Send,
  X,
  Bot,
  User,
  Sparkles,
  Heart,
  Music,
  Brain,
  Users,
  BarChart3,
  Shield,
  Clock,
  Star,
} from "lucide-react";

// Define the structure for a chat message
interface ChatMessage {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const Chatbot = () => {
  // State for managing chat window visibility
  const [isOpen, setIsOpen] = useState(false);
  // State for storing chat messages
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  // State for storing user input
  const [inputValue, setInputValue] = useState("");
  // State for indicating bot is typing
  const [isTyping, setIsTyping] = useState(false);
  // Ref for scrolling to the latest message
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Toast notification hook for user feedback
  const { toast } = useToast();
  // Auth context for personalized responses
  const { isAuthenticated, user } = useAuth();

  // Scroll to bottom whenever new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize with a welcome message when chat opens for the first time
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: ChatMessage = {
        id: Date.now().toString(),
        type: "bot",
        content: isAuthenticated
          ? `Hi ${user?.name}! 👋 I'm here to help you make the most of RepeatHarmony. What would you like to know?`
          : "Hi there! 👋 I'm your RepeatHarmony assistant. I can help you understand our features and get started with your mental wellness journey. What would you like to know?",
        timestamp: new Date(),
        suggestions: isAuthenticated
          ? [
              "How do I track my mood?",
              "Show me therapy tools",
              "Explain the dashboard",
              "Music recommendations",
            ]
          : [
              "What is RepeatHarmony?",
              "How do I get started?",
              "What features are available?",
              "Is it free to use?",
            ],
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, isAuthenticated, user]);

  // Generate a bot response based on user input
  const generateResponse = (
    userInput: string,
  ): { content: string; suggestions?: string[] } => {
    const input = userInput.toLowerCase().trim();

    // Handle greetings: personalized if authenticated, generic otherwise
    if (
      input.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)
    ) {
      return {
        content: isAuthenticated
          ? `Hello ${user?.name}! How can I help you with RepeatHarmony today?`
          : "Hello! Welcome to RepeatHarmony. I'm here to help you understand our mental wellness platform. What would you like to know?",
        suggestions: isAuthenticated
          ? [
              "Show me my progress",
              "Start a therapy session",
              "Play calming music",
            ]
          : [
              "What is RepeatHarmony?",
              "How do I sign up?",
              "What features do you offer?",
            ],
      };
    }

    // Explain what RepeatHarmony is and its features
    if (
      input.includes("what is") ||
      input.includes("about") ||
      input.includes("repeatharmony")
    ) {
      return {
        content:
          "RepeatHarmony is your personal AI-powered mental health companion! 🧠💙\n\nWe offer:\n• **Mood Tracking** - AI analyzes your emotions\n• **Personalized Therapy** - Tailored wellness sessions\n• **Music Healing** - Curated therapeutic soundscapes\n• **Community Support** - Connect with others\n• **Progress Analytics** - Track your wellness journey\n\nIt's designed to support your mental wellness with evidence-based tools and a supportive community.",
        suggestions: [
          "How do I get started?",
          "Is it free?",
          "What makes it different?",
          "Show me features",
        ],
      };
    }

    // Guide user on how to get started, with tailored advice for logged-in users
    if (
      input.includes("get started") ||
      input.includes("how to start") ||
      input.includes("begin")
    ) {
      if (isAuthenticated) {
        return {
          content:
            "Great! Since you're already signed in, here's how to get the most out of RepeatHarmony:\n\n1. **Track Your Mood** - Start by logging how you're feeling\n2. **Explore Therapy Tools** - Try our guided sessions\n3. **Listen to Music** - Find healing sounds for your mood\n4. **Join the Community** - Connect with others\n5. **Monitor Progress** - Check your wellness dashboard\n\nWould you like me to guide you to any specific feature?",
          suggestions: [
            "Take me to mood tracking",
            "Show therapy tools",
            "Play relaxing music",
            "View my dashboard",
          ],
        };
      } else {
        return {
          content:
            "Getting started with RepeatHarmony is easy! 🚀\n\n**Step 1:** Create your free account (takes 2 minutes)\n**Step 2:** Complete a quick mood check-in\n**Step 3:** Explore personalized recommendations\n**Step 4:** Join our supportive community\n\n✨ **It's completely free to start** - no credit card required!\n\nReady to begin your mental wellness journey?",
          suggestions: [
            "Create account now",
            "Learn about features",
            "Is my data secure?",
            "What's included free?",
          ],
        };
      }
    }

    // Describe available features in detail
    if (
      input.includes("features") ||
      input.includes("what can") ||
      input.includes("capabilities")
    ) {
      return {
        content:
          "RepeatHarmony offers powerful features for your mental wellness:\n\n🎯 **Mood Tracking**\n• AI-powered emotion analysis\n• Voice, text, and facial recognition\n• Pattern identification\n\n🧘 **Therapy Tools**\n• Guided meditation sessions\n• Breathing exercises\n• CBT techniques\n• Journaling prompts\n\n🎵 **Music Therapy**\n• Mood-based recommendations\n• Healing soundscapes\n• Personalized playlists\n\n👥 **Community**\n• Support forums\n• Expert guidance\n• Peer connections\n\n📊 **Analytics**\n• Progress tracking\n• Wellness insights\n• Achievement system",
        suggestions: [
          "Try mood tracking",
          "Explore therapy",
          "Listen to music",
          "Join community",
        ],
      };
    }

    // Explain mood tracking and how it works, with guidance for authenticated users
    if (
      input.includes("mood") ||
      input.includes("track") ||
      input.includes("emotion")
    ) {
      if (isAuthenticated) {
        return {
          content:
            "Our mood tracking is super intuitive! 📊\n\nYou can log your emotions through:\n• **Text** - Write about your feelings\n• **Voice** - Speak your thoughts\n• **Camera** - Facial emotion detection\n\nOur AI analyzes patterns and provides insights to help you understand your emotional journey better.\n\nWant to start tracking your mood now?",
          suggestions: [
            "Start mood tracking",
            "View my mood history",
            "How does AI analysis work?",
          ],
        };
      } else {
        return {
          content:
            "Our mood tracking feature is amazing! 🎯\n\nWith AI-powered analysis, you can:\n• Log emotions through text, voice, or camera\n• Get personalized insights\n• Track patterns over time\n• Receive tailored recommendations\n\nTo start tracking your mood, you'll need to create a free account first.",
          suggestions: [
            "Sign up now",
            "Learn more about AI",
            "Other features?",
          ],
        };
      }
    }

    // Describe therapy and meditation tools, with guidance for authenticated users
    if (
      input.includes("therapy") ||
      input.includes("meditation") ||
      input.includes("breathing")
    ) {
      if (isAuthenticated) {
        return {
          content:
            "Our therapy center has everything you need! 🧘‍♀️\n\n**Available Sessions:**\n• Mindful breathing exercises\n• Body scan meditation\n• Cognitive restructuring\n• Guided journaling\n• Progressive relaxation\n\nEach session is personalized based on your mood and progress. Ready to start a session?",
          suggestions: [
            "Start meditation",
            "Try breathing exercise",
            "Open journal",
            "View my progress",
          ],
        };
      } else {
        return {
          content:
            "Our therapy tools are designed by mental health professionals! 🧠\n\n**What's included:**\n• Guided meditation sessions\n• Breathing exercises for anxiety\n• CBT-based techniques\n• Reflective journaling\n• Progress tracking\n\nAll tools are personalized based on your needs. Sign up to access these powerful features!",
          suggestions: ["Create account", "Learn about CBT", "Music therapy?"],
        };
      }
    }

    // Explain music therapy and recommendations, with guidance for authenticated users
    if (
      input.includes("music") ||
      input.includes("sound") ||
      input.includes("audio")
    ) {
      if (isAuthenticated) {
        return {
          content:
            "Our music therapy is incredible! 🎵\n\nBased on your current mood, I can recommend:\n• Calming nature sounds for anxiety\n• Uplifting melodies for low mood\n• Focus music for concentration\n• Sleep stories for relaxation\n\nThe AI curates playlists specifically for your emotional state. Want to try it now?",
          suggestions: [
            "Play mood music",
            "Relaxing sounds",
            "Focus playlist",
            "Sleep stories",
          ],
        };
      } else {
        return {
          content:
            "Our music therapy feature uses AI to curate healing sounds! 🎶\n\n**How it works:**\n• AI analyzes your mood\n• Recommends therapeutic music\n• Curates personalized playlists\n• Tracks what helps you most\n\nFrom nature sounds to binaural beats - we have music for every emotional need. Sign up to start your musical healing journey!",
          suggestions: [
            "Sign up for music",
            "How does AI work?",
            "Other features?",
          ],
        };
      }
    }

    // Describe dashboard and analytics, with guidance for authenticated users
    if (
      input.includes("dashboard") ||
      input.includes("progress") ||
      input.includes("analytics")
    ) {
      if (isAuthenticated) {
        return {
          content:
            "Your dashboard shows your wellness journey! 📈\n\n**What you'll see:**\n• Weekly mood trends\n• Therapy session progress\n• Achievement badges\n• Wellness streaks\n• Personalized insights\n\nYour current streak and recent improvements are really impressive! Want to check it out?",
          suggestions: [
            "View dashboard",
            "See my achievements",
            "Check mood trends",
            "Export data",
          ],
        };
      } else {
        return {
          content:
            "Our dashboard gives you powerful insights into your mental wellness! 📊\n\n**Track your:**\n• Mood patterns over time\n• Therapy session completions\n• Wellness goals progress\n• Achievement milestones\n• Personal growth metrics\n\nIt's like having a personal wellness coach! Sign up to start tracking your progress.",
          suggestions: [
            "Create account",
            "See demo dashboard",
            "Privacy concerns?",
          ],
        };
      }
    }

    // Describe community and forum features, with guidance for authenticated users
    if (
      input.includes("community") ||
      input.includes("forum") ||
      input.includes("support")
    ) {
      if (isAuthenticated) {
        return {
          content:
            "Our community is so supportive! 👥💙\n\n**In the forum you can:**\n• Share experiences safely\n• Get peer support\n• Learn from others\n• Ask questions to therapists\n• Join group challenges\n\nThere are always caring people ready to listen and help. Want to join a conversation?",
          suggestions: [
            "Visit forum",
            "Join discussion",
            "Find support groups",
            "Talk to therapist",
          ],
        };
      } else {
        return {
          content:
            "Our community forum is a safe space for mental wellness support! 🤗\n\n**What makes it special:**\n• Verified mental health professionals\n• Peer support groups\n• Anonymous sharing options\n• Moderated discussions\n• Crisis support resources\n\nConnect with others on similar journeys. Sign up to join our caring community!",
          suggestions: [
            "Join community",
            "Safety features?",
            "Professional support?",
          ],
        };
      }
    }

    // Explain pricing and free features
    if (
      input.includes("free") ||
      input.includes("cost") ||
      input.includes("price") ||
      input.includes("pay")
    ) {
      return {
        content:
          "Great news - RepeatHarmony is **free to start**! 🎉\n\n**What's free forever:**\n• Basic mood tracking\n• Community forum access\n• Some guided sessions\n• Progress analytics\n• Mobile app access\n\n**Premium features:**\n• Advanced AI insights\n• Unlimited therapy sessions\n• Personal coach matching\n• Priority support\n\n**No credit card required** to get started. Try everything risk-free!",
        suggestions: isAuthenticated
          ? ["Upgrade to premium", "What's included?"]
          : ["Sign up free", "Premium benefits?", "Free trial?"],
      };
    }

    // Explain privacy and security measures
    if (
      input.includes("privacy") ||
      input.includes("secure") ||
      input.includes("data") ||
      input.includes("safe")
    ) {
      return {
        content:
          "Your privacy and security are our top priorities! 🔒\n\n**How we protect you:**\n• End-to-end encryption\n• HIPAA-compliant storage\n• No data selling ever\n• Anonymous sharing options\n• Regular security audits\n• Delete data anytime\n\n**You control:**\n• What you share\n• Who sees your data\n• How long we keep it\n\nYour mental health journey is private and secure with us.",
        suggestions: [
          "Read privacy policy",
          "Security features",
          "Data control options",
        ],
      };
    }

    // Offer help and support options
    if (
      input.includes("help") ||
      input.includes("support") ||
      input.includes("contact")
    ) {
      return {
        content:
          "I'm here to help, and so is our support team! 🆘\n\n**Get help through:**\n• This chat (that's me! 🤖)\n• Email support team\n• Community forum\n• Help center articles\n• Video tutorials\n• Crisis hotline (24/7)\n\n**Response times:**\n• Chat: Instant\n• Email: Within 2 hours\n• Crisis support: Immediate\n\nWhat specific help do you need?",
        suggestions: [
          "Technical issue",
          "Account problem",
          "Feature question",
          "Crisis support",
        ],
      };
    }

    // Fallback response when intent is not recognized
    return {
      content:
        "I'd love to help you with that! 🤔 While I'm getting smarter every day, I might not have understood your question perfectly.\n\nHere are some things I'm great at helping with:\n• Explaining RepeatHarmony features\n• Getting you started\n• Account and privacy questions\n• Technical support\n• Connecting you with resources\n\nCould you rephrase your question, or would you like to explore one of these topics?",
      suggestions: [
        "What is RepeatHarmony?",
        "How do I get started?",
        "Show me features",
        "Contact human support",
      ],
    };
  };

  // Handle sending a message from the user
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message to chat history
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay for a more natural feel
    setTimeout(
      () => {
        // Generate and add bot response to chat history
        const response = generateResponse(inputValue);
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          type: "bot",
          content: response.content,
          timestamp: new Date(),
          suggestions: response.suggestions,
        };

        setMessages((prev) => [...prev, botMessage]);
        setIsTyping(false);
      },
      1000 + Math.random() * 1000, // Random delay for realism
    );
  };

  // Handle clicking a suggestion, automatically sending it as a message
  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setTimeout(() => handleSendMessage(), 100);
  };

  // Handle pressing Enter to send a message
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Toggle chat window visibility and show welcome toast
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        toast({
          title: "RepeatHarmony Assistant",
          description:
            "Hi! I'm here to help you get started and answer any questions.",
        });
      }, 0);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <Card className="w-96 h-[500px] mb-4 bg-slate-800 border-slate-700 shadow-2xl animate-in slide-in-from-bottom duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle className="text-lg">
                    RepeatHarmony Assistant
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm opacity-90">Online</span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleChat}
                className="text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0 flex flex-col h-[400px]">
            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] ${message.type === "user" ? "order-2" : "order-1"}`}
                    >
                      <div
                        className={`flex items-start space-x-2 ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            message.type === "user"
                              ? "bg-blue-600"
                              : "bg-purple-600"
                          }`}
                        >
                          {message.type === "user" ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Bot className="w-4 h-4 text-white" />
                          )}
                        </div>

                        <div
                          className={`rounded-2xl p-3 ${
                            message.type === "user"
                              ? "bg-blue-600 text-white"
                              : "bg-slate-700 text-slate-100"
                          }`}
                        >
                          <div className="text-sm leading-relaxed whitespace-pre-line">
                            {message.content}
                          </div>
                          <div className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Suggestions: quick replies from bot messages */}
                      {message.suggestions && message.type === "bot" && (
                        <div className="mt-3 ml-10 space-y-2">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="text-xs h-auto py-2 px-3 bg-slate-600 border-slate-500 text-slate-200 hover:bg-slate-500 mr-2 mb-2"
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Typing Indicator: visual feedback when bot is responding */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <div className="bg-slate-700 rounded-2xl p-3">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                          <div
                            className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div ref={messagesEndRef} />
            </ScrollArea>

            {/* Input Area: for user to type and send messages */}
            <div className="p-4 border-t border-slate-700">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about RepeatHarmony..."
                  className="bg-slate-900 border-slate-600 text-white placeholder-slate-400"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Chat Toggle Button: opens/closes chat window */}
      <Button
        onClick={toggleChat}
        className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 ${
          isOpen
            ? "bg-slate-600 hover:bg-slate-700"
            : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 animate-pulse"
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <div className="relative">
            <MessageCircle className="w-6 h-6 text-white" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-2 h-2 text-white" />
            </div>
          </div>
        )}
      </Button>

      {/* Floating Help Badge: visual cue to encourage engagement */}
      {!isOpen && (
        <Badge
          className="absolute -top-2 -left-2 bg-green-600 text-white animate-bounce"
          style={{ animationDuration: "2s" }}
        >
          Help
        </Badge>
      )}
    </div>
  );
};

export default Chatbot;
