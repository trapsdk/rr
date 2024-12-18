import { StyleSheet } from "react-native";


export const authStyles = StyleSheet.create({
    errorText: {
        color: 'red',
        marginBottom: 10
    },
    bg: {
        width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
    },
    input: {
        height: 40,
        borderBottomWidth: 2,
        width: 300,
            padding: 10,
            borderRadius: 10,
            borderBottomColor: '#2e2e2e',
            borderColor: "rgba(0, 0, 0, 0.11)"
    },
    button:{
        backgroundColor: '#2e2e2e',
            borderRadius: 50,
            paddingHorizontal: 100,
            paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttontext:{
        fontSize: 25,
            fontFamily: "Poppins-Regular",
            color: 'white',
            // justifyContent: 'center',
            // alignItems: 'center',

    },
    titletext:{
        fontFamily: "Poppins-Regular",
        fontSize: 50,
        fontWeight: "bold",
        color: '#2e2e2e'
    },
    annotatedtext: {
        bottom: -215,
        fontWeight: "bold",
        color: '#2e2e2e'
    },
})