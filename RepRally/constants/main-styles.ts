import { StyleSheet } from "react-native";


export const mainStyles = StyleSheet.create({
    listItem: {
        padding: 30,
        marginVertical: 5,
        backgroundColor: "#424242",
        borderRadius: 15,
    },
    flatListContent: {
        paddingBottom: 20, // Prevent cut-off on the last item

    },
    bg: {
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        backgroundColor: '#2e2e2e',
    },
    input: {
        height: 40,
            borderWidth: 2,
            backgroundColor: 'white',
            padding: 10,
            borderRadius: 10,

            borderColor: "rgba(0, 0, 0, 0.11)"
    },
    button:{
        backgroundColor: '#424242',
            borderRadius: 50,
            paddingHorizontal: 50,
            paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
            bottom: -155,
    },
    buttontext:{
        fontSize: 30,
            fontFamily: "Poppins-Regular",
            color: '#bce1ec',
    },
    annotatedtext: {
        bottom: -200,
        fontWeight: "bold",
    },
    tabfooter:{
      backgroundColor: 'transparent',
    },
    welcometext:{
        color: 'white',
        fontSize: 25,
        top: -250,
    }
})