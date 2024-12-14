import * as React from
        'react'
import {Text, TextInput, Button, View, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity} from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import {Link, router, useRouter} from 'expo-router'
import {mainStyles} from "@/constants/main-styles";
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import {ThemedView} from "@/components/ThemedView";
import {Ionicons} from "@expo/vector-icons";
import ListItem from "@/components/ListItem";
import {convertDescriptorToString} from "jest-util";
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
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <Image source={require('../img/header.png')}
                       style={mainStyles.bg}
                />

            }>

        <View>
            <View style={{top: -170}}>

                <TouchableOpacity style={mainStyles.button} onPress={addWorkout}>
                    <Text style={mainStyles.buttontext}>New Workout</Text>
                </TouchableOpacity>

            </View>



            <View style={{flex: 1}}>
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



        </View>
        </ParallaxScrollView>
    )
}