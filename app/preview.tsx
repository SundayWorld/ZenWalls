import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useRef, useState } from "react";
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
import { X, Download } from "lucide-react-native";
import * as MediaLibrary from "expo-media-library";
import { Asset } from "expo-asset";
import { WALLPAPERS } from "@/constants/wallpapers";

export default function PreviewScreen() {
  const params = useLocalSearchParams<{ id?: string }>();

  const wallpaper = useMemo(
    () => WALLPAPERS.find(w => w.id === params.id),
    [params.id]
  );

  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState("");

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  if (!wallpaper) {
    return (
      <View style={styles.container}>
        <Text style={{ color: "#fff", textAlign: "center", marginTop: 60 }}>
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
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Allow access to save wallpapers.");
      return;
    }

    const assetSource = Asset.fromModule(wallpaper.image);
    await assetSource.downloadAsync();

    const asset = await MediaLibrary.createAssetAsync(
      assetSource.localUri!
    );
    await MediaLibrary.createAlbumAsync("ZenWalls", asset, false);
  };

  const handleSave = async () => {
    if (saving) return;

    try {
      setSaving(true);
      await saveToGallery();
      showToast("Saved to gallery");
    } catch {
      Alert.alert("Error", "Failed to save wallpaper.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={wallpaper.image}
        style={styles.image}
        contentFit="cover"
      />

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

          <View style={styles.actions}>
            <Pressable
              style={[
                styles.button,
                styles.primary,
                saving && styles.disabled,
              ]}
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
        </View>
      </SafeAreaView>

      {toast !== "" && (
        <Animated.View
          style={[
            styles.toast,
            { opacity, transform: [{ translateY }] },
          ]}
        >
          <Text style={styles.toastText}>{toast}</Text>
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

  actions: { gap: 12 },

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
});









