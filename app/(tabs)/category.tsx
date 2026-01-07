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
  const params = useLocalSearchParams<{ categoryId?: string }>();
  const selectedCategoryId = params.categoryId;

  const getCategoryCount = (categoryId: string) =>
    WALLPAPERS.filter(w => w.category === categoryId).length;

  // ✅ FIX 1: Prevent redundant replace
  const handleCategoryPress = (categoryId: string) => {
    if (selectedCategoryId === categoryId) return;
    router.replace(`/category?categoryId=${categoryId}`);
  };

  const handleWallpaperPress = (wallpaper: typeof WALLPAPERS[number]) => {
    router.push({
      pathname: "/preview",
      params: {
        id: wallpaper.id,
        title: wallpaper.title,
      },
    });
  };

  // ✅ FIX 2: Predictable back navigation
  const handleBack = () => {
    router.replace("/"); // Returns to home screen
  };

  /* ================= CATEGORY DETAIL ================= */
  if (selectedCategoryId) {
    const category = CATEGORIES.find(c => c.id === selectedCategoryId);
    const categoryWallpapers = WALLPAPERS.filter(
      w => w.category === selectedCategoryId
    );

    return (
      <View style={styles.container}>
        <SafeAreaView edges={["top", "bottom"]} style={styles.safeArea}>
          <View style={styles.detailHeader}>
            <Pressable
              onPress={handleBack}
              style={({ pressed }) => [
                styles.backButton,
                pressed && styles.pressed,
              ]}
              android_ripple={{ color: "rgba(255,255,255,0.1)" }}
            >
              <ArrowLeft color="#fff" size={24} />
            </Pressable>

            <View style={styles.detailHeaderContent}>
              <Text style={styles.detailHeaderIcon}>{category?.icon}</Text>
              <View>
                <Text style={styles.detailHeaderTitle}>{category?.name}</Text>
                <Text style={styles.detailHeaderSubtitle}>
                  {categoryWallpapers.length} wallpapers
                </Text>
              </View>
            </View>
          </View>

          <FlatList
            data={categoryWallpapers}
            keyExtractor={item => item.id}
            numColumns={2}
            contentContainerStyle={styles.gridContent}
            columnWrapperStyle={styles.gridRow}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handleWallpaperPress(item)}
                style={({ pressed }) => [
                  styles.wallpaperCard,
                  pressed && styles.pressed,
                ]}
              >
                <Image
                  source={item.image}
                  style={styles.wallpaperImage}
                  contentFit="cover"
                />
                <View style={styles.wallpaperOverlay}>
                  <Text style={styles.wallpaperTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                </View>
              </Pressable>
            )}
          />
        </SafeAreaView>
      </View>
    );
  }

  /* ================= CATEGORY LIST ================= */
  return (
    <View style={styles.container}>
      <SafeAreaView edges={["top", "bottom"]} style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Categories</Text>
            <Text style={styles.headerSubtitle}>Browse by collection</Text>
          </View>

          <View style={styles.categoriesList}>
            {CATEGORIES.map(category => {
              const count = getCategoryCount(category.id);
              const isAmoled = category.id === "amoled";

              return (
                <Pressable
                  key={category.id}
                  onPress={() => handleCategoryPress(category.id)}
                  style={({ pressed }) => [
                    styles.categoryCard,
                    isAmoled && styles.categoryCardFeatured,
                    pressed && styles.pressed,
                  ]}
                >
                  <View style={styles.categoryContent}>
                    <View style={styles.categoryLeft}>
                      <Text style={styles.categoryIcon}>{category.icon}</Text>
                      <View>
                        <Text
                          style={[styles.categoryName, isAmoled && styles.categoryNameFeatured]}
                        >
                          {category.name}
                        </Text>
                        <Text style={styles.categoryCount}>
                          {count} wallpapers
                        </Text>
                      </View>
                    </View>
                    <ChevronRight
                      size={20}
                      color={isAmoled ? "#000" : "#666"}
                    />
                  </View>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  safeArea: { flex: 1 },
  scrollContent: { paddingBottom: 20 },

  header: { padding: 20 },
  headerTitle: { fontSize: 32, fontWeight: "700", color: "#fff" },
  headerSubtitle: { fontSize: 16, color: "#999" },

  categoriesList: { paddingHorizontal: 20, gap: 12 },
  categoryCard: {
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 20,
  },
  categoryCardFeatured: { backgroundColor: "#fff" },
  pressed: { opacity: 0.7 },

  categoryContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryLeft: { flexDirection: "row", gap: 16 },
  categoryIcon: { fontSize: 32 },
  categoryName: { fontSize: 18, color: "#fff", fontWeight: "600" },
  categoryNameFeatured: { color: "#000" },
  categoryCount: { color: "#666" },

  detailHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    gap: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#1a1a1a",
    alignItems: "center",
    justifyContent: "center",
  },
  detailHeaderContent: { flexDirection: "row", gap: 12 },
  detailHeaderIcon: { fontSize: 32 },
  detailHeaderTitle: { fontSize: 24, color: "#fff", fontWeight: "700" },
  detailHeaderSubtitle: { color: "#999" },

  gridContent: { paddingHorizontal: 20, paddingBottom: 20 },
  gridRow: { gap: 20, marginBottom: 20 },

  wallpaperCard: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 1.6,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#1a1a1a",
  },
  wallpaperImage: { width: "100%", height: "100%" },
  wallpaperOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  wallpaperTitle: { color: "#fff", fontWeight: "600" },
});



