import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';
import {useFonts} from "expo-font";
import {router} from "expo-router";

export default function Welcome(){

    const [fontsLoaded] = useFonts({
        "Poppins-Regular": require("./fonts/Poppins-Regular.ttf"),
    });

    return (
        <ImageBackground source = {require('./img/bg.png')} style={styles.bg}>
            <SafeAreaView>
                <View style = {styles.container}>
                    <Image style={styles.image} source={require('./img/rrlogo.png')}/>
                </View>
                <View style={styles.containerTwo}>
                </View>
                <View style={styles.containerThree}>
                    <TouchableOpacity style={styles.button} onPress={()=>{router.push('./signup')}}>
                        <Text style={styles.buttontext}>Get Started</Text>
                    </TouchableOpacity>
                    <Text style={styles.annotatedtext}>
                        Already have an account? Click <Text onPress={()=> router.push('/login')} style={{textDecorationLine: 'underline'}}>here</Text> to login.
                    </Text>
                </View>
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
