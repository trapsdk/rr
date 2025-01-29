import * as React from
        'react'
import {
    Text,
    TextInput,
    Button,
    View,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    Modal
} from 'react-native'
import {ClerkLoaded, useAuth, useSignUp} from '@clerk/clerk-expo'
import {Link, router, useRouter} from 'expo-router'
import {mainStyles} from "@/constants/main-styles";
import {Authenticated, useConvex, useConvexAuth, useMutation, useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import {useContext} from "react";
import {authStyles} from "@/constants/auth-styles";

export default function Workout() {

    const {isLoading} = useConvexAuth();
    const workouts = useQuery(api.workouts.list);
    const [workoutId, setWorkoutId] = React.useState("");
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [workoutName, setWorkoutName] = React.useState("");
    const addWorkout = useMutation(api.workouts.createWorkout);
    const [currentView, setCurrentView] = React.useState("title"); // Tracks the current view in the modal

    // const addWorkout = (): void => {
    //     router.navigate("/(screens)/new-workout")
    // };
    async function onAddNewWorkoutPressed(workoutName: string) {
        await addWorkout({
            name: workoutName,
        })
    }
    const handleCloseModal = () => {
        setModalVisible(false); // Close the modal
        setCurrentView("title"); // Reset to the title view when modal is closed
        setWorkoutName(""); // Reset the input field
        onAddNewWorkoutPressed(workoutName); // Pass the workout name to the parent component
    };
    const handleAddExercises = () => {


        setCurrentView("exercises"); // Switch to the exercises view
    };


    return(
        <Authenticated>
        <ClerkLoaded>
        <View style={mainStyles.bg}>

            <View style={{flex: 1, maxHeight: '20%', top: 85}}>
                <Text style={{
                    color: 'black',
                    fontFamily: "Poppins-Regular",
                    left: -100,
                    fontSize: 30,
                }}>Workouts</Text>
                <View style={{
                    top: -200,
                    left: 100,
                }}>
                    <TouchableOpacity style={mainStyles.addWorkoutButton} onPress={()=>setModalVisible(true)}>
                        <Text style={mainStyles.addWorkoutButtonText}>+</Text>
                    </TouchableOpacity>

                    {/*{workouts?.map(({ _id, name }) => <Text key={_id}>{name}</Text>)}*/}
                </View>
            </View>





            {/*/////////////*/}
            <Modal
                visible={isModalVisible}
                animationType={"slide"}
                presentationStyle={"pageSheet"}
                onRequestClose={handleCloseModal}
            >
                <View style={mainStyles.bg}>
                    {/* Title View */}
                    {currentView === "title" && (
                        <>
                            <View style={{ flex: 1, top: 50 }}>
                                <Text style={deep.modalTitle}>New Workout</Text>
                            </View>

                            <View style={{ flex: 2, width: "75%", top: 100 }}>
                                <TextInput
                                    style={mainStyles.input}
                                    value={workoutName}
                                    placeholder="Enter a title"
                                    placeholderTextColor="#2e2e2e"
                                    maxLength={25}
                                    onChangeText={setWorkoutName}
                                />
                            </View>

                            <View style={{ flex: 3, bottom: -125 }}>
                                <TouchableOpacity
                                    style={mainStyles.addWorkoutButton}
                                    onPress={handleAddExercises}
                                >
                                    <Text style={mainStyles.addWorkoutButtonText}>Add Exercises</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}

                    {/* Exercises View */}
                    {currentView === "exercises" && (
                        <>
                            <View style={{ flex: 1, top: 50 }}>
                                <Text style={deep.modalTitle}>Add Exercises</Text>
                            </View>

                            <View style={{ flex: 2, width: "75%", top: 100 }}>
                                <Text style={deep.exerciseText}>Exercise list goes here...</Text>
                            </View>

                            <View style={{ flex: 3, bottom: -125 }}>
                                <TouchableOpacity
                                    style={deep.backButton}
                                    onPress={() => setCurrentView("title")} // Go back to the title view
                                >
                                    <Text style={deep.backButtonText}>Back</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </View>

        </Modal>





            <View style={{ flex: 2,
                // backgroundColor: 'teal',
                width: '90%',
                maxHeight: '75%'
            }}>
                {!workouts ? <ActivityIndicator/> : null}
                <FlatList
                    data={workouts}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (

                        <TouchableOpacity>
                            <View style={mainStyles.listItem}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 25,
                                }}
                                >{item.name}</Text>
                            </View>
                        </TouchableOpacity>

                    )}
                    contentContainerStyle={mainStyles.flatListContent}
                />
            </View>

        </View>
        </ClerkLoaded>
        </Authenticated>

    )
};
const deep = StyleSheet.create({
    bg: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fff",
    },
    modalTitle: {
        fontSize: 30,
        color: "#2e2e2e",
        fontFamily: "Poppins-Regular",
        left: -75,
    },
    input: {
        fontSize: 30,
        color: "#2e2e2e",
        fontFamily: "Poppins-Regular",
        padding: 10,
        borderRadius: 10,
        width: "100%",
        borderBottomColor: "#2e2e2e",
        borderBottomWidth: 1,
        textAlign: "center",
    },
    addWorkoutButton: {
        backgroundColor: "#007BFF",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    addWorkoutButtonText: {
        color: "#fff",
        fontSize: 18,
        fontFamily: "Poppins-Regular",
    },
    backButton: {
        backgroundColor: "#ccc",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },
    backButtonText: {
        color: "#2e2e2e",
        fontSize: 18,
        fontFamily: "Poppins-Regular",
    },
    exerciseText: {
        fontSize: 20,
        color: "#2e2e2e",
        fontFamily: "Poppins-Regular",
        textAlign: "center",
    },
});