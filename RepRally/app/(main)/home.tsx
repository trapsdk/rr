import * as React from 'react'
import {Text, TextInput, Button, View, StyleSheet} from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'

export default function Home() {

    return(
        <View>
           <Text>Home Screen</Text>
        </View>
    )
}