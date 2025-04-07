import ThemeProvider from "@/components/ui/ThemeProvider";
import { AuthProvider } from "@/hooks/useAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ThemeProvider>
          <Slot />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
