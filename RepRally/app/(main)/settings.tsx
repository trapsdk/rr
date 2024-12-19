import {ClerkLoaded, SignedIn, SignedOut, useAuth, useUser} from '@clerk/clerk-expo'
import {Button, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from "react";
import {SignOutButton} from "@/components/SignOutButton";
import {mainStyles} from "@/constants/main-styles";



export default function Settings() {

    const { user } = useUser();
    const { signOut } = useAuth();

    return(
        <ClerkLoaded>
        <View style={mainStyles.bg}>
            <Text style={mainStyles.welcometext}>Settings</Text>

            <Text style={mainStyles.welcometext}>Current User: {useUser().user?.username}</Text>
            <SignOutButton/>
        </View>
        </ClerkLoaded>
    )
}