import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Animated,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { X, Heart } from "lucide-react-native";

import * as IntentLauncher from "expo-intent-launcher";
import * as MediaLibrary from "expo-media-library";
import { Asset } from "expo-asset";

import { WALLPAPERS } from "@/constants/wallpapers";
import { toggleFavorite, isFavorite } from "../utils/favorites";

export default function PreviewScreen() {
  const params = useLocalSearchParams<{ id?: string }>();

  const wallpaper = useMemo(
    () => WALLPAPERS.find((w) => w.id === params.id),
    [params.id]
  );

  const [fav, setFav] = useState(false);
  const [toast, setToast] = useState("");

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (wallpaper) {
      isFavorite(wallpaper.id).then(setFav);
    }
  }, [wallpaper]);

  if (!wallpaper) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#fff", marginTop: 60 }}>
          Wallpaper not found
        </Text>
      </View>
    );
  }

  const showToast = (msg: string) => {
    setToast(msg);
    opacity.setValue(0);
    translateY.setValue(20);

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 20,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start(() => setToast(""));
    }, 2000);
  };

  /**
   * ✅ SYSTEM WALLPAPER PICKER (ANDROID SAFE)
   */
  const handleSetWallpaper = async () => {
    try {
      const permission = await MediaLibrary.requestPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          "Permission required",
          "Please allow access to set wallpaper."
        );
        return;
      }

      const asset = Asset.fromModule(wallpaper.image);
      await asset.downloadAsync();

      if (!asset.localUri) {
        throw new Error("Wallpaper not available");
      }

      // Convert file:// → content:// (Android requirement)
      const savedAsset = await MediaLibrary.createAssetAsync(asset.localUri);

      // Cast the ActivityAction to 'any' to bypass TypeScript error
      await IntentLauncher.startActivityAsync(
        IntentLauncher.ActivityAction.SET_WALLPAPER as any,
        {
          data: savedAsset.uri,
        }
      );

      showToast("Wallpaper picker opened");
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Unable to open wallpaper picker.");
    }
  };

  const handleFavoriteToggle = async () => {
    await toggleFavorite(wallpaper.id);
    setFav(!fav);
    showToast(fav ? "Removed from favorites" : "Added to favorites");
  };

  return (
    <View style={styles.container}>
      <Image source={wallpaper.image} style={styles.image} contentFit="cover" />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <Pressable style={styles.close} onPress={() => router.back()}>
            <X size={24} color="#fff" />
          </Pressable>
        </View>

        <View style={styles.footer}>
          <View style={styles.info}>
            <Text style={styles.title}>{wallpaper.title}</Text>
          </View>

          <Pressable
            style={styles.favoriteButton}
            onPress={handleFavoriteToggle}
          >
            <Heart size={24} color={fav ? "red" : "#fff"} />
            <Text style={styles.favoriteText}>
              {fav ? "Unfavorite" : "Favorite"}
            </Text>
          </Pressable>

          <Pressable style={styles.setButton} onPress={handleSetWallpaper}>
            <Text style={styles.setText}>SET WALLPAPER</Text>
          </Pressable>
        </View>
      </SafeAreaView>

      {toast !== "" && (
        <Animated.View
          style={[styles.toast, { opacity, transform: [{ translateY }] }]}
        >
          <Text style={styles.toastText}>{toast}</Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  image: { position: "absolute", width: "100%", height: "100%" },

  safeArea: { flex: 1, justifyContent: "space-between" },

  header: { padding: 16 },
  close: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
  },

  footer: { padding: 20, gap: 16 },
  info: {
    backgroundColor: "rgba(0,0,0,0.75)",
    borderRadius: 16,
    padding: 20,
  },
  title: { color: "#fff", fontSize: 24, fontWeight: "700" },

  setButton: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
  },
  setText: { color: "#000", fontWeight: "700" },

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

  favoriteButton: {
    backgroundColor: "rgba(0,0,0,0.75)",
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  favoriteText: { color: "#fff", fontWeight: "600" },
});
























