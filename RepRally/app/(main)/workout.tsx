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
import {mainStyles} from "@/constants/main-styles";
import {Authenticated, useConvex, useConvexAuth, useMutation, useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import {useContext, useState} from "react";
import {authStyles} from "@/constants/auth-styles";
import {createWorkout} from "@/convex/workouts";

export default function Workout() {

    const {isLoading} = useConvexAuth();
    const workouts = useQuery(api.workouts.list);
    const [workoutId, setWorkoutId] = React.useState("");
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [workoutName, setWorkoutName] = React.useState("");
    const addWorkout = useMutation(api.workouts.createWorkout);
    const [currentView, setCurrentView] = React.useState("title"); // Tracks the current view in the modal
    const [modalVisible, setWorkoutModalVisible] = useState(false);
    const [exerciseName, setExerciseName] = useState("");
    const [reps, setReps] = useState("");
    const [sets, setSets] = useState("");
    const [exercises, setExercises] = useState<{ name: string; reps: number; sets: number; }[]>([]);

    const [selectedWorkout, setSelectedWorkout] = useState<{ id: string; title: string; exercises: any } | null>(null);

    const openWorkoutDetails = async (workout: { _id: string; title: string, exercises: any }) => {
    //     const exercises = useQuery(api.workouts.getExercisesByWorkout, {
    //         title: workout.title,
    //     });
        setSelectedWorkout({ id: workout._id, title: workout.title, exercises });
        setWorkoutModalVisible(true);
    };


    // const addWorkout = (): void => {
    //     router.navigate("/(screens)/new-workout")
    // };
    async function onAddNewWorkoutPressed(workoutName: string, exercises: any[]) {
        await addWorkout({
            title: workoutName,
            exercises: exercises,
        })
    }
    const handleCloseModal = () => {

        if (workoutName && exercises.length > 0) {

            setModalVisible(false); // Close the modal
            setCurrentView("title"); // Reset to the title view when modal is closed
            setWorkoutName(""); // Reset the input field
            onAddNewWorkoutPressed(workoutName, exercises); // Pass the workout name to the parent component


        } else {
            alert("Please add a title and at least one exercise.");
        }
    };


    const handleAddExercises = () => {
        setCurrentView("exercises"); // Switch to the exercises view
    };

    const handleAddExercise = () => {
        if (exerciseName && reps && sets) {
            const newExercise = {
                name: exerciseName,
                reps: parseInt(reps, 10),
                sets: parseInt(sets, 10),
            };
            setExercises([...exercises, newExercise]); // Add the new exercise to the array
            setExerciseName(""); // Clear input fields
            setReps("");
            setSets("");
            setCurrentView("exercises"); // Go back to the exercises view
        } else {
            alert("Please fill in all fields.");
        }
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





            {/*/////// Add workout Modal  //////*/}
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

                            <View style={{ flex: 2, width: "75%", top: 100 }}>
                                {exercises.map((exercise, index) => (
                                    <View key={index} style={{ marginBottom: 10 }}>
                                        <Text style={deep.exerciseText}>
                                            {exercise.name} - {exercise.sets} sets of {exercise.reps} reps
                                        </Text>
                                    </View>
                                ))}
                            </View>

                            <View style={{ flex: 3, bottom: 75}}>
                                <TouchableOpacity
                                    style={mainStyles.addWorkoutButton}
                                    onPress={handleAddExercises}
                                >
                                    <Text style={mainStyles.addWorkoutButtonText}>Add Exercises</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={deep.backButton}
                                    onPress={() => handleCloseModal()} // Go back to the exercises view
                                >
                                    <Text style={deep.backButtonText}>Save Workout</Text>
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

                            <View style={{ flex: 2, width: "75%", top: 20 }}>
                                <TextInput
                                    style={deep.input}
                                    placeholder="Exercise Name"
                                    placeholderTextColor="#2e2e2e"
                                    value={exerciseName}
                                    onChangeText={setExerciseName}
                                />
                                <TextInput
                                    style={deep.input}
                                    placeholder="Number of Sets"
                                    placeholderTextColor="#2e2e2e"
                                    value={sets}
                                    onChangeText={setSets}
                                    keyboardType="numeric"
                                />
                                <TextInput
                                    style={deep.input}
                                    placeholder="Number of Reps"
                                    placeholderTextColor="#2e2e2e"
                                    value={reps}
                                    onChangeText={setReps}
                                    keyboardType="numeric"
                                />

                            </View>

                            <View style={{ flex: 3, bottom: 0 }}>
                                <TouchableOpacity
                                    style={mainStyles.addWorkoutButton}
                                    onPress={handleAddExercise}
                                >
                                    <Text style={mainStyles.addWorkoutButtonText}>Save Exercise</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    style={deep.backButton}
                                    onPress={() => setCurrentView("title")} // Go back to the exercises view
                                >
                                    <Text style={deep.backButtonText}>Go Back</Text>
                                </TouchableOpacity>

                            </View>
                        </>
                    )}
                </View>

        </Modal>




            {/*/////// Modal for when workout is selected //////*/}
            <Modal
                animationType={"slide"}
                presentationStyle={"pageSheet"}
                // transparent={true}
                visible={modalVisible}
                onRequestClose={() => setWorkoutModalVisible(false)}
            >
                <View style={mainStyles.bg}>

                    {/* Modal Title */}
                    <View>
                        <View style={{ flex: 1, top: 50 }}>
                            <Text style={deep.modalTitle}>{selectedWorkout?.title}</Text>
                        </View>

                        {/* Exercises List */}
                        <FlatList
                            data={exercises}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View style={mainStyles.bg}>
                                    <Text style={deep.exerciseText}>
                                        {item.name} - {item.sets} sets x {item.reps} reps
                                    </Text>
                                </View>
                            )}
                            ListEmptyComponent={
                                <Text>No exercises added yet.</Text>
                            }
                        />

                        {/* Close Button */}
                        <View style={{bottom: +50}}>
                            <Button title="Close" onPress={() => setWorkoutModalVisible(false)} />
                        </View>

                    </View>

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

                        <TouchableOpacity onPress={()=> openWorkoutDetails(item)} >
                            <View style={mainStyles.listItem}>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 25,
                                }}
                                >{item.title}</Text>
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
        fontSize: 15,
        color: "#2e2e2e",
        fontFamily: "Poppins-Regular",
        padding: 40,
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
        bottom: -200,
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