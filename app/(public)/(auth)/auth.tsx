import { useRouter } from "expo-router";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const LoggedOutScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={{
          uri: "/assets/images/background-floated-right.webp",
        }}
        style={styles.backgroundImage}
      >
        <View style={styles.content}>
          <View>
            <Text style={styles.title}>Welcome to Yiqi</Text>
            <Text style={styles.subtitle}>
              Unforgettable moments begin here
            </Text>
          </View>
          <View style={styles.btns}>
            <TouchableOpacity
              style={styles.buttonContainer}
              onPress={() => router.push("/")}
            >
              <LinearGradient
                colors={["#6de4e8", "rgba(0, 178, 218, .6)"]}
                start={[0, 0.5]}
                end={[1, 0.5]}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Sign In</Text>
              </LinearGradient>
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={() => router.push("/")}
              >
                <Text style={[styles.buttonText, styles.secondaryButtonText]}>
                  Create Account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  content: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
    zIndex: 1,
  },
  btns: {
    width: "100%",
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#ffffff",
  },
  subtitle: {
    fontSize: 18,
    color: "#ffffff",
    marginBottom: 60,
    textAlign: "center",
  },
  buttonContainer: {
    width: "80%",
    maxWidth: 300,
    marginBottom: 5,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  secondaryButtonText: {
    color: "#ffffff",
  },
});

export default LoggedOutScreen;
