import React from "react";
import { KeyboardAvoidingView, SafeAreaView, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
  },
});
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <WebView
        source={{ uri: "http://192.168.0.15:5174" }} // Replace with your website URL
      />
    </SafeAreaView>
  );
}
