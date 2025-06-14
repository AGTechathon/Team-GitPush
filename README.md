# 🚀 Fusion Starter

**A Modern, Production-Ready Template for Full-Stack React Apps with React Router & TypeScript**

<div align="center">

![Fusion Starter UI Example](https://via.placeholder.com/800x400?text=Fusion+Starter+UI+Example)
*Replace with your project screenshot*

</div>

---

## ✨ Why Choose Fusion Starter?

**Fusion Starter** is designed for developers who want a powerful, flexible, and beautiful foundation for building modern web applications.  
With built-in **TypeScript, TailwindCSS, Radix UI, and Vite**, you get fast builds, robust typing, and gorgeous design out of the box.

---

## 🛠️ Core Technologies

| Tech            | Purpose                                 |
|-----------------|-----------------------------------------|
| **React 18**    | Modern UI library                       |
| **TypeScript**  | Type safety & developer experience      |
| **Vite**        | Blazing fast bundler & dev server       |
| **TailwindCSS** | Utility-first CSS styling               |
| **Vitest**      | Fast, modern test runner                |
| **React Router**| Client-side routing                     |
| **Radix UI**    | Accessible UI primitives                |
| **Lucide React**| Beautiful icon set                      |

---

## 📂 Project Structure

app/
├── components/ # Reusable UI components
│ └── ui/ # Core UI component library
├── routes/ # Route components and logic
├── app.css # Global styles
├── root.tsx # Root layout and error boundary
└── routes.ts # Route configuration


---

## 🚦 Routing System

**React Router 7** powers your app’s navigation.

Define your routes in `src/App.tsx`:

import { BrowserRouter, Routes, Route } from "react-router-dom";

<Routes> <Route path="/" element={<Index />} /> {/* Add all custom routes above the catch-all "*" route */} <Route path="*" element={<NotFound />} /> </Routes> ```

🎨 Styling System
TailwindCSS 3 is the backbone of your design.
Customize your theme in tailwind.config.ts.
Use utility classes for rapid UI development.

Dark mode is supported out of the box via CSS variables.

🖌️ UI Component Library
<div align="center">
UI Component Showcase
Replace with your UI component screenshot

</div>
Radix UI: Accessible, unstyled primitives

Lucide React: Modern icons

Pre-styled components: Carousels, calendars, alerts, and more

Class Name Utility (cn):

text
import { cn } from "@/lib/utils";

function CustomComponent(props) {
  return (
    <div
      className={cn(
        "flex items-center rounded-md transition-all duration-200",
        {
          "text-xs p-1.5 gap-1": props.size === "sm",
          "text-base p-3.5 gap-3": props.size === "lg",
          "w-full": isFullWidth,
          "w-auto": !isFullWidth,
        },
        props.hasError && "border-red-500 text-red-700 bg-red-50",
        props.className
      )}
    />
  );
}
🧪 Testing
Vitest provides a fast, Jest-like testing experience.
Write your tests in .spec.ts files next to your utilities.

text
npm test  # Run all tests
🏗️ Development Workflow
Command	Description
npm run dev	Start dev server
npm run build	Build for production
npm run typecheck	Check TypeScript types
npm test	Run all tests
🖼️ UI Showcase
<div align="center">
Dashboard Example
Replace with your dashboard screenshot

Dark Mode Example
Replace with your dark mode screenshot

</div>
🚀 Getting Started
Clone the repo

text
git clone https://github.com/your-username/fusion-starter.git
cd fusion-starter
Install dependencies

text
npm install
Start developing

text
npm run dev
📝 License
MIT License




