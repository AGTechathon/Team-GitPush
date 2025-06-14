import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Eye, EyeOff, Mail, Lock, Heart, Github, Chrome } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => void;
  onSwitchToSignup: () => void;
  trigger?: React.ReactNode;
}

const LoginModal = ({
  isOpen,
  onClose,
  onLogin,
  onSwitchToSignup,
  trigger,
}: LoginModalProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setTimeout(() => {
        toast({
          title: "Missing Information",
          description: "Please fill in all fields.",
          variant: "destructive",
        });
      }, 0);
      return;
    }

    setIsLoading(true);

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      onLogin(email, password);
      setEmail("");
      setPassword("");
      onClose();

      setTimeout(() => {
        toast({
          title: "Welcome back!",
          description: "You've been successfully logged in.",
        });
      }, 0);
    }, 1500);
  };

  const handleSocialLogin = (provider: string) => {
    setTimeout(() => {
      toast({
        title: `${provider} Login`,
        description: `Logging in with ${provider}...`,
      });
    }, 0);

    // Simulate social login
    setTimeout(() => {
      onLogin(`user@${provider.toLowerCase()}.com`, "social_login");
      onClose();
    }, 2000);
  };

  const content = (
    <Card className="bg-slate-800 border-slate-700 w-full max-w-md">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Heart className="w-8 h-8 text-blue-400 mr-2" />
          <span className="text-2xl font-bold text-white">RepeatHarmony</span>
        </div>
        <CardTitle className="text-2xl text-white">Welcome Back</CardTitle>
        <CardDescription className="text-slate-400">
          Sign in to continue your wellness journey
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Social Login Buttons */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
            onClick={() => handleSocialLogin("Google")}
            disabled={isLoading}
          >
            <Chrome className="w-4 h-4 mr-2" />
            Continue with Google
          </Button>
          <Button
            variant="outline"
            className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
            onClick={() => handleSocialLogin("GitHub")}
            disabled={isLoading}
          >
            <Github className="w-4 h-4 mr-2" />
            Continue with GitHub
          </Button>
        </div>

        <div className="relative">
          <Separator className="bg-slate-600" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-slate-800 px-2 text-slate-400 text-sm">or</span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">
              Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-slate-900 border-slate-600 text-white placeholder-slate-400"
                disabled={isLoading}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-300">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 bg-slate-900 border-slate-600 text-white placeholder-slate-400"
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-slate-600 bg-slate-900"
                disabled={isLoading}
              />
              <Label htmlFor="remember" className="text-sm text-slate-400">
                Remember me
              </Label>
            </div>
            <Button
              variant="link"
              className="text-blue-400 hover:text-blue-300 p-0 h-auto"
              disabled={isLoading}
              onClick={() => {
                setTimeout(() => {
                  toast({
                    title: "Password Reset",
                    description: "Password reset link sent to your email.",
                  });
                }, 0);
              }}
            >
              Forgot password?
            </Button>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        <div className="text-center">
          <span className="text-slate-400">Don't have an account? </span>
          <Button
            variant="link"
            className="text-blue-400 hover:text-blue-300 p-0 h-auto"
            onClick={onSwitchToSignup}
            disabled={isLoading}
          >
            Sign up
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  if (trigger) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className="bg-transparent border-none shadow-none p-0 max-w-md">
          {content}
        </DialogContent>
      </Dialog>
    );
  }

  return isOpen ? (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md">{content}</div>
    </div>
  ) : null;
};

export default LoginModal;
