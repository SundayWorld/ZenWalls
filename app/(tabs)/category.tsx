import React from "react";
import { StyleSheet, Text, View, ScrollView, Pressable, FlatList, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronRight, ArrowLeft } from "lucide-react-native";
import { CATEGORIES, WALLPAPERS } from "@/mocks/wallpapers";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 60) / 2;

export default function CategoryScreen() {
  const params = useLocalSearchParams<{ categoryId?: string }>();
  const selectedCategoryId = params.categoryId;

  const getCategoryCount = (categoryId: string) => {
    return WALLPAPERS.filter(w => w.category === categoryId).length;
  };

  const handleCategoryPress = (categoryId: string) => {
    router.push(`/category?categoryId=${categoryId}`);
  };

  const handleWallpaperPress = (wallpaper: typeof WALLPAPERS[0]) => {
    router.push({
      pathname: '/preview',
      params: {
        id: wallpaper.id,
        title: wallpaper.title,
        imageUrl: wallpaper.imageUrl,
      },
    });
  };

  const handleBack = () => {
    router.back();
  };

  if (selectedCategoryId) {
    const category = CATEGORIES.find(c => c.id === selectedCategoryId);
    const categoryWallpapers = WALLPAPERS.filter(w => w.category === selectedCategoryId);

    return (
      <View style={styles.container}>
        <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
          <View style={styles.detailHeader}>
            <Pressable
              style={({ pressed }) => [
                styles.backButton,
                pressed && styles.categoryCardPressed,
              ]}
              onPress={handleBack}
              android_ripple={{ color: 'rgba(255,255,255,0.1)' }}
              testID="back-button"
            >
              <ArrowLeft color="#ffffff" size={24} />
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
            keyExtractor={(item) => item.id}
            numColumns={2}
            contentContainerStyle={styles.gridContent}
            columnWrapperStyle={styles.gridRow}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable
                style={({ pressed }) => [
                  styles.wallpaperCard,
                  pressed && styles.categoryCardPressed,
                ]}
                onPress={() => handleWallpaperPress(item)}
                android_ripple={{ color: 'rgba(255,255,255,0.1)' }}
                testID={`wallpaper-${item.id}`}
              >
                <Image
                  source={{ uri: item.imageUrl }}
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

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Categories</Text>
            <Text style={styles.headerSubtitle}>Browse by collection</Text>
          </View>

          <View style={styles.categoriesList}>
            {CATEGORIES.map((category, index) => {
              const count = getCategoryCount(category.id);
              const isAmoled = category.id === 'amoled';
              
              return (
                <Pressable
                  key={category.id}
                  style={({ pressed }) => [
                    styles.categoryCard,
                    isAmoled && styles.categoryCardFeatured,
                    pressed && styles.categoryCardPressed,
                  ]}
                  onPress={() => handleCategoryPress(category.id)}
                  android_ripple={{
                    color: isAmoled ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)',
                  }}
                  testID={`category-${category.id}`}
                >
                  <View style={styles.categoryContent}>
                    <View style={styles.categoryLeft}>
                      <Text style={styles.categoryIcon}>{category.icon}</Text>
                      <View style={styles.categoryInfo}>
                        <Text style={[
                          styles.categoryName,
                          isAmoled && styles.categoryNameFeatured,
                        ]}>
                          {category.name}
                        </Text>
                        <Text style={styles.categoryCount}>
                          {count} wallpapers
                        </Text>
                      </View>
                    </View>
                    <ChevronRight 
                      color={isAmoled ? '#ffffff' : '#666666'} 
                      size={20} 
                    />
                  </View>
                  {isAmoled && (
                    <View style={styles.featuredBadge}>
                      <Text style={styles.featuredText}>FEATURED</Text>
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700' as const,
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#999999',
    marginTop: 4,
  },
  categoriesList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2a2a2a',
    minHeight: 72,
  },
  categoryCardFeatured: {
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
  },
  categoryContent: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
  },
  categoryLeft: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 16,
    flex: 1,
  },
  categoryIcon: {
    fontSize: 32,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '600' as const,
    color: '#ffffff',
    marginBottom: 4,
  },
  categoryNameFeatured: {
    color: '#000000',
  },
  categoryCount: {
    fontSize: 14,
    color: '#666666',
  },
  categoryCardPressed: {
    opacity: 0.7,
  },
  featuredBadge: {
    position: 'absolute' as const,
    top: 12,
    right: 12,
    backgroundColor: '#000000',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  featuredText: {
    fontSize: 10,
    fontWeight: '700' as const,
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  detailHeader: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    gap: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1a1a1a',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  detailHeaderContent: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 12,
    flex: 1,
  },
  detailHeaderIcon: {
    fontSize: 32,
  },
  detailHeaderTitle: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: '#ffffff',
    letterSpacing: -0.5,
  },
  detailHeaderSubtitle: {
    fontSize: 14,
    color: '#999999',
    marginTop: 2,
  },
  gridContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  gridRow: {
    gap: 20,
    marginBottom: 20,
  },
  wallpaperCard: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 1.6,
    borderRadius: 16,
    overflow: 'hidden' as const,
    backgroundColor: '#1a1a1a',
  },
  wallpaperImage: {
    width: '100%',
    height: '100%',
  },
  wallpaperOverlay: {
    position: 'absolute' as const,
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  wallpaperTitle: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: '#ffffff',
  },
});