import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <AntDesign name="frowno" size={80} color="#FFD700" />
          <AntDesign
            name="question"
            size={60}
            color="#FF69B4"
            style={styles.questionMark}
          />
        </View>
        <Text style={styles.title}>Whoops! This page is on vacation 🏖️</Text>
        <Text style={styles.subtitle}>
          Don't worry, it's not you, it's us! 😅
        </Text>
        <Link href="/" style={styles.link}>
          <View style={styles.buttonContainer}>
            <AntDesign name="home" size={24} color="#FFFFFF" />
            <Text style={styles.linkText}>Take me back home!</Text>
          </View>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#F0F8FF",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  questionMark: {
    marginLeft: -30,
    marginTop: -30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "#4A4A4A",
  },
  subtitle: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
    color: "#6A6A6A",
  },
  link: {
    marginTop: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  linkText: {
    fontSize: 18,
    color: "#FFFFFF",
    marginLeft: 10,
    fontWeight: "bold",
  },
});
