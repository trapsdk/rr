import { useSignIn } from '@clerk/clerk-expo'
import {Link, router, useRouter} from 'expo-router'
import {Text, TextInput, Button, View, ImageBackground, TouchableOpacity} from 'react-native'
import React from 'react'
import {customStyles} from "@/constants/custom-styles";
import {SignIn} from "@clerk/clerk-react";
import {authStyles} from "@/constants/auth-styles";


export default function Page() {
    const {signIn, setActive, isLoaded} = useSignIn()
    const router = useRouter()

    const [emailAddress, setEmailAddress] = React.useState('')
    const [password, setPassword] = React.useState('')

    // Handle the submission of the sign-in form
    const onSignInPress = React.useCallback(async () => {
        if (!isLoaded) return

        // Start the sign-in process using the email and password provided
        try {
            const signInAttempt = await signIn.create({
                identifier: emailAddress,
                password,
            })

            // If sign-in process is complete, set the created session as active
            // and redirect the user
            if (signInAttempt.status === 'complete') {
                await setActive({session: signInAttempt.createdSessionId})
                router.replace('/home')
            } else {
                // If the status isn't complete, check why. User might need to
                // complete further steps.
                console.error(JSON.stringify(signInAttempt, null, 2))
            }
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
        }
    }, [isLoaded, emailAddress, password])

    return (
        <ImageBackground source={require('../img/bg.png')} style={customStyles.bg}>
            <View style={{top: -150}}>
                <TextInput style={authStyles.input}
                           autoCapitalize="none"
                           value={emailAddress}
                           placeholder="Enter email"
                           onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
                />
                <View/>
                <View style={{top: 100}}>
                <TextInput style={authStyles.input}
                           value={password}
                           placeholder="Enter password"
                           secureTextEntry={true}
                           onChangeText={(password) => setPassword(password)}
                />

                <TouchableOpacity style={authStyles.button} onPress={onSignInPress}>
                    <Text style={authStyles.buttontext}>login</Text>
                </TouchableOpacity>
                </View>

                <View style={{top: 175}}>

                    <Text style={authStyles.annotatedtext}>
                        Don't have an account? Click <Text onPress={()=> router.replace('/sign-up')} style={{textDecorationLine: 'underline'}}>here</Text> to signup.
                    </Text>
                    {/*<Link href={"/sign-up"}>*/}
                    {/*    <Text>Sign up</Text>*/}
                    {/*</Link>*/}


                </View>


            </View>
        </ImageBackground>
    )
}