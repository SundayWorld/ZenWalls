import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Animated,
  Alert,
  Platform,
  ActivityIndicator,
} from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { X, Heart, Download } from "lucide-react-native";

import * as IntentLauncher from "expo-intent-launcher";
import * as MediaLibrary from "expo-media-library";
import { Asset } from "expo-asset";

// Use the new FavoritesContext
import { useFavorites } from "@/contexts/FavoritesContext";
import { WALLPAPERS } from "@/constants/wallpapers";

export default function PreviewScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const { isFavorite, toggleFavorite } = useFavorites(); // Use context here

  const wallpaper = useMemo(
    () => WALLPAPERS.find((w) => w.id === params.id),
    [params.id]
  );

  const [fav, setFav] = useState(false);
  const [working, setWorking] = useState(false);
  const [toast, setToast] = useState("");

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (wallpaper) {
      isFavorite(wallpaper.id).then(setFav);  // Check if the wallpaper is favorite
    }
  }, [wallpaper]);

  if (!wallpaper) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#fff", marginTop: 60 }}>Wallpaper not found</Text>
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
   * ✅ SYSTEM WALLPAPER PICKER (ANDROID)
   * No gallery saving, no sharing risk
   */
  const handleSetWallpaper = async () => {
    if (working) return;

    try {
      setWorking(true);

      if (Platform.OS !== "android") {
        Alert.alert("Not supported", "Wallpaper setting is Android only.");
        return;
      }

      const asset = Asset.fromModule(wallpaper.image);
      await asset.downloadAsync();

      if (!asset.localUri) {
        throw new Error("Wallpaper unavailable");
      }

      // Convert to MediaStore asset → content:// URI
      const mediaAsset = await MediaLibrary.createAssetAsync(asset.localUri);

      await IntentLauncher.startActivityAsync(
        IntentLauncher.ActivityAction.SET_WALLPAPER,
        {
          data: mediaAsset.uri,
          type: "image/*",
        }
      );

      showToast("Wallpaper picker opened");
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Unable to open wallpaper picker.");
    } finally {
      setWorking(false);
    }
  };

  const handleFavoriteToggle = async () => {
    if (wallpaper) {
      toggleFavorite(wallpaper.id); // Toggle favorite status using the context
      setFav(!fav);
      showToast(fav ? "Removed from favorites" : "Added to favorites");
    }
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

          <Pressable
            style={[styles.setButton, working && { opacity: 0.6 }]}
            onPress={handleSetWallpaper}
            disabled={working}
          >
            {working ? (
              <ActivityIndicator color="#000" />
            ) : (
              <>
                <Download size={20} color="#000" />
                <Text style={styles.setText}>SET WALLPAPER</Text>
              </>
            )}
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
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
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


























