// my-app/app/components/ytComponents/FilterBar.tsx
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

type FilterBarProps = {
  setCategory: (category: string) => void; // Callback to update the selected category
  selectedCategory: string; // Currently selected category
};

const FilterBar: React.FC<FilterBarProps> = ({
  setCategory,
  selectedCategory,
}) => {
  const categories = [
    { name: "All", apiQuery: "popular" },
    { name: "Music", apiQuery: "music" },
    { name: "Mixes", apiQuery: "mix" },
    { name: "News", apiQuery: "news" },
    { name: "Tarot", apiQuery: "tarot" },
    { name: "Podcasts", apiQuery: "podcast" },
    { name: "Live", apiQuery: "live" },
    { name: "Recently upload", apiQuery: "recently uploaded" },
    { name: "New to you", apiQuery: "new" },
  ];

  return (
    <View
      style={{
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
      }}
    >
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="compass-outline" size={29} color="black" />
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setCategory(category.apiQuery)} // Update the selected category
              style={{
                backgroundColor:
                  selectedCategory === category.apiQuery ? "black" : "#DDDDDD", // Highlight selected button
                padding: 10,
                paddingHorizontal: 18,
                borderRadius: 10,
                marginHorizontal: 5,
              }}
            >
              <Text
                style={{
                  color:
                    selectedCategory === category.apiQuery ? "white" : "black", // Text color based on selection
                }}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default FilterBar;
