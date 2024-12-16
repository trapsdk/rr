import { tokenCache } from '@/cache'
import {ClerkProvider, ClerkLoaded, useAuth} from '@clerk/clerk-expo'
import { Slot } from 'expo-router'
import {ConvexProviderWithClerk} from "convex/react-clerk";
import {ConvexReactClient} from "convex/react";

export default function RootLayout() {


    const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

    if (!publishableKey) {
        throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env')
    }
    const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
        unsavedChangesWarning: false,
    });

    return (
        <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                    <Slot />
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
}