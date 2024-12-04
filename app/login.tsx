import React, {useRef, useState} from "react";
import {SafeAreaView, TouchableOpacity, Linking} from "react-native";

import {ThemedText} from "@/components/ThemedText";
import {ThemedView} from "@/components/ThemedView";
import {useAuth} from "@/hooks/useAuth";
import LogoSvg from "@/assets/svgs/LogoSvg";
import LinkedInSvg from "@/assets/svgs/LinkedInSvg";
import GoogleSvg from "@/assets/svgs/GoogleSvg";
import LinkedInModal from "@/components/LinkedInModal";

export default function Login() {
  const {onGoogleLogin, onLinkedInLogin} = useAuth();
  // Open Support URL
  const onSupportPress = () => {
    Linking.openURL("https://wa.me/51943056060").catch((err) =>
      console.error("Failed to open support URL:", err)
    );
  };
  const [linkedInModalVisible, setLinkedInModalVisible] = useState(false);
  const handleLinkedInBtnClicked = async () => {
    setLinkedInModalVisible(true);
  };

  const handleLinkedInLoginCancel = () => {
    console.log("handleLinkedInLoginCancel");

    setLinkedInModalVisible(false);
  };

  const handleLinkedInLoginSuccess = async (authrozationCode: string) => {
    setLinkedInModalVisible(false);
    if (authrozationCode) {
      await onLinkedInLogin(authrozationCode);
    } else {
      console.log("cannot_get_access_token");
    }
  };

  return (
    <SafeAreaView className="bg-black flex-1 justify-center items-center px-5">
      <ThemedView
        className="bg-gray-900"
        style={{borderRadius: 10, padding: 10}}
      >
        <ThemedView className="bg-gray-900 items-center mb-8">
          <LogoSvg
            height={100}
            width={100}
            // fill={theme === "light" ? "black" : "white"}
          />
          <ThemedText className="text-white text-xl font-semibold">
            Welcome to Yiqi
          </ThemedText>
          <ThemedText className="text-gray-400 text-sm">
            Please sign in or sign up below
          </ThemedText>
        </ThemedView>

        {/* Google Login */}
        <TouchableOpacity
          onPress={onGoogleLogin}
          className="bg-black py-3 rounded-md flex-row justify-center items-center mb-4"
        >
          <GoogleSvg />
          <ThemedText className="font-medium text-white ml-2">
            Log in with Google
          </ThemedText>
        </TouchableOpacity>

        {/* LinkedIn Login */}
        <TouchableOpacity
          onPress={handleLinkedInBtnClicked}
          className="bg-black py-3 rounded-md flex-row justify-center items-center"
        >
          <LinkedInSvg />
          <ThemedText className="font-medium text-white ml-2">
            Log in with LinkedIn
          </ThemedText>
        </TouchableOpacity>

        {/* Support */}
        <ThemedText className="text-gray-400 text-sm mt-8 text-center">
          In case of problems logging in, please contact{" "}
          <TouchableOpacity onPress={onSupportPress}>
            <ThemedText className="text-blue-400">technical support</ThemedText>
          </TouchableOpacity>
        </ThemedText>
      </ThemedView>
      <LinkedInModal
        isVisible={linkedInModalVisible}
        onLoginCancel={handleLinkedInLoginCancel}
        onLoginSuccess={handleLinkedInLoginSuccess}
      />
    </SafeAreaView>
  );
}
