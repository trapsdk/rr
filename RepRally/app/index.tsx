import React from 'react';
import {View, Text, ImageBackground, Image, StyleSheet, ImageComponent} from 'react-native';



const imgLogo = <Image source= {require('./img/rrlogo.png')}/>

export default function (){
    return (

        <View style={[
            styles.container,
            {
                flexDirection: 'column',
            },
        ]}>
            <View style={{flex:.2}}>
            <Image source={require('./img/rrlogo.png')} />
            </View>





        </View>

    );

}

// <ImageBackground source = {require('./img/bg.png')} style={bgstyle.container}>
//
// </ImageBackground>


const bgstyle = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
const styles = StyleSheet.create({
    container:{
        flex: 1,
    }
})