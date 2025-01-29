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


            <View style={{flex: 1, maxHeight: '20%', top: 100}}>
                <Text style={{
                    color: 'black',
                    fontFamily: "Poppins-Regular",
                    left: -100,
                    fontSize: 30,
                }}>Settings</Text>
            </View>

            <View style={{flex: 2,  height: '100%', top: 300}}>
                <Text style={mainStyles.welcometext}>CurrentUser: "{useUser().user?.username}" </Text>
            </View>

            <View style={{flex: 3, top: 200}}>
                <SignOutButton/>
            </View>

            </View>




        </ClerkLoaded>
    )
}