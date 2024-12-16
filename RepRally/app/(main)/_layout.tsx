import { Stack } from 'expo-router/stack'
import {Colors} from "@/constants/Colors";
import {Tabs} from "expo-router";
import React from "react";
import {mainStyles} from "@/constants/main-styles";
import {ConvexReactClient} from "convex/react";

export default function Layout() {
    return (
        <Tabs
            screenOptions={
            {
                tabBarStyle: {
                    backgroundColor: '#2A3335',
                    borderColor: '#2A3335',
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