import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  FlatList,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronRight, ArrowLeft } from "lucide-react-native";
import { CATEGORIES, WALLPAPERS } from "@/constants/wallpapers";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";

const { width } = Dimensions.get("window");
const ITEM_WIDTH = (width - 60) / 2;

export default function CategoryScreen() {
  const { categoryId } = useLocalSearchParams<{ categoryId?: string }>();

  const wallpapers = categoryId
    ? WALLPAPERS.filter(w => w.category === categoryId)
    : [];

  /* ===================== ACTIONS ===================== */

  // ⬅ From Categories → Home
  const backToHome = () => {
    router.replace("/");
  };

  // ⬅ From Category list → Categories
  const backToCategories = () => {
    router.replace("/category");
  };

  const openCategory = (id: string) => {
    router.push(`/category?categoryId=${id}`);
  };

  const openPreview = (id: string) => {
    router.push(`/preview?id=${id}`);
  };

  /* ===================== CATEGORY LIST ===================== */

  if (!categoryId) {
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          {/* HEADER */}
          <View style={styles.header}>
            <Pressable onPress={backToHome} style={styles.backButton}>
              <ArrowLeft size={24} color="#fff" />
            </Pressable>
            <Text style={styles.headerTitle}>Categories</Text>
          </View>

          <ScrollView contentContainerStyle={styles.list}>
            {CATEGORIES.map(cat => {
              const count = WALLPAPERS.filter(
                w => w.category === cat.id
              ).length;

              return (
                <Pressable
                  key={cat.id}
                  style={styles.categoryCard}
                  onPress={() => openCategory(cat.id)}
                >
                  <View style={styles.categoryRow}>
                    <Text style={styles.icon}>{cat.icon}</Text>
                    <View>
                      <Text style={styles.name}>{cat.name}</Text>
                      <Text style={styles.count}>{count} wallpapers</Text>
                    </View>
                  </View>
                  <ChevronRight size={20} color="#666" />
                </Pressable>
              );
            })}
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }

  /* ===================== CATEGORY DETAIL ===================== */

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable onPress={backToCategories} style={styles.backButton}>
            <ArrowLeft size={24} color="#fff" />
          </Pressable>
          <Text style={styles.headerTitle}>
            {CATEGORIES.find(c => c.id === categoryId)?.name}
          </Text>
        </View>

        <FlatList
          data={wallpapers}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={{ gap: 20 }}
          renderItem={({ item }) => (
            <Pressable
              style={styles.wallpaper}
              onPress={() => openPreview(item.id)}
            >
              <Image
                source={item.image}
                style={styles.image}
                contentFit="cover"
              />
            </Pressable>
          )}
        />
      </SafeAreaView>
    </View>
  );
}

/* ===================== STYLES ===================== */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  safeArea: { flex: 1 },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 20,
  },

  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#fff",
  },

  list: { padding: 20, gap: 12 },

  categoryCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 20,
  },

  categoryRow: { flexDirection: "row", gap: 16 },
  icon: { fontSize: 32 },
  name: { color: "#fff", fontSize: 18, fontWeight: "600" },
  count: { color: "#777" },

  grid: { padding: 20, gap: 20 },

  wallpaper: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 1.6,
    borderRadius: 16,
    overflow: "hidden",
  },

  image: { width: "100%", height: "100%" },
});





