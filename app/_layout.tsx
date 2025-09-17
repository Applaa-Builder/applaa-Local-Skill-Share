import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc, trpcClient } from "@/lib/trpc";

// Create a client
const queryClient = new QueryClient();

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

// User auth store
interface AuthState {
  isLoggedIn: boolean;
  hasCompletedOnboarding: boolean;
  userId: string | null;
  login: (userId: string) => void;
  logout: () => void;
  completeOnboarding: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      hasCompletedOnboarding: false,
      userId: null,
      login: (userId) => set({ isLoggedIn: true, userId }),
      logout: () => set({ isLoggedIn: false, userId: null }),
      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <RootLayoutNav />
      </QueryClientProvider>
    </trpc.Provider>
  );
}

function RootLayoutNav() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerBackTitle: "Back" }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="modal" 
          options={{ 
            presentation: "modal",
            title: "About Skills Exchange"
          }} 
        />
        <Stack.Screen 
          name="skill/[id]" 
          options={{ 
            title: "Skill Details",
            headerTitleStyle: { fontSize: 18 }
          }} 
        />
        <Stack.Screen 
          name="booking/new" 
          options={{ 
            title: "Book a Session",
            headerTitleStyle: { fontSize: 18 }
          }} 
        />
        <Stack.Screen 
          name="profile/[id]" 
          options={{ 
            title: "User Profile",
            headerTitleStyle: { fontSize: 18 }
          }} 
        />
        <Stack.Screen 
          name="onboarding" 
          options={{ 
            headerShown: false,
            gestureEnabled: false
          }} 
        />
      </Stack>
    </>
  );
}