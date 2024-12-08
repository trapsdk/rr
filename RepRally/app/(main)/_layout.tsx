import { Stack } from 'expo-router/stack'
import {Colors} from "@/constants/Colors";
import {Tabs} from "expo-router";
import React from "react";

export default function Layout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
            }}>
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    headerShown: false,

                }}
            />
            <Tabs.Screen
                name="history"
                options={{
                    title: 'History',
                    headerShown: false,

                }}
            />
        </Tabs>
    )
}