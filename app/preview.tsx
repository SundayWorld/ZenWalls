import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ActivityIndicator,
  Animated,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { X, Download, Heart } from "lucide-react-native";
import * as MediaLibrary from "expo-media-library";
import { Asset } from "expo-asset";
import { WALLPAPERS } from "@/constants/wallpapers";
import { toggleFavorite, isFavorite } from "../utils/favorites";  // Import the functions

export default function PreviewScreen() {
  const params = useLocalSearchParams<{ id?: string }>();

  const wallpaper = useMemo(
    () => WALLPAPERS.find((w) => w.id === params.id),
    [params.id]
  );

  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");
  const [fav, setFav] = useState(false);  // To track if the wallpaper is a favorite

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    if (wallpaper) {
      isFavorite(wallpaper.id).then(setFav); // Check if wallpaper is in favorites
    }
  }, [wallpaper]);

  if (!wallpaper) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#fff", marginTop: 60, textAlign: "center" }}>
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

  const saveToGallery = async () => {
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission required", "Allow access to save wallpapers.");
      return;
    }

    const asset = Asset.fromModule(wallpaper.image);
    await asset.downloadAsync();

    if (!asset.localUri) {
      throw new Error("Image not available");
    }

    const savedAsset = await MediaLibrary.createAssetAsync(asset.localUri);
    await MediaLibrary.createAlbumAsync("ZenWalls", savedAsset, false);
  };

  const handleSave = async () => {
    if (saving) return;

    try {
      setSaving(true);
      await saveToGallery();
      showToast("Saved to gallery");
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to save wallpaper.");
    } finally {
      setSaving(false);
    }
  };

  const handleFavoriteToggle = async () => {
    try {
      await toggleFavorite(wallpaper.id);
      setFav(!fav);  // Toggle the favorite state
      showToast(fav ? "Removed from favorites" : "Added to favorites");
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Failed to add/remove from favorites.");
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

          {/* Favorite Button */}
          <Pressable
            style={styles.favoriteButton}
            onPress={handleFavoriteToggle}
          >
            <Heart size={24} color={fav ? "red" : "#fff"} />
            <Text style={styles.favoriteText}>{fav ? "Unfavorite" : "Favorite"}</Text>
          </Pressable>

          {/* Save Button */}
          <Pressable
            style={[styles.button, styles.primary, saving && styles.disabled]}
            onPress={handleSave}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Download size={20} color="#000" />
            )}
            <Text style={styles.primaryText}>
              {saving ? "Saving…" : "Save to Gallery"}
            </Text>
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

  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 16,
    borderRadius: 16,
  },
  primary: { backgroundColor: "#fff" },
  primaryText: { color: "#000", fontWeight: "600" },
  disabled: { opacity: 0.5 },

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

  // Style for favorite button
  favoriteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.75)",
  },
  favoriteText: { color: "#fff", fontWeight: "600" },
});

















