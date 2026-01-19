import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { Alert } from "react-native";

export async function saveWallpaper(image: number) {
  try {
    // 1. Request permission (Android 10+ safe)
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission required",
        "Please allow photo access to save wallpapers."
      );
      return;
    }

    // 2. Load bundled asset
    const asset = Asset.fromModule(image);
    await asset.downloadAsync();

    if (!asset.uri) {
      throw new Error("Asset URI missing");
    }

    // 3. Create a clean local file
    const fileName = `zenwalls_${Date.now()}.jpg`;
    const localPath = FileSystem.documentDirectory + fileName;

    await FileSystem.downloadAsync(asset.uri, localPath);

    // 4. Create MediaLibrary asset
    const mediaAsset = await MediaLibrary.createAssetAsync(localPath);

    // 5. Ensure album exists
    const albumName = "ZenWalls";
    const album = await MediaLibrary.getAlbumAsync(albumName);

    if (album) {
      await MediaLibrary.addAssetsToAlbumAsync(
        [mediaAsset],
        album,
        false
      );
    } else {
      await MediaLibrary.createAlbumAsync(
        albumName,
        mediaAsset,
        false
      );
    }

    Alert.alert("Saved 🎉", "Wallpaper saved to gallery.");
  } catch (error) {
    console.log("Save error:", error);
    Alert.alert("Error", "Failed to save wallpaper.");
  }
}








