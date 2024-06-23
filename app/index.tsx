import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { WebView } from "react-native-webview";

SplashScreen.preventAutoHideAsync();
export default function App() {
  const [counter, setCounter] = useState<number>(1);
  const [isLoading, setLoading] = useState<boolean>(true);
  const onLayoutRootView = useCallback(async () => {
    if (counter === 0) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [counter]);

  let interval: NodeJS.Timeout | undefined;
  useEffect(() => {
    console.log(counter);
    if (!interval) {
      interval = setInterval(() => {
        setCounter(counter - 1);
      }, 1000);
    }
    if (counter === 0) {
      interval && clearInterval(interval);
    }
    return () => {
      interval && clearInterval(interval);
    };
  }, [counter]);

  if (counter > 0) {
    return null;
  } else {
    return (
      <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
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
        <WebView
          onLoadProgress={(event) => {
            console.log(`onLoadProgress ${event.eventPhase}`);
          }}
          onLoadStart={() => {
            console.log("onLoadStart");
          }}
          onLoad={() => {
            console.log("onLoad");
          }}
          onLoadEnd={() => {
            console.log("onLoadEnd");
            setLoading(false);
          }}
          source={{ uri: `${process.env.EXPO_WEBVIEW_URL}` }} // Replace with your website URL
        />
      </SafeAreaView>
    );
  }
}
