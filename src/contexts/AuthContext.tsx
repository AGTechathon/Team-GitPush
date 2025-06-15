// =============================================================
// AuthContext: User Authentication State Management
// =============================================================

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define user data interface
interface User {
  id: string;
  name: string;
  email: string;
  initials: string;
  joinedAt: string;
}

// Define authentication context type for type safety
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

// Create context with initial undefined value for type safety
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook to access authentication context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// AuthProvider props interface
interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component to manage authentication state and provide it to children
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // On mount, check for existing user data in localStorage
  useEffect(() => {
    const checkAuth = () => {
      try {
        const storedUser = localStorage.getItem("repeatharmony_user");
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        }
      } catch (error) {
        console.error("Auth check error:", error);
        localStorage.removeItem("repeatharmony_user");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function to authenticate user and store data in localStorage
  const login = async (email: string, password: string, name?: string) => {
    setIsLoading(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Extract name from email if not provided
    const displayName =
      name ||
      email
        .split("@")[0]
        .split(".")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");

    // Generate initials from display name
    const initials = displayName
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .substring(0, 2);

    // Create user data object
    const userData: User = {
      id: Date.now().toString(),
      name: displayName,
      email,
      initials,
      joinedAt: new Date().toISOString(),
    };

    // Store user data in localStorage
    localStorage.setItem("repeatharmony_user", JSON.stringify(userData));
    setUser(userData);
    setIsLoading(false);
  };

  // Logout function to clear user data from localStorage and state
  const logout = () => {
    localStorage.removeItem("repeatharmony_user");
    setUser(null);
  };

  // Provide authentication context to children
  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
