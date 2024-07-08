import React, { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import { WebView } from "react-native-webview";

export default function App() {
  const [isLoading, setLoading] = useState<boolean>(true);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoading && (
        <ActivityIndicator
          color="#ff0000"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            zIndex: 99,
          }}
          size={64}
        />
      )}
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <WebView
          onLoadEnd={() => {
            setLoading(false);
          }}
          source={{ uri: `${process.env.EXPO_PUBLIC_WEBVIEW_URL}` }} // Replace with your website URL
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
