import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "ZENWALLS_FAVORITES";

export async function getFavorites(): Promise<string[]> {
  const json = await AsyncStorage.getItem(KEY);
  return json ? JSON.parse(json) : [];
}

export async function isFavorite(id: string) {
  const favs = await getFavorites();
  return favs.includes(id);
}

export async function addFavorite(id: string) {
  const favs = await getFavorites();
  if (!favs.includes(id)) {
    favs.push(id);
    await AsyncStorage.setItem(KEY, JSON.stringify(favs));
  }
}

export async function removeFavorite(id: string) {
  const favs = await getFavorites();
  const updated = favs.filter(x => x !== id);
  await AsyncStorage.setItem(KEY, JSON.stringify(updated));
}

export async function toggleFavorite(id: string) {
  const favs = await getFavorites();
  if (favs.includes(id)) {
    await removeFavorite(id);
    return false;
  } else {
    await addFavorite(id);
    return true;
  }
}
