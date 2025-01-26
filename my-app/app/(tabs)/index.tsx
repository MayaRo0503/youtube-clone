import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "@/components/ytComponents/TopBar";
import FilterBar from "@/components/ytComponents/FilterBar";
import { router } from "expo-router";

const API_KEY = process.env.EXPO_PUBLIC_YOUTUBE_API_KEY;
const API_URL = process.env.EXPO_PUBLIC_YOUTUBE_API_URL;

type VideoItem = {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
};

const index = () => {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("popular");

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${API_URL}?part=snippet&maxResults=10&q=${selectedCategory}&type=video&key=${API_KEY}`
        );
        const data = await response.json();
        if (response.ok) {
          setVideos(data.items);
        } else {
          throw new Error(data.error.message || "Failed to fetch videos");
        }
      } catch (err: any) {
        setError(err.message || "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [selectedCategory]);

  const renderVideoItem = ({ item }: { item: VideoItem }) => (
    <TouchableOpacity
      style={styles.videoItem}
      onPress={() => {
        router.push({
          pathname: "/screens/VideoPlayer",
          params: { videoId: item.id.videoId },
        });
      }}
    >
      <Image
        source={{ uri: item.snippet.thumbnails.medium.url }}
        style={styles.thumbnail}
      />
      <Text style={styles.title}>{item.snippet.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TopBar />
        <FilterBar
          setCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
        <View style={styles.content}>
          {loading ? (
            <ActivityIndicator size="large" color="red" />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <FlatList
              data={videos}
              renderItem={renderVideoItem}
              keyExtractor={(item) => item.id.videoId}
              contentContainerStyle={styles.list}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 10 },
  list: { paddingBottom: 20 },
  videoItem: { marginBottom: 15 },
  thumbnail: { height: 150, borderRadius: 8, width: "100%" },
  title: { marginTop: 5, fontWeight: "bold", fontSize: 14 },
  errorText: { color: "red", textAlign: "center", marginTop: 20 },
});

export default index;
