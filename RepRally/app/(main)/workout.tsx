import * as React from
        'react'
import {Text, TextInput, Button, View, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity} from 'react-native'
import {ClerkLoaded, useAuth, useSignUp} from '@clerk/clerk-expo'
import {Link, router, useRouter} from 'expo-router'
import {mainStyles} from "@/constants/main-styles";
import {Authenticated, useConvex, useConvexAuth, useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import {useContext} from "react";

export default function Workout() {

    const {isLoading } = useConvexAuth();
    const workouts = useQuery(api.workouts.list)

    const addWorkout = (): void => {
        router.navigate("/(screens)/new-workout")
    };

    if (isLoading) {
        // If the authentication status is still loading, render a loading indicator
        return <ActivityIndicator size={"large"}/>;
    }


    return(
        <Authenticated>
        <ClerkLoaded>
        <View style={mainStyles.bg}>

            <View style={{top: 125}}>
                <Text style={{
                    color: '#c4e5ef',
                    fontFamily: "Poppins-Regular",
                    left: -100,
                    fontSize: 30,
                }}>Workouts</Text>
            </View>

            <View style={{
                top: -75,
                left: 100


            }}>
                    <TouchableOpacity style={mainStyles.addWorkoutButton} onPress={addWorkout}>
                        <Text style={mainStyles.addWorkoutButtonText}>+</Text>
                    </TouchableOpacity>

                    {workouts?.map(({ _id, text }) => <Text key={_id}>{text}</Text>)}
            </View>




            <View style={{top: 0,
                // backgroundColor: 'teal',
                width: '90%',
            }}>
                {!workouts ? <ActivityIndicator/> : null}
                <FlatList
                    data={workouts}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={mainStyles.listItem}>
                            <Text style={{
                                color: '#bce1ec',
                                fontSize: 25,
                            }}
                            >{item.name}</Text>
                        </View>
                    )}
                    contentContainerStyle={mainStyles.flatListContent}
                />
            </View>

        </View>
        </ClerkLoaded>
        </Authenticated>

    )
}