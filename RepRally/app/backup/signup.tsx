import React from 'react';
import {
    View,
    Text,
    StyleSheet, SafeAreaView,
} from 'react-native';


const Signup = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Signup Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
    },
});

export default Signup;
