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


export default function Login(){
    return (
        <SafeAreaView>
            <View style={styles.containerOne}>
                <Text>Signup Screen</Text>
            </View>
            <View style={styles.containerTwo}>

            </View>
            <View style={styles.containerThree}>
                <TouchableOpacity style={styles.button}>

                </TouchableOpacity>
            </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    containerOne:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerTwo:{
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerThree:{
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button:{
        backgroundColor: 'black',
        borderRadius: 50,
        paddingHorizontal: 80,
        paddingVertical: 25,
        bottom: -200,
    }
})