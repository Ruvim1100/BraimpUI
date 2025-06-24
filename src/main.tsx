import { StrictMode } from "react";
import "./i18n/i18n.ts";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./theme";
import App from "./App.tsx";
import { AuthProvider } from "./auth/AuthProvider.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./api/react-query.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
