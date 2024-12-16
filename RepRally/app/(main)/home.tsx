import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import React from 'react';
import {mainStyles} from "@/constants/main-styles";

export default function HomeScreen() {
    const workouts = useQuery(api.workouts.list)

    return (
        <View style={mainStyles.bg}>

        </View>
    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});
