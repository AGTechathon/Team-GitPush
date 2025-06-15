// =============================================================
// App Component: Core Application Structure and Providers
// =============================================================

// Importing notification components for user feedback
import { Toaster } from "@/components/ui/toaster";         // Standard toast notifications
import { Toaster as Sonner } from "@/components/ui/sonner"; // Alternative toast notifications

// Tooltip provider for tooltips across the app UI
import { TooltipProvider } from "@/components/ui/tooltip";

// React Query for data fetching and caching
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// React Router for client-side routing and navigation
import { BrowserRouter, Routes, Route } from "react-router-dom";

// AuthProvider to manage user authentication state
import { AuthProvider } from "@/contexts/AuthContext";

// ProtectedRoute component for guarding authenticated-only routes
import ProtectedRoute from "@/components/auth/ProtectedRoute";

// Importing page components
import Index from "./pages/Index";         // Public home page
import MoodMusic from "./pages/MoodMusic"; // Mood-based music recommendations (protected)
import MoodInput from "./pages/MoodInput"; // Mood input form (protected)
import Dashboard from "./pages/Dashboard"; // User dashboard (protected)
import Therapy from "./pages/Therapy";     // Therapy resources (protected)
import Forum from "./pages/Forum";         // Community forum (protected)
import NotFound from "./pages/NotFound";   // 404 Not Found page

// Initialize React Query client for managing server state and caching
const queryClient = new QueryClient();

/**
 * Main App component that wraps the entire application with providers and routing.
 * This ensures a consistent, secure, and responsive user experience across all pages.
 */
const App = () => (
  // Provide React Query client to the whole app for data management
  <QueryClientProvider client={queryClient}>
    {/* TooltipProvider enables tooltips throughout the application */}
    <TooltipProvider>
      {/* AuthProvider manages authentication state for all components */}
      <AuthProvider>
        {/* Display toast notifications to users for feedback and alerts */}
        <Toaster />
        <Sonner />
        {/* BrowserRouter enables client-side routing and navigation */}
        <BrowserRouter>
          {/* Routes define the navigation structure for the application */}
          <Routes>
            {/* Public Routes - accessible to all users, no login required */}
            <Route path="/" element={<Index />} />

            {/* Protected Routes - accessible only to authenticated users */}
            <Route
              path="/mood-music"
              element={
                <ProtectedRoute>
                  <MoodMusic />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mood-input"
              element={
                <ProtectedRoute>
                  <MoodInput />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/therapy"
              element={
                <ProtectedRoute>
                  <Therapy />
                </ProtectedRoute>
              }
            />
            <Route
              path="/forum"
              element={
                <ProtectedRoute>
                  <Forum />
                </ProtectedRoute>
              }
            />

            {/* Catch-all route for undefined paths - shows 404 Not Found page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
