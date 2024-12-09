import * as React from 'react'
import {Text, TextInput, Button, View, StyleSheet, TextProps, TextStyle} from 'react-native'
import {SignedIn, SignedOut, useAuth, useUser} from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import {mainStyles} from "@/constants/main-styles";
import { LinearTextGradient } from "react-native-text-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import {LinearGradient} from "expo-linear-gradient";

export default function Home() {
    const {user} = useUser();



    return(

        <View style={mainStyles.bg}>
                    <Text style={mainStyles.buttontext}> Welcome {user?.username}! </Text>
        </View>
    )
}