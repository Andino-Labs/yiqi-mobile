import { useColorScheme } from "@/hooks/useColorScheme.web";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import trpc from "@/constants/trpc";
import SuperJSON from "superjson";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/api/trpc",
          transformer: SuperJSON,
          headers: () => ({
            authorization: "add the cookie here",
          }),
        }),
      ],
    })
  );
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Stack>
            <Stack.Screen
              name="(public)/index"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="private/index"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
        </QueryClientProvider>
      </trpc.Provider>
    </ThemeProvider>
  );
}
