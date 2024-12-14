import { StyleSheet } from "react-native";


export const mainStyles = StyleSheet.create({
    listItem: {
        padding: 15,
        marginVertical: 5,
        backgroundColor: "black",
        borderRadius: 10,
    },
    flatListContent: {
        paddingBottom: 20, // Prevent cut-off on the last item
    },
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
            paddingHorizontal: 50,
            paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
            bottom: -155,
    },
    buttontext:{
        fontSize: 30,
            fontFamily: "Poppins-Regular",
            color: 'white',
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