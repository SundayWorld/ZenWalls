import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Heart } from 'lucide-react-native';
import { useFavorites } from '@/contexts/FavoritesContext'; // Use the new FavoritesContext

const { width } = Dimensions.get('window');
const COLUMN_COUNT = 2;
const SPACING = 12;
const ITEM_WIDTH = (width - SPACING * (COLUMN_COUNT + 1)) / COLUMN_COUNT;

export default function FavoritesScreen() {
  const router = useRouter();
  const { favoriteIds, isLoading } = useFavorites(); // Fetch favorites from the context

  // Memoize the list of favorite wallpapers
  const favoriteWallpapers = useMemo(() => {
    return wallpapers.filter(w => favoriteIds.includes(w.id)); // Filter wallpapers by favorites
  }, [favoriteIds]);

  const renderWallpaper = ({ item }: { item: typeof wallpapers[0] }) => (
    <Pressable
      style={styles.wallpaperCard}
      onPress={() => router.push(`/preview?id=${item.id}`)} // Navigate to preview on click
    >
      <Image
        source={{ uri: item.imageUrl }} // Use the wallpaper image URL
        style={styles.wallpaperImage}
        contentFit="cover"
        transition={200}
      />
      <View style={styles.wallpaperOverlay}>
        <Text style={styles.wallpaperTitle} numberOfLines={1}>
          {item.title}
        </Text>
      </View>
    </Pressable>
  );

  // Handle the empty state when no favorites are available
  if (!isLoading && favoriteWallpapers.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Heart color="#333" size={64} />
        <Text style={styles.emptyTitle}>No Favorites Yet</Text>
        <Text style={styles.emptySubtitle}>
          Start adding wallpapers to your favorites
        </Text>
      </View>
    );
  }

  // Render the list of favorite wallpapers
  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteWallpapers}
        renderItem={renderWallpaper}
        keyExtractor={(item) => item.id}
        numColumns={COLUMN_COUNT}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  listContent: {
    padding: SPACING,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: SPACING,
  },
  wallpaperCard: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH * 2,
    borderRadius: 12,
    overflow: 'hidden',
  },
  wallpaperImage: {
    width: '100%',
    height: '100%',
  },
  wallpaperOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  wallpaperTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginTop: 24,
    marginBottom: 8,
  },
  emptySubtitle: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
  },
});




