import { Stack } from 'expo-router/stack'
import {Colors} from "@/constants/Colors";
import {Slot, Tabs} from "expo-router";
import React from "react";
import {AntDesign} from "@expo/vector-icons";
import {A} from "@clerk/clerk-react/dist/useAuth-D_CEhNaa";
import {View} from "react-native";
import { Image } from 'react-native';
import {StatusBar} from "expo-status-bar";

export default function Layout() {


    return (

            <Tabs

                screenOptions={
                    {
                        tabBarStyle: {
                            backgroundColor: 'white',
                            borderColor: 'white',
                        },
                        headerShown: false,
                        tabBarShowLabel: true,
                    }}

            >

                <Tabs.Screen
                    name="home"
                    options={{
                        tabBarShowLabel: false,
                        tabBarIcon: ({focused}) => (
                            <AntDesign name={"appstore-o"} size={24} color={focused ? 'black' : '#939595' } />
                        ),
                    }}

                />
                <Tabs.Screen
                    name="workout"
                    options={{
                        tabBarShowLabel: false,
                        tabBarIcon: ({focused}) => (
                            <AntDesign name={"checkcircleo"} size={24} color={focused ? 'black' : '#939595'} />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="settings"
                    options={{
                        tabBarShowLabel: false,
                        tabBarIcon: ({focused}) => (
                            <AntDesign name={"setting"} size={24} color={focused ? 'black' : '#939595'} />
                        ),
                    }}
                />
            </Tabs>


    )
}