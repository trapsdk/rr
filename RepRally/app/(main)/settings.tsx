import {ClerkLoaded,useAuth, useUser} from '@clerk/clerk-expo'
import { Text, TouchableOpacity, View} from 'react-native'
import React from "react";
import {StyleSheet} from "react-native";
import {mainStyles} from "@/constants/main-styles";

import * as Linking from "expo-linking";




export default function Settings() {

    const { signOut } = useAuth();

    const handleSignOut = async () => {
        try {
            await signOut()
            // Redirect to your desired page
            await Linking.openURL(Linking.createURL('/'))
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
                    left: -85,
                    fontSize: 30,
                }}>Settings</Text>

                <View style={{
                    top: -200,
                    left: 80,
                }}>
                <TouchableOpacity style={settingStyles.signoutButton} onPress={()=> handleSignOut()}>
                    <Text style={settingStyles.signoutButtonText}>Sign Out</Text>
                </TouchableOpacity>
                </View>

            </View>

            <View style={{flex: 2, maxWidth: "95%", top: 275}}>
                <Text style={mainStyles.welcometext}>Current User: "{useUser().user?.username}" </Text>
            </View>


            </View>




        </ClerkLoaded>
    )
}
const settingStyles = StyleSheet.create({
    signoutButton:{
        backgroundColor: '#202324',
        borderRadius: 50,
        paddingHorizontal: 35,
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: -155,
    },
    signoutButtonText:{
        fontSize: 20,
        fontFamily: "Poppins-Regular",
        color: 'white',
    },
});