import { Redirect } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
import { Tabs } from 'expo-router';
import React from 'react';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function AuthRoutesLayout() {
    const colorScheme = useColorScheme();
    const { isSignedIn } = useAuth()


    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false
            }}>
            <Tabs.Screen
                name="sign-in"
                options={{
                    title: 'Sign in',

                }}
            />
            <Tabs.Screen
                name="sign-up"
                options={{
                    title: 'Sign up',

                }}
            />
        </Tabs>

    )
}