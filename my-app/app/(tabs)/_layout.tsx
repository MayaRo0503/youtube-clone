// my-app/app/(tabs)/_layout.tsx
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Ionicons from "@expo/vector-icons/Ionicons";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = "light";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarItemStyle: {
          height: 80,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={22} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="Shorts"
        options={{
          headerShown: false,
          title: "Shorts",
          tabBarIcon: ({ color }) => (
            <AntDesign name="videocamera" size={22} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="Upload"
        options={{
          headerShown: false,
          title: "",
          tabBarIcon: ({ color }) => (
            <AntDesign name="pluscircleo" size={28} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="Subscriptions"
        options={{
          headerShown: false,
          title: "Subscriptions",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="subscriptions" size={22} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="User"
        options={{
          title: "You",
          tabBarIcon: ({ color }) => (
            <Ionicons name="logo-google" size={22} color="black" />
          ),
        }}
      />
    </Tabs>
  );
}
