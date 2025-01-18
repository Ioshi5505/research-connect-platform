import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import News from "./pages/News";
import Events from "./pages/Events";
import Login from "./pages/Login";
import Council from "./pages/Council";
import Documents from "./pages/Documents";
import Support from "./pages/Support";
import Contacts from "./pages/Contacts";
import Profile from "./pages/Profile";
import { NewsManagement } from "./components/NewsManagement";
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
              <Route path="/news" element={<News />} />
              <Route path="/news/manage" element={<NewsManagement />} />
              <Route path="/events" element={<Events />} />
              <Route path="/login" element={<Login />} />
              <Route path="/council" element={<Council />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/support" element={<Support />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </BrowserRouter>
        </SessionContextProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;