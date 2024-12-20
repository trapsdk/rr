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
import {auth} from "@clerk/nextjs/server";
import {authStyles} from "@/constants/auth-styles";

function NewWorkout() {
    const [name, setName] = React.useState('');
    const [workoutId, setWorkoutId] = React.useState('10');
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
            title: 'Bench Press',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Bench Press',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Bench Press',
        },
    ];
    // useMutation references the new `insert` mutation in workouts.ts
    const addWorkout = useMutation(api.workouts.insert)

    async function onAddNewWorkoutPressed() {
        await addWorkout({
            name,
            workoutId: Number(workoutId)
        })
        router.replace("/workout")
    }

    return (
        <GestureHandlerRootView>
            <View style={mainStyles.bg}>


                <View style={{flex: 1}}>
                    <Text style={{
                        color: '#c4e5ef',
                        fontFamily: "Poppins-Regular",
                        left: -75,
                        top: 150,
                        fontSize: 30,
                    }}>New Workout</Text>
                </View>

                <View style={{
                    top: -195,
                    left: 100,
                    // flex: 1,

                }}>
                    <TouchableOpacity style={mainStyles.addWorkoutButton} onPress={onAddNewWorkoutPressed} >
                        <Text style={mainStyles.addWorkoutButtonText}>+</Text>
                    </TouchableOpacity>

                </View>


                <View style={{top: -25}}>
                    <TextInput
                        style={{
                            height: 40,
                            borderBottomWidth: 2,
                            width: 300,
                            padding: 10,
                            borderRadius: 10,
                            borderBottomColor: 'white',
                            borderColor: "rgba(0, 0, 0, 0.11)"
                        }}
                        placeholder="Workout Title"
                        placeholderTextColor={"#c4e5ef"}
                        value={name}
                        onChangeText={setName} />
                </View>

                    <View style={{flex: 3}}>
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
                            ListHeaderComponent={

                                    <TouchableOpacity style={{
                                        backgroundColor: '#202324',
                                        borderRadius: 50,
                                        paddingHorizontal: 50,
                                        paddingVertical:10,
                                    }} >
                                        <Text style={mainStyles.addWorkoutButtonText}>add exercise</Text>
                                    </TouchableOpacity>
                            }
                            contentContainerStyle={mainStyles.flatListContent}
                        />
                    </View>



            </View>
        </GestureHandlerRootView>
    )
}

export default NewWorkout