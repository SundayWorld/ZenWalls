import * as IntentLauncher from "expo-intent-launcher";
import { Asset } from "expo-asset";
import { Alert } from "react-native";

export async function setWallpaper(image: number) {
  try {
    // Load bundled image
    const asset = Asset.fromModule(image);
    await asset.downloadAsync();

    if (!asset.uri) {
      throw new Error("Wallpaper asset not found");
    }

    // Open Android system wallpaper picker
    await IntentLauncher.startActivityAsync(
      "android.intent.action.SET_WALLPAPER",
      {
        data: asset.uri,
        flags: 1,
      }
    );
  } catch (error) {
    console.log("Wallpaper error:", error);
    Alert.alert("Error", "Unable to set wallpaper.");
  }
}
