import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Events from "./pages/Events";
import Login from "./pages/Login";
import Council from "./pages/Council";
import Documents from "./pages/Documents";
import Support from "./pages/Support";
import Contacts from "./pages/Contacts";
import Profile from "./pages/Profile";
import UserManagement from "./pages/UserManagement";
import { supabase } from "./integrations/supabase/client";
import { ChatWidget } from "./components/ChatWidget";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <SessionContextProvider supabaseClient={supabase}>
          <BrowserRouter>
            <ChatWidget />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/events" element={<Events />} />
              <Route path="/login" element={<Login />} />
              <Route path="/council" element={<Council />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/support" element={<Support />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/user-management" element={<UserManagement />} />
            </Routes>
          </BrowserRouter>
        </SessionContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;