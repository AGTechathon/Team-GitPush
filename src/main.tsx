// Import createRoot from react-dom/client for React 18+ concurrent rendering
import { createRoot } from "react-dom/client";

// Import the main App component
import App from "./App.tsx";

// Import global styles for the application
import "./index.css";

// Use createRoot to initialize the React application at the root DOM element
// The '!' asserts that document.getElementById("root") will not be null
createRoot(document.getElementById("root")!).render(<App />);
