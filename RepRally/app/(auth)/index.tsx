import {SignedIn, SignedOut, useAuth, useUser} from '@clerk/clerk-expo'
import {Link, router} from 'expo-router'
import {Button, Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from "react";
import {useFonts} from "expo-font";
import { SignOutButton } from '@clerk/clerk-react'
import {redirect} from "next/navigation";

export default function Page() {

    const { user } = useUser();
    const { signOut } = useAuth();

    const onSignOutPress = async () => {
        try {
            await signOut({ redirectUrl: "/" });
        } catch (err: any) {}
    };
    const [fontsLoaded] = useFonts({
        "Poppins-Regular": require("../fonts/Poppins-Regular.ttf"),
    })

    return (

        <ImageBackground source = {require('../img/bg.png')} style={styles.bg}>
            <SafeAreaView>

                <SignedIn>
                    <View>
                        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
                        <Button onPress={onSignOutPress} title={"Sign Out!"}></Button>
                    </View>
                </SignedIn>

                <SignedOut>
                        <View style = {styles.container}>
                            <Image style={styles.image} source={require('../img/rrlogo.png')}/>
                        </View>
                        <View style={styles.containerTwo}>
                        </View>
                        <View style={styles.containerThree}>
                            <TouchableOpacity style={styles.button} onPress={()=>{router.push('/(auth)/sign-up')}}>
                                <Text style={styles.buttontext}>get started</Text>
                            </TouchableOpacity>
                            <Text style={styles.annotatedtext}>
                                Already have an account? Click <Text onPress={()=> router.push('./(auth)/sign-in')} style={{textDecorationLine: 'underline'}}>here</Text> to login.
                            </Text>
                        </View>

            </SignedOut>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: 'black',
        borderRadius: 50,
        paddingHorizontal: 80,
        paddingVertical: 25,
        bottom: -200,
    },
    buttontext:{
        fontSize: 30,
        fontFamily: "Poppins-Regular",
        width: '100%',
        color: 'white',
        justifyContent: 'center',
        alignItems: 'center',

    },
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        top: 50,
        width: '80%',
        height: '90%',
        resizeMode: 'contain',
    },
    annotatedtext: {
        bottom: -225,
        fontWeight: "bold",
    },
    containerTwo:{
        flex: 2,
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
    },
    containerThree:{
        flex: 3,
        paddingHorizontal: 20,
        alignItems: 'center', // Center horizontally
    },
    welcometext: {
        top: -5,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 25,
    },
    bg:{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});