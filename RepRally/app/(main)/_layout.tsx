import { Stack } from 'expo-router/stack'
import {Colors} from "@/constants/Colors";
import {Slot, Tabs} from "expo-router";
import React from "react";
import {mainStyles} from "@/constants/main-styles";
import {ConvexReactClient} from "convex/react";
import {ConvexProviderWithClerk} from "convex/react-clerk";
import {ClerkLoaded, useAuth} from "@clerk/clerk-expo";

export default function Layout() {

    return (

        <Tabs
            screenOptions={
            {
                tabBarStyle: {
                    backgroundColor: '#2e2e2e',
                    borderColor: '#2e2e2e',
                },
                tabBarIconStyle: {
                    display: "none"
                },
                headerShown: false,
                tabBarShowLabel: true,
            }}

        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                }}
            />
            <Tabs.Screen
                name="workout"
                options={{
                    title: 'Workouts',
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                }}
            />
        </Tabs>

    )
}