import ThemeProvider from "@/components/ui/ThemeProvider";

import { Slot } from "expo-router";

import Tabs from "@/components/ui/Tabs";

export default function Layout() {
    return (
        <ThemeProvider>
            <Slot />
        </ThemeProvider>
  );
}
