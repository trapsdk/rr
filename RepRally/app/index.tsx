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



const imgLogo = <Image source= {require('./img/rrlogo.png')}/>


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

            <View style={styles.textcenter}>
                <Text style={styles.welcometext}>Welcome! </Text>
            </View>


            <View style={styles.containerThree}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttontext}>Get Started</Text>
                </TouchableOpacity>
                    <Text style={styles.annotatedtext}>Already have an account? Click <Text style={{textDecorationLine: 'underline'}}>here</Text> to login.</Text>
            </View>

        </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: 'black',
        borderRadius: 50,
        paddingHorizontal: 100,
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
    textcenter: {
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
