// Update this import to include the `Redirect` component
import { Redirect, Tabs } from 'expo-router';
import React from 'react';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
// Import the `useAuth` hook from Clerk
import { useAuth } from '@clerk/clerk-expo';

export default function TabLayout() {
    const colorScheme = useColorScheme();

    // Redirect if the user is not signed in
    const { isSignedIn } = useAuth()
    if(!isSignedIn) {
        return (
            <Redirect href={'/sign-in'} />
        )
    }

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',

                }}
            />
            <Tabs.Screen
                name="explore"
                options={{
                    title: 'Explore',

                }}
            />
        </Tabs>
    );
}
