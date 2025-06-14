import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import {
  Home,
  MessageSquare,
  BarChart3,
  Brain,
  Users,
  User,
  Search,
  Bell,
  Send,
  ChevronDown,
  X,
  Paperclip,
  Smile,
  ThumbsUp,
  Reply,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

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

interface ForumMessage {
  id: number;
  author: string;
  role: string;
  time: string;
  avatar: string;
  message: string;
  isTherapist: boolean;
  isCurrentUser?: boolean;
  likes: number;
  replies: ForumMessage[];
}

const initialMessages: ForumMessage[] = [
  {
    id: 1,
    author: "Dr. Emily White",
    role: "Therapist",
    time: "10:14 AM",
    avatar: "EW",
    message:
      "Welcome everyone to our 'Mindful Moments' community forum! This space is dedicated to sharing positive coping strategies and mindfulness tips. Feel free to ask questions and support each other.",
    isTherapist: true,
    likes: 12,
    replies: [],
  },
  {
    id: 2,
    author: "Sarah J.",
    role: "Member",
    time: "10:19 AM",
    avatar: "SJ",
    message:
      "Hi Dr. White! 👋 I'm new here and excited to learn. Does anyone have quick tips for daily gratitude journaling?",
    isTherapist: false,
    likes: 5,
    replies: [],
  },
  {
    id: 3,
    author: "You",
    role: "Member",
    time: "10:21 AM",
    avatar: "ME",
    message:
      "Hey Sarah! For gratitude, I find using a small notebook by my bedside helpful. I just jot down 3 things every night. Simple, but effective! 😊",
    isTherapist: false,
    isCurrentUser: true,
    likes: 8,
    replies: [],
  },
  {
    id: 4,
    author: "Dr. Emily White",
    role: "Therapist",
    time: "10:25 AM",
    avatar: "EW",
    message:
      "That's a great tip, @You ! Consistency is key. Also, try to focus on specific details rather than general statements for deeper impact.",
    isTherapist: true,
    likes: 15,
    replies: [],
  },
  {
    id: 5,
    author: "Michael C.",
    role: "Member",
    time: "10:30 AM",
    avatar: "MC",
    message:
      "I've been trying guided meditation from the Therapy Suggestions section. It's really calming after a long day. Has anyone else tried it?",
    isTherapist: false,
    likes: 7,
    replies: [],
  },
  {
    id: 6,
    author: "You",
    role: "Member",
    time: "10:35 AM",
    avatar: "ME",
    message:
      "Yes, @Michael C ! The 'Deep Breath' exercise is my favorite. It helps clear my mind. Highly recommend checking out the Therapy section!",
    isTherapist: false,
    isCurrentUser: true,
    likes: 6,
    replies: [],
  },
];

const activeThreads = [
  {
    author: "Sarah J.",
    topic: "Daily gratitude journaling tips?",
    time: "10:19 AM",
    avatar: "SJ",
    replies: 8,
    lastActivity: "2 min ago",
  },
  {
    author: "Michael C.",
    topic: "Guided meditation experiences?",
    time: "10:30 AM",
    avatar: "MC",
    replies: 12,
    lastActivity: "5 min ago",
  },
  {
    author: "Dr. Emily White",
    topic: "Weekly Mindfulness Challenge: Observe your thoughts!",
    time: "9:00 AM",
    avatar: "EW",
    replies: 23,
    lastActivity: "1 hour ago",
  },
];

const Forum = () => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState<ForumMessage[]>(initialMessages);
  const [showActiveThreads, setShowActiveThreads] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [onlineUsers] = useState(47);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate typing indicator
  useEffect(() => {
    if (newMessage.length > 0) {
      setIsTyping(true);
      const timeout = setTimeout(() => setIsTyping(false), 1000);
      return () => clearTimeout(timeout);
    }
  }, [newMessage]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: ForumMessage = {
        id: messages.length + 1,
        author: "You",
        role: "Member",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        avatar: "ME",
        message: newMessage,
        isTherapist: false,
        isCurrentUser: true,
        likes: 0,
        replies: [],
      };

      setMessages((prev) => [...prev, newMsg]);
      setNewMessage("");

      toast({
        title: "Message sent!",
        description: "Your message has been posted to the forum.",
      });

      // Simulate therapist response
      if (
        newMessage.toLowerCase().includes("help") ||
        newMessage.toLowerCase().includes("advice")
      ) {
        setTimeout(() => {
          const therapistResponse: ForumMessage = {
            id: messages.length + 2,
            author: "Dr. Emily White",
            role: "Therapist",
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            avatar: "EW",
            message:
              "Thank you for sharing! Remember that seeking support is a sign of strength. I'd recommend exploring some breathing exercises when you feel overwhelmed. Feel free to reach out anytime.",
            isTherapist: true,
            likes: 0,
            replies: [],
          };
          setMessages((prev) => [...prev, therapistResponse]);
        }, 3000);
      }
    }
  };

  const handleLikeMessage = (messageId: number) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, likes: msg.likes + 1 } : msg,
      ),
    );

    toast({
      title: "Message liked!",
      description: "You've shown support for this message.",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredMessages = messages.filter(
    (msg) =>
      searchQuery === "" ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.author.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
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
              <p className="text-xs text-green-400">Online</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex">
        {/* Forum Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Navigation */}
          <div className="bg-slate-900 border-b border-slate-800 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <h1 className="text-2xl font-bold text-white">
                    Mindful Moments
                  </h1>
                  <ChevronDown className="w-5 h-5 text-slate-400" />
                  <Badge
                    variant="secondary"
                    className="bg-green-600 text-white"
                  >
                    {onlineUsers} online
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-slate-400" />
                  <Bell className="w-4 h-4 text-slate-400" />
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Input
                  placeholder="Search forum topics..."
                  className="w-80 bg-slate-800 border-slate-700 text-white placeholder-slate-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-blue-600 text-white text-sm">
                    JD
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                className="flex items-start space-x-4 group"
              >
                <Avatar className="w-10 h-10">
                  <AvatarFallback
                    className={`text-white text-sm ${
                      message.isTherapist
                        ? "bg-purple-600"
                        : message.isCurrentUser
                          ? "bg-blue-600"
                          : "bg-slate-600"
                    }`}
                  >
                    {message.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold text-white">
                      {message.author}
                    </span>
                    {message.isTherapist && (
                      <Badge className="bg-purple-600 text-white text-xs">
                        Therapist
                      </Badge>
                    )}
                    <span className="text-sm text-slate-400">
                      {message.time}
                    </span>
                  </div>
                  <p className="text-slate-300 leading-relaxed mb-3">
                    {message.message}
                  </p>
                  <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLikeMessage(message.id)}
                      className="text-slate-400 hover:text-blue-400 h-6 px-2"
                    >
                      <ThumbsUp className="w-3 h-3 mr-1" />
                      {message.likes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-blue-400 h-6 px-2"
                    >
                      <Reply className="w-3 h-3 mr-1" />
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center space-x-2 text-slate-400 text-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span>Someone is typing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t border-slate-800 p-6">
            <div className="flex items-end space-x-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 bg-slate-800 rounded-lg p-4">
                  <Paperclip className="w-5 h-5 text-slate-400 cursor-pointer hover:text-white" />
                  <Smile className="w-5 h-5 text-slate-400 cursor-pointer hover:text-white" />
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 bg-transparent border-none text-white placeholder-slate-400 focus:ring-0"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Active Threads */}
        {showActiveThreads && (
          <aside className="w-80 bg-slate-900 border-l border-slate-800 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Active Threads</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowActiveThreads(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {activeThreads.map((thread, index) => (
                <Card
                  key={index}
                  className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors cursor-pointer"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-slate-600 text-white text-xs">
                          {thread.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white text-sm">
                          {thread.author}
                        </p>
                        <p className="text-slate-400 text-sm mt-1 line-clamp-2">
                          {thread.topic}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-slate-500 text-xs">
                            {thread.time}
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-slate-400">
                            <span>{thread.replies} replies</span>
                            <span>•</span>
                            <span>{thread.lastActivity}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Separator className="bg-slate-700 my-6" />

            <div className="text-center">
              <Button
                variant="outline"
                className="border-slate-600 text-slate-300 hover:bg-slate-800 w-full"
              >
                View All Threads
              </Button>
            </div>
          </aside>
        )}
      </main>
    </div>
  );
};

export default Forum;
