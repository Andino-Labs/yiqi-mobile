import {useRouter} from "expo-router";
import {useEffect} from "react";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import trpc from "@/constants/trpc";
import {secureStorageKeys} from "@/constants/SecureStore";
import * as SecureStore from "expo-secure-store";

export function useAuth() {
  const configGoogleSignIn = () => {
    GoogleSignin.configure({
      offlineAccess: false,
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
    });
  };

  useEffect(() => {
    configGoogleSignIn();
  }, []);
  const loginGoogle = trpc.loginGoogle.useMutation();
  const loginLinkedIn = trpc.loginLinkedin.useMutation();

  const router = useRouter();
  // Handle Google Login
  const onGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (userInfo?.data && userInfo.data.idToken) {
        const idToken = userInfo.data.idToken;

        const {sessionId} = await loginGoogle.mutateAsync({idToken});
        if (typeof sessionId === "string" && sessionId !== "") {
          await SecureStore.setItemAsync(secureStorageKeys.TOKEN, sessionId);
        }
        router.back();
      } else {
        throw new Error("Google ID Token not received");
      }
    } catch (error) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          console.error("User canceled the login process.");
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.error("Google Play Services are not available.");
          break;
        default:
          break;
      }
    }
  };

  // Handle LinkedIn Login
  const onLinkedInLogin = async (code: string) => {
    try {
      if (code) {
        const response = (await loginLinkedIn.mutateAsync({code})) as {
          sessionId: string;
        };
        if (
          typeof response.sessionId === "string" &&
          response.sessionId !== ""
        ) {
          await SecureStore.setItemAsync(
            secureStorageKeys.TOKEN,
            response.sessionId
          );
        }

        router.back();
      }
    } catch (err) {
      console.error("Error during LinkedIn login:", err);
    }
  };
  return {onLinkedInLogin, onGoogleLogin};
}
