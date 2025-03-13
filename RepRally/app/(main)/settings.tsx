import {ClerkLoaded, SignedIn, SignedOut, useAuth, useUser} from '@clerk/clerk-expo'
import {Button, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from "react";
import {mainStyles} from "@/constants/main-styles";
import {useClerk} from "@clerk/clerk-react";
import * as Linking from "expo-linking";
import { ClerkProvider } from '@clerk/clerk-expo';



export default function Settings() {

    const { user } = useUser();
    const { signOut } = useAuth();

    const handleSignOut = async () => {
        try {
            await signOut()
            // Redirect to your desired page
            Linking.openURL(Linking.createURL('/'))
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
        }
    }
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
                <Button title="Sign Out" onPress={handleSignOut} />
            </View>

            </View>




        </ClerkLoaded>
    )
}