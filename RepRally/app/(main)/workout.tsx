import * as React from
        'react'
import {Text, TextInput, Button, View, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity} from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import {Link, router, useRouter} from 'expo-router'
import {mainStyles} from "@/constants/main-styles";
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import {Image} from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";

export default function Workout() {

    const tasks = useQuery(api.workouts.list);
    const workouts = useQuery(api.workouts.list)

    const addWorkout = (): void => {

        router.navigate("/(screens)/new-workout")

    };


    return(


        <ParallaxScrollView
            headerBackgroundColor={{ light: '#2A3335', dark: '#2A3335' }}
            headerImage={
                <Image source={require('../img/bg.png')}
                       style={{height: "100%"}}
                />
            }

        >

        <View style={{top: -165}}>
                <TouchableOpacity style={mainStyles.button} onPress={addWorkout}>
                    <Text style={mainStyles.buttontext}>Add Workout</Text>
                </TouchableOpacity>
            </View>



            <View style={{
                flex: 1,
                backgroundColor: 'teal',
            }}>
                <FlatList
                    scrollEnabled={false}
                    data={workouts}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={mainStyles.listItem}>
                            <Text style={{color: 'white'}}>{item.name}</Text>
                        </View>
                    )}
                    contentContainerStyle={mainStyles.flatListContent}
                />
            </View>

        </ParallaxScrollView>

    )
}