import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Asset } from "expo-asset";
import { Alert } from "react-native";

export async function saveWallpaper(image: any) {
  try {
    // Ask permission
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Storage permission is needed to save wallpapers.");
      return;
    }

    // Load bundled asset
    const asset = Asset.fromModule(image);
    await asset.downloadAsync();

    // Copy to cache
    const fileUri = asset.localUri || asset.uri;
    const fileName = fileUri.split("/").pop()!;
    const dest = FileSystem.cacheDirectory + fileName;

    await FileSystem.copyAsync({
      from: fileUri,
      to: dest,
    });

    // Save to gallery
    await MediaLibrary.saveToLibraryAsync(dest);

    Alert.alert("Saved", "Wallpaper saved to gallery 🎉");
  } catch (e) {
    console.log("Save error:", e);
    Alert.alert("Error", "Failed to save wallpaper.");
  }
}
