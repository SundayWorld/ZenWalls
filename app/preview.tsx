import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState, useRef, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Platform,
  Alert,
  ActivityIndicator,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { X, Download, Smartphone } from "lucide-react-native";
import * as MediaLibrary from "expo-media-library";
import { Asset } from "expo-asset";
import { WALLPAPERS } from "@/constants/wallpapers";

export default function PreviewScreen() {
  const params = useLocalSearchParams<{ id: string; title: string }>();

  const wallpaper = useMemo(
    () => WALLPAPERS.find(w => w.id === params.id),
    [params.id]
  );

  const [isDownloading, setIsDownloading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const toastOpacity = useRef(new Animated.Value(0)).current;
  const toastTranslateY = useRef(new Animated.Value(20)).current;

  if (!wallpaper) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#fff", textAlign: "center", marginTop: 60 }}>
          Wallpaper not found
        </Text>
      </View>
    );
  }

  const showToast = (message: string) => {
    setToastMessage(message);
    toastOpacity.setValue(0);
    toastTranslateY.setValue(20);

    Animated.parallel([
      Animated.timing(toastOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(toastTranslateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(toastOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(toastTranslateY, {
          toValue: 20,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => setToastMessage(""));
    }, 2000);
  };

  const saveToGallery = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "Please allow access to save wallpapers."
      );
      return;
    }

    const assetSource = Asset.fromModule(wallpaper.image);
    await assetSource.downloadAsync();

    const asset = await MediaLibrary.createAssetAsync(
      assetSource.localUri!
    );
    await MediaLibrary.createAlbumAsync("ZenWalls", asset, false);
  };

  const handleDownload = async () => {
    if (isDownloading) return;

    try {
      setIsDownloading(true);
      await saveToGallery();
      showToast("Saved to gallery");
    } catch (error) {
      Alert.alert("Error", "Failed to save wallpaper.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSetWallpaper = async () => {
    if (Platform.OS === "web") {
      showToast("Wallpaper ready");
      return;
    }

    try {
      await saveToGallery();
      showToast("Wallpaper saved");

      setTimeout(() => {
        Alert.alert(
          "Complete Setup",
          "Open your Gallery → ZenWalls album → Set as wallpaper."
        );
      }, 2000);
    } catch (error) {
      Alert.alert("Error", "Failed to prepare wallpaper.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={wallpaper.image}
        style={styles.image}
        contentFit="cover"
      />

      <SafeAreaView edges={["top", "bottom"]} style={styles.safeArea}>
        <View style={styles.header}>
          <Pressable style={styles.closeButton} onPress={() => router.back()}>
            <X color="#ffffff" size={24} />
          </Pressable>
        </View>

        <View style={styles.footer}>
          <View style={styles.info}>
            <Text style={styles.title}>{wallpaper.title}</Text>
          </View>

          <View style={styles.actions}>
            <Pressable
              style={[styles.actionButton, styles.secondaryButton]}
              onPress={handleSetWallpaper}
            >
              <Smartphone color="#ffffff" size={20} />
              <Text style={styles.secondaryButtonText}>
                Set as Wallpaper
              </Text>
            </Pressable>

            <Pressable
              style={[
                styles.actionButton,
                styles.primaryButton,
                isDownloading && styles.buttonDisabled,
              ]}
              onPress={handleDownload}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <ActivityIndicator color="#000000" />
              ) : (
                <Download color="#000000" size={20} />
              )}
              <Text style={styles.primaryButtonText}>
                {isDownloading ? "Saving..." : "Download"}
              </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>

      {toastMessage !== "" && (
        <Animated.View
          style={[
            styles.toast,
            {
              opacity: toastOpacity,
              transform: [{ translateY: toastTranslateY }],
            },
          ]}
        >
          <Text style={styles.toastText}>{toastMessage}</Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  image: { width: "100%", height: "100%", position: "absolute" },
  safeArea: { flex: 1, justifyContent: "space-between" },

  header: { padding: 16 },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
  },

  footer: { padding: 20, gap: 16 },
  info: {
    backgroundColor: "rgba(0,0,0,0.8)",
    borderRadius: 16,
    padding: 20,
  },
  title: { fontSize: 24, fontWeight: "700", color: "#fff" },

  actions: { gap: 12 },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 16,
    borderRadius: 16,
  },
  primaryButton: { backgroundColor: "#fff" },
  secondaryButton: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  primaryButtonText: { color: "#000", fontWeight: "600" },
  secondaryButtonText: { color: "#fff", fontWeight: "600" },
  buttonDisabled: { opacity: 0.5 },

  toast: {
    position: "absolute",
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 14,
    alignItems: "center",
  },
  toastText: { color: "#000", fontWeight: "600" },
});



