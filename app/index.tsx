import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  AppState,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import { WebView } from "react-native-webview";

export default function App() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const webViewRef = useRef<WebView>(null);
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (status) => {
      console.log(status);
      if (status === "active") {
        webViewRef.current && webViewRef.current.reload();
      }
    });

    return () => subscription.remove();
  }, []);
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
          onShouldStartLoadWithRequest={() => {
            return false;
          }}
          ref={webViewRef}
          source={{ uri: `${process.env.EXPO_PUBLIC_WEBVIEW_URL}` }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
