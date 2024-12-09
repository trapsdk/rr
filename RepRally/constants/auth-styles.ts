import { StyleSheet } from "react-native";


export const authStyles = StyleSheet.create({
    bg: {
        width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
    },
    input: {
        height: 40,
        borderBottomWidth: 2,
            // backgroundColor: 'white',
            // color: 'black',
            padding: 10,
            borderRadius: 10,

            borderColor: "rgba(0, 0, 0, 0.11)"
    },
    button:{
        backgroundColor: 'black',
            borderRadius: 50,
            paddingHorizontal: 30,
            paddingVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
            bottom: -175,
    },
    buttontext:{
        fontSize: 30,
            fontFamily: "Poppins-Regular",
            color: 'white',
            // justifyContent: 'center',
            // alignItems: 'center',

    },
    annotatedtext: {
        bottom: -200,
        fontWeight: "bold",
    },
})