import * as React from 'react'
import {Text, TextInput, Button, View, StyleSheet} from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import {mainStyles} from "@/constants/main-styles";

export default function Home() {

    return(
        <View style={mainStyles.bg}>
           <Text>Home Screen</Text>
        </View>
    )
}