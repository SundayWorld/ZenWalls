import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { getFavorites } from "../../utils/favorites";
import { WALLPAPERS } from "../../constants/wallpapers";

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const ids = await getFavorites();
    setFavorites(ids);
  };

  const favoriteWallpapers = WALLPAPERS.filter(w =>
    favorites.includes(w.id)
  );

  if (favoriteWallpapers.length === 0) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No favorites yet ❤️</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={favoriteWallpapers}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => router.push(`/preview?id=${item.id}`)}
          >
            <Image source={item.image} style={styles.image} />
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#000",
  },
  list: {
    padding: 12,
    paddingBottom: 90, // ✅ protects from bottom nav bar
  },
  card: {
    flex: 1,
    margin: 6,
    borderRadius: 14,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 250,
  },
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#fff",
    fontSize: 18,
    opacity: 0.7,
  },
});



