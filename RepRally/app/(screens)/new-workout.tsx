import {FlatList, ScrollView, TouchableOpacity, View} from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { SignedIn } from '@clerk/clerk-expo';
import { Text } from 'react-native'
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import React from 'react';
import { router }  from 'expo-router';
import Button from '@/components/Button';
import { styles } from '@/constants/styles'
import {GestureHandlerRootView, TextInput} from 'react-native-gesture-handler';
import {mainStyles} from "@/constants/main-styles";

function NewWorkout() {
    const [name, setName] = React.useState('');
    const [targetReps, setTargetReps] = React.useState('10')
    const[workouts] = React.useState('');

    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'Bicep Curl',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Tricep Extension',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Bench Press',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Shoulder Fly',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Squats',
        },
    ];
    // useMutation references the new `insert` mutation in workouts.ts
    const addWorkout = useMutation(api.workouts.insert)

    async function onAddNewWorkoutPressed() {
        await addWorkout({
            name,
            targetReps: Number(targetReps)
        })
        router.replace("/workout")
    }

    return (
        <GestureHandlerRootView style={{
            alignItems: 'center',
            backgroundColor: '#2e2e2e',
            justifyContent: 'center',
            flex: 1

        }}>




                <View style={{top: 120}}>
                    <Text style={{
                        color: '#c4e5ef',
                        fontFamily: "Poppins-Regular",
                        left: -75,
                        fontSize: 30,
                    }}>New Workout</Text>
                </View>

                <View style={{
                    top: -75,
                    left: 100,
                    flex: 1,

                }}>
                    <TouchableOpacity style={mainStyles.addWorkoutButton} >
                        <Text style={mainStyles.addWorkoutButtonText}>+</Text>
                    </TouchableOpacity>

                </View>

            <View style={{flex: 3}}>
                <View style={{top: -50}}>
                    <Text style={mainStyles.buttontext}>Workout Title</Text>
                    <TextInput
                        style={mainStyles.input}
                        value={name}
                        onChangeText={setName} />

                </View>


                <View style={{top: -25}}>
                    <FlatList
                        data={DATA}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity>
                                <View style={mainStyles.listItem}>
                                    <Text style={{
                                        color: '#bce1ec',
                                        fontSize: 25,
                                    }}
                                    >{item.title}</Text>
                                </View>
                            </TouchableOpacity>

                        )}
                        contentContainerStyle={mainStyles.flatListContent}
                    />
                </View>

                <View
                    // style={{bottom: 325}}
                >
                    <Text style={mainStyles.buttontext}>Target reps</Text>
                    <TextInput
                        style={mainStyles.input}
                        keyboardType='numeric'
                        value={targetReps}
                        onChangeText={setTargetReps} />
                </View>


                <View style={{bottom: 450}}>
                    <TouchableOpacity style={mainStyles.addWorkoutButton} onPress={onAddNewWorkoutPressed}>
                        <Text style={mainStyles.addWorkoutButtonText}>save</Text>
                    </TouchableOpacity>
                </View>


            </View>




            </GestureHandlerRootView>
    )
}

export default NewWorkout