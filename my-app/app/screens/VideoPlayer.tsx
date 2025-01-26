import type React from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { WebView } from "react-native-webview";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const videoHeight = width * 0.5625; // 16:9 aspect ratio

const VideoPlayer: React.FC = () => {
  const { videoId } = useLocalSearchParams<{ videoId: string }>();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const router = useRouter();

  if (!videoId) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error: No video selected</Text>
      </View>
    );
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerLeft: () => (
            <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="white" />
              <Text style={styles.backButtonText}>BACK</Text>
            </TouchableOpacity>
          ),
          headerTitle: "Video Player",
          headerStyle: { backgroundColor: "#000" },
          headerTintColor: "#fff",
        }}
      />
      <View
        style={[styles.videoContainer, isFullscreen && styles.fullscreenVideo]}
      >
        <WebView
          style={styles.webview}
          source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
          javaScriptEnabled={true}
          allowsFullscreenVideo={true}
        />
      </View>
      <View style={styles.controlsContainer}>
        <TouchableOpacity
          onPress={toggleFullscreen}
          style={styles.controlButton}
        >
          <Ionicons
            name={isFullscreen ? "contract" : "expand"}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  videoContainer: {
    width: width,
    height: videoHeight,
  },
  fullscreenVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  webview: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  errorText: {
    color: "white",
    fontSize: 16,
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 10,
  },
  controlButton: {
    padding: 10,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  backButtonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 5,
  },
});

export default VideoPlayer;
