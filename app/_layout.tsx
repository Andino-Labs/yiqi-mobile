import {useColorScheme} from "@/hooks/useColorScheme.web";
import {DarkTheme, DefaultTheme, ThemeProvider} from "@react-navigation/native";
import {useFonts} from "expo-font";
import {Stack} from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import {useEffect, useState} from "react";
import "react-native-reanimated";
import trpc from "@/constants/trpc";
import SuperJSON from "superjson";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {httpBatchLink} from "@trpc/client";
import * as SecureStore from "expo-secure-store";
import {secureStorageKeys} from "@/constants/SecureStore";
import {API} from "@/constants/apis";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());

  const [trpcClient] = useState(() =>
    trpc.createClient({
      transformer: SuperJSON,
      links: [
        httpBatchLink({
          url: API + "/api/trpc",
          headers: async () => {
            const token =
              (await SecureStore.getItemAsync(secureStorageKeys.TOKEN)) ?? "";

            return {
              authorization: `Bearer ${token}`,
            };
          },
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
              options={{headerShown: false}}
            />
            <Stack.Screen name="private/index" options={{headerShown: false}} />
            <Stack.Screen name="login" options={{headerShown: false}} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </QueryClientProvider>
      </trpc.Provider>
    </ThemeProvider>
  );
}
