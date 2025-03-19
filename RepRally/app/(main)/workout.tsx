import * as React from
        'react'
import {
    Text,
    TextInput,
    View,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    Modal, Keyboard, Alert
} from 'react-native'

import {ClerkLoaded} from '@clerk/clerk-expo'
import {mainStyles} from "@/constants/main-styles";
import {Authenticated, useMutation, useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import {useState} from "react";

export default function Workout() {


    const workouts = useQuery(api.workouts.list);
    const addWorkout = useMutation(api.workouts.createWorkout);
    const deleteWorkout = useMutation(api.workouts.deleteWorkout)
    const markDate = useMutation(api.markeddates.createMarkedDates);

    const [isModalVisible, setModalVisible] = React.useState(false);
    const [workoutName, setWorkoutName] = React.useState("");
    const [currentView, setCurrentView] = React.useState("title"); // Tracks the current view in the modal
    const [modalVisible, setWorkoutModalVisible] = useState(false);
    const [exerciseName, setExerciseName] = useState("");
    const [reps, setReps] = useState("");
    const [sets, setSets] = useState("");
    const [weight, setWeight] = useState("");
    const [exercises, setExercises] = useState<{ name: string; reps: number; sets: number; weight: number }[]>([]);
    // const [selectedWorkout, setSelectedWorkout] = useState<{ id: string; title: string; exercises: [] } | null>(null);

    const [selectedWorkout, setSelectedWorkout] = useState<any | null>(null);

    const handleLogWorkout = async () => {

        const date = new Date();
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        await markDate({
            date: formattedDate,
            selected: false,
            marked: true,
            dotColor: "white",
        })

        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowDate = tomorrow.toISOString().split('T')[0];
        console.log(tomorrowDate);


        alert("Workout has been logged to Calender.");
    };

    const openWorkoutDetails = (workout: any) => {
        setSelectedWorkout(workout);
        setWorkoutModalVisible(true);
    };
    const handleDeleteWorkoutFunction =  async () => {
        await deleteWorkout( { id: selectedWorkout._id });
        setWorkoutModalVisible(false);
        setSelectedWorkout(null);
    };

    const handleDeleteWorkout = async () => {

        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this workout?',
            [
                { text: 'No', onPress: () => null },
                { text: 'Yes', onPress: () => handleDeleteWorkoutFunction() },
            ],
            { cancelable: false }
        )

    };

    async function onAddNewWorkoutPressed(workoutName: string, exercises: any[]) {
        await addWorkout({
            title: workoutName,
            exercises: exercises,
        })

        setExercises([]);

    }
    const handleCloseModal = () => {

        if (workoutName && exercises.length > 0) {
            setModalVisible(false); // Close the modal

            onAddNewWorkoutPressed(workoutName, exercises); // Pass the workout name to the parent component
            setWorkoutName(""); // Reset the input field
        } else if (workoutName.length < 1 && exercises.length > 0) {
            Alert.alert('Please enter a title for the workout.');
        }

        else if ( workoutName.length < 1 ){
            setModalVisible(false); // Close// the modal
            setExercises([]);
        }

    };


    const handleAddExercises = () => {
        setCurrentView("exercises"); // Switch to the exercises view
    };

    const handleAddExercise = () => {
        if (exerciseName && reps && sets && weight) {
            const newExercise = {
                name: exerciseName,
                reps: parseInt(reps, 10),
                sets: parseInt(sets, 10),
                weight: parseInt(weight, 10),
            };
            setExercises([...exercises, newExercise]); // Add the new exercise to the array
            setExerciseName(""); // Clear input fields
            setReps("");
            setSets("");
            setWeight("");
            setCurrentView("exercises"); // Go back to the exercises view
        } else {
            alert("Please fill in all fields.");
        }
    };


    // @ts-ignore
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
                            <View style={{ flex: 1, top: 70 }}>
                                <Text style={deep.modalTitle}>New Workout</Text>
                            </View>

                            <View style={{ flex: 2, width: "75%", top: 100 }}>
                                <TextInput
                                    style={mainStyles.input}
                                    value={workoutName}
                                    placeholder="Enter a title"
                                    placeholderTextColor="#2e2e2e"
                                    maxLength={22}
                                    onChangeText={setWorkoutName}
                                />
                            </View>

                            <View style={{ flex: 2, width: "75%", top: 25 }}>

                                <FlatList
                                    data={exercises}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item }) => (
                                        <View style={{ marginBottom: 10 }}>
                                            <Text style={deep.exerciseText}>
                                                {item.name} - {item.sets} sets of {item.reps} reps, {item.weight} lbs
                                            </Text>
                                        </View>
                                    )}
                                />


                            </View>

                            <View style={{ flex: 3, bottom: 75}}>

                                <View style={{ top: 25}}>
                                    <TouchableOpacity
                                        style={mainStyles.addWorkoutButton}
                                        onPress={handleAddExercises}
                                    >
                                        <Text style={mainStyles.addWorkoutButtonText}>Add Exercises</Text>
                                    </TouchableOpacity>
                                </View>


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
                            <View style={{ flex: 1, top: 70 }}>
                                <Text style={deep.modalTitle}>Add Exercises</Text>
                            </View>

                            <View style={{ flex: 2, width: "75%", top: -30 }}>
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
                                    returnKeyType={"done"}
                                    onSubmitEditing={() => Keyboard.dismiss()}
                                />
                                <TextInput
                                    style={deep.input}
                                    placeholder="Number of Reps"
                                    placeholderTextColor="#2e2e2e"
                                    value={reps}
                                    onChangeText={setReps}
                                    keyboardType="numeric"
                                    returnKeyType={"done"}
                                    onSubmitEditing={() => Keyboard.dismiss()}
                                />
                                <TextInput
                                    style={deep.input}
                                    placeholder="Weight"
                                    placeholderTextColor="#2e2e2e"
                                    value={weight}
                                    onChangeText={setWeight}
                                    keyboardType="numeric"
                                    returnKeyType={"done"}
                                    onSubmitEditing={() => Keyboard.dismiss()}
                                />

                            </View>

                            <View style={{ flex: 2  }}>
                                <View style={{bottom: 33}}>
                                    <TouchableOpacity
                                        style={mainStyles.addWorkoutButton}
                                        onPress={handleAddExercise}
                                    >
                                        <Text style={mainStyles.addWorkoutButtonText}>Save Exercise</Text>
                                    </TouchableOpacity>
                                </View>

                                <View style={{bottom: 55}}>
                                    <TouchableOpacity
                                        style={deep.backButton}
                                        onPress={() => setCurrentView("title")} // Go back to the exercises view
                                    >
                                        <Text style={deep.backButtonText}>Go Back</Text>
                                    </TouchableOpacity>
                                </View>


                            </View>
                        </>
                    )}
                </View>

        </Modal>




            {/*/////// Modal for when workout is selected //////*/}
            <Modal
                animationType={"slide"}
                presentationStyle={"pageSheet"}
                visible={modalVisible}
                onRequestClose={() => setWorkoutModalVisible(false)}
            >
                <View style={mainStyles.bg}>

                    {/* Modal Title */}
                    <View>
                        <View style={{ flex: 1, top: 65, alignItems: "center", maxWidth: "90%" }}>
                            <Text style={deep.modalTitle}>{selectedWorkout?.title}</Text>
                        </View>

                        {/* Exercises List */}
                        <View style={{ flex: 3, top: -25 }}>
                            <FlatList
                                data={selectedWorkout?.exercises}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({item}: {item: {name: string, sets: number, reps: number, weight: number}}) => (
                                    <View style={deep.exerciseListItem}>
                                        <Text style={deep.exerciseText}>
                                            {item.name} - {item.sets} sets x {item.reps} reps, {item.weight} lbs
                                        </Text>
                                    </View>
                                )}
                                ListEmptyComponent={
                                    <Text>No exercises added yet.</Text>
                                }
                            />
                        </View>

                        {/* Buttons at bottom of Modal */}

                        <View style={{flex: 1, alignItems: "center"}}>

                            <View style={{left: -75, bottom: -2}}>
                                <TouchableOpacity style={deep.workoutButtons} onPress={()=> setWorkoutModalVisible(false)}>
                                    <Text style={deep.workoutButtonsText}>Close</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={deep.workoutButtons} onPress={()=> handleLogWorkout()}>
                                    <Text style={deep.workoutButtonsText}>Log</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{left: 75, bottom: 125}}>
                            <TouchableOpacity style={deep.workoutButtons} onPress={()=> null}>
                                <Text style={deep.workoutButtonsText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={deep.workoutButtons} onPress={()=> handleDeleteWorkout()}>
                                <Text style={deep.workoutButtonsText}>Delete</Text>
                            </TouchableOpacity>
                            </View>

                            {/*<Button title="Close" onPress={() => setWorkoutModalVisible(false)} />*/}
                            {/*<Button title="Log Workout" onPress={() => handleLogWorkout()} />*/}
                            {/*<Button title="Delete" onPress={() => handleDeleteWorkout() } />*/}
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
        paddingVertical: 10,
    },
    workoutButtons:{
        backgroundColor: '#202324',
        borderRadius: 50,
        paddingVertical: 15,
        marginVertical: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        // bottom: -155,
    },
    workoutButtonsText:{
        fontSize: 20,
        fontFamily: "Poppins-Regular",
        color: 'white',
    },
    exerciseText: {
        fontSize: 17,
        color: "#000000",
        fontFamily: "Poppins-Regular",
        textAlign: "center",
    },
    exerciseListItem: {
        padding: 15,
        marginVertical: 10,
        // backgroundColor: "#202324",
        borderColor: "#202324",
        borderWidth: 1,
        borderRadius: 5,
        alignItems: "center",
    },
    flatlistbg: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#fwferg",
        paddingVertical: 10,
    },
    modalTitle: {
        fontSize: 30,
        color: "#2e2e2e",
        fontFamily: "Poppins-Regular",
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

});