import React from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';


export default function Signup(){
    return (
            <View style={styles.containerOne}>
                <Text style={{fontSize: 30}}>HELLO WORLD!</Text>
            </View>

    );
}

const styles = StyleSheet.create({
    containerOne:{
        flex: 1,
        height: "auto",
        width: "auto",
        alignContent: 'center',
        alignItems: 'center',
    },
    containerTwo:{
        flex: 2,
        height: "auto",
        width: "auto",
        alignContent: 'center',
        alignItems: 'center',

    },
    containerThree:{
        flex: 3,
        height: "auto",
        width: "auto",
        alignContent: 'center',
        alignItems: 'center',
    },
    center:{
        justifyContent: 'center',
        alignItems: 'center',
    }
})