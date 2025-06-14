import { Button } from "@/components/ui/button";
import { Heart, Menu, X, Bell, Settings, LogOut, User } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LoginModal from "@/components/auth/LoginModal";
import SignupModal from "@/components/auth/SignupModal";

const HeaderSection = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  const { user, isAuthenticated, login, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Mood Input", href: "/mood-input", protected: true },
    { label: "Mood Music", href: "/mood-music", protected: true },
    { label: "Dashboard", href: "/dashboard", protected: true },
    { label: "Therapy", href: "/therapy", protected: true },
    { label: "Forum", href: "/forum", protected: true },
  ];

  const handleLogin = async (email: string, password: string) => {
    await login(email, password);
    setShowLoginModal(false);

    setTimeout(() => {
      toast({
        title: `Welcome back, ${user?.name || "User"}!`,
        description: "You've been successfully logged in.",
      });
    }, 0);
  };

  const handleSignup = async (
    email: string,
    password: string,
    name: string,
  ) => {
    await login(email, password, name);
    setShowSignupModal(false);

    setTimeout(() => {
      toast({
        title: `Welcome to RepeatHarmony, ${name}!`,
        description: "Your account has been created successfully.",
      });
    }, 0);
  };

  const handleSignOut = () => {
    logout();

    setTimeout(() => {
      toast({
        title: "Signed out",
        description: "You've been signed out successfully.",
      });
    }, 0);

    navigate("/");
  };

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/mood-input");
    } else {
      setShowSignupModal(true);
    }
  };

  const handleProtectedLinkClick = (href: string, isProtected: boolean) => {
    if (isProtected && !isAuthenticated) {
      setTimeout(() => {
        toast({
          title: "Authentication Required",
          description: "Please sign in to access this feature.",
          variant: "destructive",
        });
      }, 0);
      setShowLoginModal(true);
      return false;
    }
    return true;
  };

  const handleNotificationClick = () => {
    if (!isAuthenticated) {
      setTimeout(() => {
        toast({
          title: "Sign in Required",
          description: "Please sign in to view notifications.",
          variant: "destructive",
        });
      }, 0);
      setShowLoginModal(true);
      return;
    }

    setNotifications(0);
    setTimeout(() => {
      toast({
        title: "Notifications",
        description: "You have new therapy suggestions and forum messages!",
      });
    }, 0);
  };

  const switchToSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const switchToLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <>
      <header className="fixed top-0 w-full bg-slate-900/95 backdrop-blur-sm border-b border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <Heart className="w-8 h-8 text-blue-400" />
              <span className="text-xl font-bold text-white">
                RepeatHarmony
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  onClick={(e) => {
                    if (
                      !handleProtectedLinkClick(
                        link.href,
                        link.protected || false,
                      )
                    ) {
                      e.preventDefault();
                    }
                  }}
                  className={`transition-colors duration-200 font-medium relative ${
                    isActive(link.href)
                      ? "text-blue-400"
                      : "text-slate-300 hover:text-blue-400"
                  } ${link.protected && !isAuthenticated ? "opacity-60" : ""}`}
                >
                  {link.label}
                  {link.protected && !isAuthenticated && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full"></span>
                  )}
                  {isActive(link.href) && (
                    <div className="absolute -bottom-4 left-0 right-0 h-0.5 bg-blue-400 rounded-full"></div>
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated && user ? (
                <>
                  {/* Notifications */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-300 hover:text-white relative"
                    onClick={handleNotificationClick}
                  >
                    <Bell className="w-5 h-5" />
                    {notifications > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                        {notifications}
                      </span>
                    )}
                  </Button>

                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-8 w-8 rounded-full"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-blue-600 text-white">
                            {user.initials}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56 bg-slate-800 border-slate-700 text-white"
                      align="end"
                    >
                      <div className="flex items-center justify-start gap-2 p-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-blue-600 text-white">
                            {user.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col space-y-1 leading-none">
                          <p className="font-medium">{user.name}</p>
                          <p className="w-[200px] truncate text-sm text-slate-400">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <DropdownMenuSeparator className="bg-slate-700" />
                      <DropdownMenuItem
                        className="hover:bg-slate-700 cursor-pointer"
                        onClick={() => navigate("/dashboard")}
                      >
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="hover:bg-slate-700 cursor-pointer"
                        onClick={() => navigate("/dashboard")}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-slate-700" />
                      <DropdownMenuItem
                        className="hover:bg-slate-700 cursor-pointer text-red-400"
                        onClick={handleSignOut}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    className="text-slate-300 hover:text-white"
                    onClick={() => setShowLoginModal(true)}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={handleGetStarted}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-slate-300 hover:text-white transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-slate-800 py-4 animate-in slide-in-from-top duration-200">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.href}
                    onClick={(e) => {
                      if (
                        !handleProtectedLinkClick(
                          link.href,
                          link.protected || false,
                        )
                      ) {
                        e.preventDefault();
                      } else {
                        setIsMenuOpen(false);
                      }
                    }}
                    className={`transition-colors duration-200 font-medium px-2 py-1 rounded flex items-center justify-between ${
                      isActive(link.href)
                        ? "text-blue-400 bg-blue-600/10"
                        : "text-slate-300 hover:text-blue-400 hover:bg-slate-800"
                    } ${link.protected && !isAuthenticated ? "opacity-60" : ""}`}
                  >
                    <span>{link.label}</span>
                    {link.protected && !isAuthenticated && (
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    )}
                  </Link>
                ))}

                <div className="flex flex-col space-y-2 pt-4 border-t border-slate-800">
                  {isAuthenticated && user ? (
                    <>
                      <div className="flex items-center space-x-3 px-2 py-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-blue-600 text-white">
                            {user.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-white font-medium">{user.name}</p>
                          <p className="text-slate-400 text-sm">{user.email}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        className="text-slate-300 hover:text-white justify-start"
                        onClick={() => {
                          handleNotificationClick();
                          setIsMenuOpen(false);
                        }}
                      >
                        <Bell className="w-4 h-4 mr-2" />
                        Notifications
                        {notifications > 0 && (
                          <span className="ml-auto w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                            {notifications}
                          </span>
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        className="text-slate-300 hover:text-white justify-start"
                        onClick={() => {
                          navigate("/dashboard");
                          setIsMenuOpen(false);
                        }}
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Button>
                      <Button
                        variant="ghost"
                        className="text-red-400 hover:text-red-300 justify-start"
                        onClick={() => {
                          handleSignOut();
                          setIsMenuOpen(false);
                        }}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        className="text-slate-300 hover:text-white justify-start"
                        onClick={() => {
                          setShowLoginModal(true);
                          setIsMenuOpen(false);
                        }}
                      >
                        Sign In
                      </Button>
                      <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white justify-start"
                        onClick={() => {
                          handleGetStarted();
                          setIsMenuOpen(false);
                        }}
                      >
                        Get Started
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Auth Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
        onSwitchToSignup={switchToSignup}
      />

      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSignup={handleSignup}
        onSwitchToLogin={switchToLogin}
      />
    </>
  );
};

export default HeaderSection;
