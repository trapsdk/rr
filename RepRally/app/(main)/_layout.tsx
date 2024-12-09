import { Stack } from 'expo-router/stack'
import {Colors} from "@/constants/Colors";
import {Tabs} from "expo-router";
import React from "react";
import {mainStyles} from "@/constants/main-styles";

export default function Layout() {
    return (
        <Tabs
            screenOptions={
            {
                tabBarStyle: {
                    backgroundColor: '#222831',
                    borderColor: '#222831',
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
                name="history"
                options={{
                    title: 'History',
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