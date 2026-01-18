import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Asset } from "expo-asset";
import { Alert, Platform } from "react-native";

export async function saveWallpaper(image: any) {
  try {
    // 1️⃣ Request permission
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permission required",
        "Allow storage permission to save wallpapers."
      );
      return;
    }

    // 2️⃣ Load bundled image
    const asset = Asset.fromModule(image);
    await asset.downloadAsync();

    const sourceUri = asset.localUri || asset.uri;
    if (!sourceUri) {
      throw new Error("Asset URI not found");
    }

    // 3️⃣ Copy to app document directory
    const fileName = sourceUri.split("/").pop();
    const destUri = FileSystem.documentDirectory + fileName;

    await FileSystem.copyAsync({
      from: sourceUri,
      to: destUri,
    });

    // 4️⃣ Create MediaLibrary asset (THIS IS THE FIX)
    const mediaAsset = await MediaLibrary.createAssetAsync(destUri);

    // 5️⃣ Save to Pictures album
    await MediaLibrary.createAlbumAsync(
      "ZenWalls",
      mediaAsset,
      false
    );

    Alert.alert("Saved", "Wallpaper saved to gallery 🎉");
  } catch (error) {
    console.log("Save error:", error);
    Alert.alert("Error", "Failed to save wallpaper.");
  }
}


