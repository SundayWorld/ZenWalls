import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Asset } from "expo-asset";
import { Alert } from "react-native";

export async function saveWallpaper(image: any) {
  try {
    // Request permission to access the gallery
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Storage permission is needed to save wallpapers.");
      return;
    }

    // Load bundled asset
    const asset = Asset.fromModule(image);
    await asset.downloadAsync();

    // Get the file URI (use localUri for bundled assets)
    const fileUri = asset.localUri || asset.uri;
    const fileName = fileUri.split("/").pop()!;
    
    // Save the image in Pictures directory (public directory for saving images)
    const dest = FileSystem.documentDirectory + "Pictures/" + fileName;

    // Make sure directory exists
    const dirInfo = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory + "Pictures");
    if (!dirInfo.includes(fileName)) {
      await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + "Pictures", { intermediates: true });
    }

    // Copy the image to the Pictures directory
    await FileSystem.copyAsync({
      from: fileUri,
      to: dest,
    });

    // Save to gallery
    const assetUri = await MediaLibrary.createAssetAsync(dest);
    await MediaLibrary.addAssetsToAlbumAsync([assetUri], await MediaLibrary.getAlbumAsync("ZenWalls"), false);

    Alert.alert("Saved", "Wallpaper saved to gallery 🎉");
  } catch (e) {
    console.log("Save error:", e);
    Alert.alert("Error", "Failed to save wallpaper.");
  }
}

