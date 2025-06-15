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
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Heart,
  Github,
  Chrome,
  Check,
  X,
} from "lucide-react";

// Define the props for the SignupModal component
interface SignupModalProps {
  isOpen: boolean; // Controls modal visibility
  onClose: () => void; // Callback to close modal
  onSignup: (email: string, password: string, name: string) => void; // Callback for signup
  onSwitchToLogin: () => void; // Callback to switch to login
  trigger?: React.ReactNode; // Optional trigger for dialog
}

// Main SignupModal component
const SignupModal = ({
  isOpen,
  onClose,
  onSignup,
  onSwitchToLogin,
  trigger,
}: SignupModalProps) => {
  // State for form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  // State for showing/hiding password
  const [showPassword, setShowPassword] = useState(false);
  // State for showing/hiding confirm password
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // State for loading status
  const [isLoading, setIsLoading] = useState(false);
  // State for terms agreement
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  // Toast notification hook
  const { toast } = useToast();

  // Function to calculate password strength
  const passwordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (/[a-z]/.test(password)) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    return strength;
  };

  // List of password requirements and whether they are met
  const passwordRequirements = [
    { text: "At least 8 characters", met: formData.password.length >= 8 },
    { text: "One lowercase letter", met: /[a-z]/.test(formData.password) },
    { text: "One uppercase letter", met: /[A-Z]/.test(formData.password) },
    { text: "One number", met: /[0-9]/.test(formData.password) },
  ];

  // Handle input field changes
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Handle signup form submission
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setTimeout(() => {
        toast({
          title: "Missing Information",
          description: "Please fill in all fields.",
          variant: "destructive",
        });
      }, 0);
      return;
    }

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setTimeout(() => {
        toast({
          title: "Password Mismatch",
          description: "Passwords do not match.",
          variant: "destructive",
        });
      }, 0);
      return;
    }

    // Validate password strength
    if (passwordStrength(formData.password) < 75) {
      setTimeout(() => {
        toast({
          title: "Weak Password",
          description: "Please choose a stronger password.",
          variant: "destructive",
        });
      }, 0);
      return;
    }

    // Validate terms agreement
    if (!agreeToTerms) {
      setTimeout(() => {
        toast({
          title: "Terms Agreement Required",
          description: "Please agree to the terms and conditions.",
          variant: "destructive",
        });
      }, 0);
      return;
    }

    // Start loading
    setIsLoading(true);

    // Simulate signup process with delay
    setTimeout(() => {
      setIsLoading(false);
      // Call parent signup handler with form data
      onSignup(formData.email, formData.password, formData.name);
      // Reset form
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
      // Close modal
      onClose();

      // Show success toast
      setTimeout(() => {
        toast({
          title: "Welcome to RepeatHarmony!",
          description: "Your account has been created successfully.",
        });
      }, 0);
    }, 2000);
  };

  // Handle social signup (Google, GitHub)
  const handleSocialSignup = (provider: string) => {
    setTimeout(() => {
      toast({
        title: `${provider} Signup`,
        description: `Creating account with ${provider}...`,
      });
    }, 0);

    // Simulate social signup with delay
    setTimeout(() => {
      onSignup(
        `user@${provider.toLowerCase()}.com`,
        "social_signup",
        `${provider} User`,
      );
      onClose();
    }, 2000);
  };

  // Calculate password strength and color/text for UI
  const strength = passwordStrength(formData.password);
  const strengthColor =
    strength < 25
      ? "bg-red-500"
      : strength < 50
        ? "bg-orange-500"
        : strength < 75
          ? "bg-yellow-500"
          : "bg-green-500";
  const strengthText =
    strength < 25
      ? "Weak"
      : strength < 50
        ? "Fair"
        : strength < 75
          ? "Good"
          : "Strong";

  // Main modal content JSX
  const content = (
    <Card className="bg-slate-800 border-slate-700 w-full max-w-md">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Heart className="w-8 h-8 text-blue-400 mr-2" />
          <span className="text-2xl font-bold text-white">RepeatHarmony</span>
        </div>
        <CardTitle className="text-2xl text-white">Create Account</CardTitle>
        <CardDescription className="text-slate-400">
          Start your mental wellness journey today
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Social Signup Buttons */}
        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
            onClick={() => handleSocialSignup("Google")}
            disabled={isLoading}
          >
            <Chrome className="w-4 h-4 mr-2" />
            Sign up with Google
          </Button>
          <Button
            variant="outline"
            className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
            onClick={() => handleSocialSignup("GitHub")}
            disabled={isLoading}
          >
            <Github className="w-4 h-4 mr-2" />
            Sign up with GitHub
          </Button>
        </div>

        <div className="relative">
          <Separator className="bg-slate-600" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-slate-800 px-2 text-slate-400 text-sm">or</span>
          </div>
        </div>

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-slate-300">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="pl-10 bg-slate-900 border-slate-600 text-white placeholder-slate-400"
                disabled={isLoading}
                required
              />
            </div>
          </div>

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
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
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
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
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

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Password strength
                  </span>
                  <span
                    className={`text-xs font-medium ${strengthColor.replace("bg-", "text-")}`}
                  >
                    {strengthText}
                  </span>
                </div>
                <Progress value={strength} className="h-1" />

                {/* Password Requirements */}
                <div className="grid grid-cols-2 gap-1 text-xs">
                  {passwordRequirements.map((req, index) => (
                    <div
                      key={index}
                      className={`flex items-center space-x-1 ${req.met ? "text-green-400" : "text-slate-500"}`}
                    >
                      {req.met ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <X className="w-3 h-3" />
                      )}
                      <span>{req.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-slate-300">
              Confirm Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                className="pl-10 pr-10 bg-slate-900 border-slate-600 text-white placeholder-slate-400"
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                disabled={isLoading}
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {formData.confirmPassword &&
              formData.password !== formData.confirmPassword && (
                <p className="text-red-400 text-xs">Passwords do not match</p>
              )}
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.target.checked)}
              className="rounded border-slate-600 bg-slate-900"
              disabled={isLoading}
            />
            <Label htmlFor="terms" className="text-sm text-slate-400">
              I agree to the{" "}
              <Button
                variant="link"
                className="text-blue-400 hover:text-blue-300 p-0 h-auto text-sm"
                disabled={isLoading}
              >
                Terms & Conditions
              </Button>
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

        <div className="text-center">
          <span className="text-slate-400">Already have an account? </span>
          <Button
            variant="link"
            className="text-blue-400 hover:text-blue-300 p-0 h-auto"
            onClick={onSwitchToLogin}
            disabled={isLoading}
          >
            Sign in
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // If a trigger is provided, render the modal as a dialog
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

  // Otherwise, render a full-screen modal overlay
  return isOpen ? (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md">{content}</div>
    </div>
  ) : null;
};

export default SignupModal;
