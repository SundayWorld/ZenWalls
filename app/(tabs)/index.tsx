import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Sparkles } from "lucide-react-native";
import { WALLPAPERS } from "@/constants/wallpapers";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

export default function HomeScreen() {
  // ✅ Force deterministic real AMOLED selection
  const amoledWallpapers = WALLPAPERS
    .filter(w => w.category === "amoled")
    .sort((a, b) => a.id.localeCompare(b.id))
    .slice(0, 4);

  const otherWallpapers = WALLPAPERS
    .filter(w => w.category !== "amoled")
    .slice(0, 6);

  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top", "bottom"]} style={styles.safeArea}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>ZenWalls</Text>
            <Text style={styles.headerSubtitle}>Premium AMOLED Wallpapers</Text>
          </View>

          {/* ===== FEATURED AMOLED ===== */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Sparkles color="#ffffff" size={20} />
              <Text style={styles.sectionTitle}>Featured AMOLED</Text>
            </View>

            <View style={styles.grid}>
              {amoledWallpapers.map(wallpaper => (
                <Pressable
                  key={wallpaper.id}
                  style={({ pressed }) => [
                    styles.card,
                    pressed && styles.cardPressed,
                  ]}
                  onPress={() =>
                    router.push({
                      pathname: "/preview",
                      params: {
                        id: wallpaper.id,
                        title: wallpaper.title,
                      },
                    })
                  }
                  android_ripple={{ color: "rgba(255,255,255,0.1)" }}
                >
                  <Image
                    source={wallpaper.image}
                    style={styles.cardImage}
                    contentFit="cover"
                  />
                  <View style={styles.cardOverlay}>
                    <Text style={styles.cardTitle} numberOfLines={1}>
                      {wallpaper.title}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>

          {/* ===== DISCOVER MORE ===== */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { paddingHorizontal: 20 }]}>
              Discover More
            </Text>

            <View style={styles.grid}>
              {otherWallpapers.map(wallpaper => (
                <Pressable
                  key={wallpaper.id}
                  style={({ pressed }) => [
                    styles.card,
                    pressed && styles.cardPressed,
                  ]}
                  onPress={() =>
                    router.push({
                      pathname: "/preview",
                      params: {
                        id: wallpaper.id,
                        title: wallpaper.title,
                      },
                    })
                  }
                  android_ripple={{ color: "rgba(255,255,255,0.1)" }}
                >
                  <Image
                    source={wallpaper.image}
                    style={styles.cardImage}
                    contentFit="cover"
                  />
                  <View style={styles.cardOverlay}>
                    <Text style={styles.cardTitle} numberOfLines={1}>
                      {wallpaper.title}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000" },
  safeArea: { flex: 1 },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 20 },

  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#999999",
    marginTop: 4,
  },

  section: { marginBottom: 32 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 16,
    gap: 16,
  },

  card: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.8,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#1a1a1a",
  },
  cardImage: { width: "100%", height: "100%" },
  cardOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
  },
  cardPressed: { opacity: 0.8 },
});

