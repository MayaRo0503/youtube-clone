import { View, Text } from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
const TopBar = () => {
  return (
    <View
      style={{
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 30,
        paddingHorizontal: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 6,
          alignItems: "center",
          padding: 10,
        }}
      >
        <Entypo name="youtube" size={40} color="red" />
        <Text
          style={{
            fontSize: 26,
            fontWeight: "bold",
          }}
        >
          Youtube
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 16,
        }}
      >
        {/*icons*/}
        <FontAwesome6 name="chromecast" size={24} color="black" />{" "}
        <Feather name="bell" size={24} color="black" />
        <AntDesign name="search1" size={24} color="black" />
      </View>
    </View>
  );
};

export default TopBar;
