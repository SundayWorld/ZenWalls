import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, Pressable, Platform, Alert, ActivityIndicator, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { X, Download, Smartphone } from "lucide-react-native";
import * as MediaLibrary from "expo-media-library";
import { File, Paths } from "expo-file-system";

export default function PreviewScreen() {
  const params = useLocalSearchParams<{ id: string; title: string; imageUrl: string }>();
  const [isDownloading, setIsDownloading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const toastOpacity = useRef(new Animated.Value(0)).current;
  const toastTranslateY = useRef(new Animated.Value(20)).current;

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

  const handleDownload = async () => {
    if (isDownloading) return;

    try {
      setIsDownloading(true);
      console.log("Starting download...");

      if (Platform.OS === "web") {
        const link = document.createElement("a");
        link.href = params.imageUrl;
        link.download = `${params.title}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        Alert.alert("Success", "Wallpaper downloaded!");
        return;
      }

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Required", "Please grant permission to save wallpapers to your gallery.");
        setIsDownloading(false);
        return;
      }

      const fileName = `${params.title.replace(/[^a-z0-9]/gi, '_')}_${Date.now()}.jpg`;
      const destination = new File(Paths.cache, fileName);
      console.log("Downloading to:", destination.uri);

      const downloadedFile = await File.downloadFileAsync(params.imageUrl, destination);
      console.log("Download complete:", downloadedFile.uri);

      const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri);
      await MediaLibrary.createAlbumAsync("ZenWalls", asset, false);

      showToast("Saved to gallery");
    } catch (error) {
      console.error("Download error:", error);
      Alert.alert("Error", "Failed to download wallpaper. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  const handleSetWallpaper = async () => {
    if (Platform.OS === "web") {
      showToast("Wallpaper applied");
      return;
    }

    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Required", "Please grant permission to save wallpapers to your gallery.");
        return;
      }

      const fileName = `${params.title.replace(/[^a-z0-9]/gi, '_')}_${Date.now()}.jpg`;
      const destination = new File(Paths.cache, fileName);
      const downloadedFile = await File.downloadFileAsync(params.imageUrl, destination);
      const asset = await MediaLibrary.createAssetAsync(downloadedFile.uri);
      await MediaLibrary.createAlbumAsync("ZenWalls", asset, false);

      showToast("Wallpaper applied");
      
      setTimeout(() => {
        Alert.alert(
          "Complete Setup",
          "To finish setting your wallpaper:\n\n1. Open your Gallery/Photos app\n2. Find the image in ZenWalls album\n3. Tap 'Set as wallpaper' or 'Use as'\n4. Choose Home screen, Lock screen, or Both",
          [{ text: "OK" }]
        );
      }, 2500);
    } catch (error) {
      console.error("Set wallpaper error:", error);
      Alert.alert("Error", "Failed to prepare wallpaper. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: params.imageUrl }}
        style={styles.image}
        contentFit="cover"
      />

      <SafeAreaView edges={["top", "bottom"]} style={styles.safeArea}>
        <View style={styles.header}>
          <Pressable
            style={({ pressed }) => [
              styles.closeButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => router.back()}
            android_ripple={{ color: "rgba(255,255,255,0.2)" }}
            testID="close-button"
          >
            <X color="#ffffff" size={24} />
          </Pressable>
        </View>

        <View style={styles.footer}>
          <View style={styles.info}>
            <Text style={styles.title} numberOfLines={1}>
              {params.title}
            </Text>
          </View>

          <View style={styles.actions}>
            <Pressable
              style={({ pressed }) => [
                styles.actionButton,
                styles.secondaryButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={handleSetWallpaper}
              android_ripple={{ color: "rgba(255,255,255,0.1)" }}
              testID="set-wallpaper-button"
            >
              <Smartphone color="#ffffff" size={20} />
              <Text style={styles.secondaryButtonText}>Set as Wallpaper</Text>
            </Pressable>

            <Pressable
              style={({ pressed }) => [
                styles.actionButton,
                styles.primaryButton,
                pressed && styles.buttonPressed,
                isDownloading && styles.buttonDisabled,
              ]}
              onPress={handleDownload}
              disabled={isDownloading}
              android_ripple={{ color: "rgba(0,0,0,0.1)" }}
              testID="download-button"
            >
              {isDownloading ? (
                <ActivityIndicator color="#000000" size="small" />
              ) : (
                <Download color="#000000" size={20} />
              )}
              <Text style={styles.primaryButtonText}>
                {isDownloading ? "Downloading..." : "Download"}
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
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute" as const,
  },
  safeArea: {
    flex: 1,
    justifyContent: "space-between" as const,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 16,
  },
  info: {
    backgroundColor: "rgba(0,0,0,0.8)",
    borderRadius: 16,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: "#ffffff",
  },
  actions: {
    gap: 12,
  },
  actionButton: {
    flexDirection: "row" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    gap: 10,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    minHeight: 56,
  },
  primaryButton: {
    backgroundColor: "#ffffff",
  },
  secondaryButton: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#000000",
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#ffffff",
  },
  buttonPressed: {
    opacity: 0.7,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  toast: {
    position: "absolute" as const,
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  toastText: {
    fontSize: 15,
    fontWeight: "600" as const,
    color: "#000000",
  },
});