import { View, Text, FlatList, Image, Pressable, StyleSheet } from "react-native";
import { WALLPAPERS } from "../../constants/Wallpapers";
import { getFavorites } from "../../utils/favorites";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

export default function Favorites() {
  const [items, setItems] = useState<any[]>([]);
  const router = useRouter();

  async function load() {
    const favIds = await getFavorites();
    const favWallpapers = WALLPAPERS.filter(w => favIds.includes(w.id));
    setItems(favWallpapers);
  }

  useEffect(() => {
    const sub = setInterval(load, 500);
    return () => clearInterval(sub);
  }, []);

  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.text}>No favorites yet ❤️</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      numColumns={2}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 10 }}
      renderItem={({ item }) => (
        <Pressable onPress={() => router.push(`/preview?id=${item.id}`)}>
          <Image source={item.image} style={styles.img} />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  img: {
    width: 180,
    height: 320,
    borderRadius: 14,
    margin: 6,
  },
  empty: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#aaa",
    fontSize: 18,
  },
});
