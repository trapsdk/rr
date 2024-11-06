import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";

// PREVENT THE SPLASH SCREEN FROM AUTO-HIDING BEFORE ASSET LOADING IS COMPLETE
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  return (
    <Stack>
        <Stack.Screen name="index" options={ {headerShown: false} }/>
    </Stack>
  );
}
