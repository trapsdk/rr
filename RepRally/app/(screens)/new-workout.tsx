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
import {useContext, useState} from "react";
import {GestureHandlerRootView} from "react-native-gesture-handler";
function NewWorkout() {

    const [name, setName] = React.useState('');
    const [workoutId, setWorkoutId] = React.useState('10');
    const[workouts] = React.useState('');
    const DATA = useQuery(api.workouts.list);

    // useMutation references the new `insert` mutation in workouts.ts
    const addWorkout = useMutation(api.workouts.createWorkout);

    async function onAddNewWorkoutPressed() {
        await addWorkout({
            name,
        })
        router.replace("/workout")
    }


    return (
        <GestureHandlerRootView>

            <Authenticated>
                <ClerkLoaded>

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
                                    borderColor: "rgba(0, 0, 0, 0.11)",
                                    color: 'white'
                                }}
                                placeholder="Workout Title"
                                placeholderTextColor={"#c4e5ef"}

                                value={name}
                                onChangeText={setName} />
                        </View>

                        {/*<View style={{flex: 3}}>*/}
                        {/*    <FlatList*/}
                        {/*        data={DATA}*/}
                        {/*        keyExtractor={(item, index) => index.toString()}*/}
                        {/*        renderItem={({ item }) => (*/}
                        {/*            <TouchableOpacity>*/}
                        {/*                <View style={mainStyles.listItem}>*/}
                        {/*                    <Text style={{*/}
                        {/*                        color: '#bce1ec',*/}
                        {/*                        fontSize: 25,*/}
                        {/*                    }}*/}
                        {/*                    >{item.name}</Text>*/}
                        {/*                </View>*/}
                        {/*            </TouchableOpacity>*/}

                        {/*        )}*/}
                        {/*        ListHeaderComponent={*/}

                        {/*            <TouchableOpacity style={{*/}
                        {/*                backgroundColor: '#202324',*/}
                        {/*                borderRadius: 50,*/}
                        {/*                paddingHorizontal: 50,*/}
                        {/*                paddingVertical:10,*/}
                        {/*            }} onPress={()=>{}}*/}
                        {/*            >*/}
                        {/*                <Text style={mainStyles.addWorkoutButtonText}>add exercise</Text>*/}
                        {/*            </TouchableOpacity>*/}
                        {/*        }*/}
                        {/*        contentContainerStyle={mainStyles.flatListContent}*/}
                        {/*    />*/}
                        {/*</View>*/}



                    </View>

                </ClerkLoaded>
            </Authenticated>

        </GestureHandlerRootView>
    )
}


export default NewWorkout