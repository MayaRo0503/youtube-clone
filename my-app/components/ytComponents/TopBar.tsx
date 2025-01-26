import type React from "react";
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import SearchBar from "./SearchBar";
import { useRouter } from "expo-router";

const TopBar: React.FC = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const router = useRouter();

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleSearch = (query: string) => {
    router.push({
      pathname: "/screens/SearchResults",
      params: { query },
    });
    setIsSearchVisible(false);
  };

  return (
    <View style={styles.container}>
      {isSearchVisible ? (
        <SearchBar onSearch={handleSearch} onClose={toggleSearch} />
      ) : (
        <>
          <View style={styles.logoContainer}>
            <Entypo name="youtube" size={40} color="red" />
            <Text style={styles.logoText}>MyTube</Text>
          </View>
          <View style={styles.iconsContainer}>
            <TouchableOpacity onPress={toggleSearch}>
              <AntDesign name="search1" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  logoText: {
    fontSize: 26,
    fontWeight: "bold",
    marginLeft: 6,
  },
  iconsContainer: {
    flexDirection: "row",
    gap: 16,
  },
});

export default TopBar;
