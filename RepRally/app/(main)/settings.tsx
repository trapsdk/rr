import {SignedIn, SignedOut, useAuth, useUser} from '@clerk/clerk-expo'
import {Button, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from "react";
import {SignOutButton} from "@/components/SignOutButton";
import {mainStyles} from "@/constants/main-styles";



export default function Settings() {

    const { user } = useUser();
    const { signOut } = useAuth();

    return(
        <View style={mainStyles.bg}>
            <Text style={mainStyles.welcometext}>Settings</Text>
            <SignOutButton/>
        </View>
    )
}