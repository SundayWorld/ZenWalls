import { View, Text, FlatList, Pressable, StyleSheet, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

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
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.empty}>
          <Text style={styles.emptyText}>No favorites yet ❤️</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={favoriteWallpapers}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={{ padding: 10 }}
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
  safeArea: {
    flex: 1,
    paddingTop: 10, // Adjust top padding if necessary
    paddingBottom: 10, // Adjust bottom padding if necessary
    backgroundColor: "#000",
  },
  card: {
    flex: 1,
    margin: 6,
    borderRadius: 12,
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
    backgroundColor: "#000",
  },
  emptyText: {
    color: "#fff",
    fontSize: 18,
    opacity: 0.7,
  },
});


