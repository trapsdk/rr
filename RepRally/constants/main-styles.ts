import { StyleSheet } from "react-native";


export const mainStyles = StyleSheet.create({
    listItem: {
        padding: 30,
        marginVertical: 7,
        backgroundColor: "#202324",
        borderRadius: 25,
        alignItems: "center",
    },
    flatListContent: {
        paddingBottom: 20, // Prevent cut-off on the last item

    },
    bg: {
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        backgroundColor: '#eff7f7',
    },
    input: {
        height: 50,
            borderWidth: 2,
            backgroundColor: 'white',
            padding: 15,
            borderRadius: 20,
            width: 300,
            borderColor: "rgba(0, 0, 0, 0.11)"
    },
    button:{
        backgroundColor: '#202324',
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
            color: '#c4e5ef',
    },
    addWorkoutButton:{
        backgroundColor: '#202324',
        borderRadius: 50,
        paddingHorizontal: 50,
        paddingVertical: 0,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: -155,
    },
    addWorkoutButtonText:{
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
        color: 'black',
        fontSize: 25,
        top: -250,
        fontFamily: "Poppins-Regular",
    }
})