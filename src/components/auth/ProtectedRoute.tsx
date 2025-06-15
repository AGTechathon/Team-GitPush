import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lock, Heart, Star, Users, Shield, Zap } from "lucide-react";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import Chatbot from "@/components/chatbot/Chatbot";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

// Define the props for ProtectedRoute component
interface ProtectedRouteProps {
  children: ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
  showAuthPrompt?: boolean;
}

const ProtectedRoute = ({
  children,
  requireAuth = true,
  redirectTo = "/",
  showAuthPrompt = true,
}: ProtectedRouteProps) => {
  // Use auth context to check authentication status and loading state
  const { isAuthenticated, isLoading, login } = useAuth();
  // Use location to preserve navigation state on redirect
  const location = useLocation();
  // State for controlling login and signup modals
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  // Use toast for user feedback on auth actions
  const { toast } = useToast();

  // Show loading spinner while checking auth status
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  // If auth is not required, render children directly
  if (!requireAuth) {
    return <>{children}</>;
  }

  // If authenticated, render children and chatbot
  if (isAuthenticated) {
    return (
      <>
        {children}
        <Chatbot />
      </>
    );
  }

  // If not authenticated and should redirect, redirect to specified path
  if (!showAuthPrompt) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Handle login: authenticate user and provide feedback
  const handleLogin = async (email: string, password: string) => {
    await login(email, password);
    setShowLoginModal(false);
    setTimeout(() => {
      toast({
        title: "Welcome back!",
        description: "You now have access to all RepeatHarmony features.",
      });
    }, 0);
  };

  // Handle signup: authenticate user (simulated) and provide feedback
  const handleSignup = async (
    email: string,
    password: string,
    name: string,
  ) => {
    await login(email, password, name);
    setShowSignupModal(false);
    setTimeout(() => {
      toast({
        title: "Welcome to RepeatHarmony!",
        description: "Your account has been created. Enjoy all our features!",
      });
    }, 0);
  };

  // List of features to showcase in the auth prompt
  const features = [
    {
      icon: Heart,
      title: "Mood Tracking",
      description: "AI-powered emotion analysis",
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with others on similar journeys",
    },
    {
      icon: Star,
      title: "Personalized Therapy",
      description: "Tailored mental wellness sessions",
    },
    {
      icon: Shield,
      title: "Private & Secure",
      description: "Your data is always protected",
    },
  ];

  return (
    <>
      {/* Main auth prompt UI */}
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <Card className="max-w-2xl w-full bg-slate-800 border-slate-700">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>

            <Badge className="bg-blue-600/20 text-blue-300 mb-4 mx-auto">
              Authentication Required
            </Badge>

            <CardTitle className="text-3xl font-bold text-white mb-4">
              Sign in to access this feature
            </CardTitle>

            <CardDescription className="text-slate-400 text-lg">
              Create a free account or sign in to unlock all RepeatHarmony tools
              and start your mental wellness journey.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-8">
            {/* Features grid to highlight app benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-4 bg-slate-700/50 rounded-lg"
                  >
                    <div className="w-10 h-10 bg-blue-600/20 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium">
                        {feature.title}
                      </h3>
                      <p className="text-slate-400 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Benefits section to encourage account creation */}
            <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-lg p-6 border border-blue-500/20">
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="w-5 h-5 text-yellow-400" />
                <h3 className="text-white font-semibold">
                  Why create an account?
                </h3>
              </div>
              <ul className="space-y-2 text-slate-300">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                  <span>Track your mood patterns with AI insights</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  <span>Access personalized therapy sessions</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                  <span>Connect with supportive community</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                  <span>Enjoy curated music for healing</span>
                </li>
              </ul>
            </div>

            {/* Action buttons for signup and login */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => setShowSignupModal(true)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-semibold"
              >
                Create Free Account
              </Button>
              <Button
                onClick={() => setShowLoginModal(true)}
                variant="outline"
                className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700 py-3 text-lg font-semibold"
              >
                Sign In
              </Button>
            </div>

            {/* Footer note for reassurance */}
            <div className="text-center">
              <p className="text-slate-500 text-sm">
                Free forever • No credit card required • 2-minute setup
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Login and signup modals for auth actions */}
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
          onSwitchToSignup={() => {
            setShowLoginModal(false);
            setShowSignupModal(true);
          }}
        />

        <SignupModal
          isOpen={showSignupModal}
          onClose={() => setShowSignupModal(false)}
          onSignup={handleSignup}
          onSwitchToLogin={() => {
            setShowSignupModal(false);
            setShowLoginModal(true);
          }}
        />
      </div>

      {/* Chatbot for additional support on auth prompt page */}
      <Chatbot />
    </>
  );
};

export default ProtectedRoute;
