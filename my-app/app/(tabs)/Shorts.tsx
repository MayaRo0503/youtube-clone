import type React from "react";
import { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { YOUTUBE_API_KEY } from "@env";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

interface ShortVideo {
  id: string;
  title: string;
  thumbnailUrl: string;
  viewCount: string;
  channelTitle: string;
}

const Shorts: React.FC = () => {
  const [shorts, setShorts] = useState<ShortVideo[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchShorts = useCallback(async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&videoDuration=short&maxResults=20&key=${YOUTUBE_API_KEY}&q=shorts`
      );
      const data = await response.json();
      if (response.ok) {
        const shortsData = await Promise.all(
          data.items.map(async (item: any) => {
            const videoResponse = await fetch(
              `https://www.googleapis.com/youtube/v3/videos?part=statistics,contentDetails&id=${item.id.videoId}&key=${YOUTUBE_API_KEY}`
            );
            const videoData = await videoResponse.json();
            const duration = videoData.items[0].contentDetails.duration;
            // Only include videos shorter than 1 minute
            if (parseDuration(duration) <= 60) {
              return {
                id: item.id.videoId,
                title: item.snippet.title,
                thumbnailUrl: item.snippet.thumbnails.high.url,
                viewCount: videoData.items[0].statistics.viewCount,
                channelTitle: item.snippet.channelTitle,
              };
            }
            return null;
          })
        );
        setShorts(
          shortsData.filter((short): short is ShortVideo => short !== null)
        );
      } else {
        throw new Error(data.error.message || "Failed to fetch shorts");
      }
    } catch (err: any) {
      setError(err.message || "An unknown error occurred");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchShorts();
  }, [fetchShorts]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchShorts();
  }, [fetchShorts]);

  const renderShortItem = ({ item }: { item: ShortVideo }) => (
    <TouchableOpacity
      style={styles.shortItem}
      onPress={() => {
        router.push({
          pathname: "/screens/VideoPlayer",
          params: { videoId: item.id },
        });
      }}
      accessibilityRole="button"
      accessibilityLabel={`Play short video: ${item.title} by ${item.channelTitle}`}
      accessibilityHint="Double tap to play the short video"
    >
      <Image
        source={{ uri: item.thumbnailUrl }}
        style={styles.thumbnail}
        accessibilityRole="image"
        accessibilityLabel={`Thumbnail for ${item.title}`}
      />
      <View style={styles.overlay}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.channelTitle} numberOfLines={1}>
          {item.channelTitle}
        </Text>
        <View style={styles.viewCount}>
          <Ionicons name="eye-outline" size={16} color="white" />
          <Text style={styles.viewCountText}>
            {formatViewCount(item.viewCount)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const formatViewCount = (count: string) => {
    const num = Number.parseInt(count);
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const parseDuration = (duration: string) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return 0;
    const hours = (match[1] && Number.parseInt(match[1])) || 0;
    const minutes = (match[2] && Number.parseInt(match[2])) || 0;
    const seconds = (match[3] && Number.parseInt(match[3])) || 0;
    return hours * 3600 + minutes * 60 + seconds;
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FF0000" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={fetchShorts} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={shorts}
        renderItem={renderShortItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#FF0000"
          />
        }
        ListHeaderComponent={
          <Text style={styles.headerText}>MyTube Shorts</Text>
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No shorts available. Pull down to refresh.
          </Text>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  listContainer: {
    padding: 8,
  },
  shortItem: {
    width: (width - 24) / 2,
    height: (height - 200) / 2,
    marginBottom: 16,
    marginHorizontal: 4,
    borderRadius: 12,
    overflow: "hidden",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 8,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  title: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  channelTitle: {
    color: "#ccc",
    fontSize: 12,
    marginBottom: 4,
  },
  viewCount: {
    flexDirection: "row",
    alignItems: "center",
  },
  viewCountText: {
    color: "white",
    fontSize: 12,
    marginLeft: 4,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  errorText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: "#FF0000",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  retryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  emptyText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});

export default Shorts;
