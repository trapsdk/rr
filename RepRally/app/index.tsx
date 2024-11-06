import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    StyleSheet,
    ImageComponent,
    SafeAreaView,
    TouchableOpacity
} from 'react-native';



const imgLogo = <Image source= {require('./img/rrlogo.png')}/>

export default function Welcome(){
    return (

        <ImageBackground source = {require('./img/bg.png')} style={styles.bg}>

        <SafeAreaView>
            <View style = {styles.container}>
                <Image style={styles.image} source={require('./img/rrlogo.png')}/>
            </View>
            <View style={styles.textcenter}>
                <Text style={styles.text}>Welcome! </Text>
            </View>
            <View style={styles.containerThree}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttontext}>Get Started</Text>
                </TouchableOpacity>
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
        bottom: -100,
    },
    buttontext:{
        fontSize: 30,
        fontFamily: "Poppins-Regular.ttf",
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
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },

    textcenter: {
        flex: 2,
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
    },
    containerThree:{
        flex: 3,
        paddingHorizontal: 20,
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
    },
    text: {
        top: -50,
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
