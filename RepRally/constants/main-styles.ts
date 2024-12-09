import { StyleSheet } from "react-native";


export const mainStyles = StyleSheet.create({
    bg: {
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        backgroundColor: '#222831',
    },
    input: {
        height: 40,
            borderWidth: 2,
            backgroundColor: 'white',
            // color: 'black',
            padding: 10,
            borderRadius: 10,

            borderColor: "rgba(0, 0, 0, 0.11)"
    },
    button:{
        backgroundColor: 'black',
            borderRadius: 50,
            paddingHorizontal: 80,
            paddingVertical: 25,
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
    tabfooter:{
      backgroundColor: 'transparent',
    },
})