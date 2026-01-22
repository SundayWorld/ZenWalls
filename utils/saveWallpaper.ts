import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";
import { Alert, ToastAndroid } from "react-native";

export async function saveWallpaper(image: number) {
  try {
    // 1️⃣ Request permission to access Media Library
    const permission = await MediaLibrary.getPermissionsAsync();
    if (!permission.granted) {
      const request = await MediaLibrary.requestPermissionsAsync();
      if (!request.granted) {
        Alert.alert(
          "Permission required",
          "Please allow photo access to save wallpapers."
        );
        return;
      }
    }

    // 2️⃣ Load bundled asset
    const asset = Asset.fromModule(image);
    await asset.downloadAsync();

    if (!asset.localUri) {
      throw new Error("Asset localUri missing");
    }

    // 3️⃣ Copy asset to cacheDirectory (avoids documentDirectory issues)
    const extension = asset.localUri.split(".").pop() ?? "webp";
    const fileName = `zenwalls_${Date.now()}.${extension}`;
    const localPath = FileSystem.cacheDirectory + fileName;

    await FileSystem.copyAsync({
      from: asset.localUri,
      to: localPath,
    });

    // 4️⃣ Create MediaStore asset from the new location
    const mediaAsset = await MediaLibrary.createAssetAsync(localPath);

    // 5️⃣ Add to album (auto-create if needed)
    await MediaLibrary.createAlbumAsync(
      "ZenWalls",
      mediaAsset,
      false
    );

    // ✅ Success feedback (Toast message)
    ToastAndroid.show(
      "Wallpaper saved to Gallery (ZenWalls)",
      ToastAndroid.SHORT
    );

  } catch (error) {
    console.log("Save error:", error);
    Alert.alert("Error", "Failed to save wallpaper.");
  }
}













