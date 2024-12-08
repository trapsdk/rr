import { StyleSheet } from "react-native";

export const customStyles = StyleSheet.create({
    bg: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        borderRadius: 6,
        borderColor: "rgba(0, 0, 0, 0.11)"
    },
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
})