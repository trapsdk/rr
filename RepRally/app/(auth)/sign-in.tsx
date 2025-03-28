import {useSignIn} from '@clerk/clerk-expo'
import {useRouter} from 'expo-router'
import {Text, TextInput,View,TouchableOpacity, Alert, SafeAreaView} from 'react-native'
import React from 'react'
import {authStyles} from "@/constants/auth-styles";
import { ClerkAPIError } from '@clerk/types'
import {mainStyles} from "@/constants/main-styles";


export default function Page() {
    const {signIn, setActive, isLoaded} = useSignIn()
    const router = useRouter()

    const [emailAddress, setEmailAddress] = React.useState('')
    const [password, setPassword] = React.useState('')
    // let [errors, setErrors] = React.useState<ClerkAPIError[]>()


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
        } catch (err: any) {

            function isClerkAPIError(error: any): error is ClerkAPIError {
                // @ts-ignore
                return (
                    error.message
                    // error &&
                    // Array.isArray(error.errors) &&
                    // error.errors.every(err => typeof err.message === 'string')
                );
            }
            console.error('Clerk Error:', err)
            if (isClerkAPIError(err)) {
                // const clerkError = err as ClerkAPIError & { errors: any[] }; // Add this line
                const errorMessage = err.message;
                Alert.alert('Sign-In Error', errorMessage);
            } else {
                Alert.alert('Error', 'An unexpected error occurred.');
            }
        }



    }, [isLoaded, emailAddress, password])

    return (


        <SafeAreaView style={mainStyles.bg}>



            <View style={{top : -150}}>
                <Text style={authStyles.titletext}>Sign In</Text>
            </View>

            <View style={{top : 0}}>
                <TextInput style={authStyles.input}
                           placeholderTextColor={"#2e2e2e"}
                           autoCapitalize="none"
                           value={emailAddress}
                           placeholder="Enter email or username"
                           onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
                />
                </View>

                <View style={{top: 50}}>
                <TextInput style={authStyles.input}
                           placeholderTextColor={"#2e2e2e"}
                           value={password}
                           placeholder="Enter password"
                           secureTextEntry={true}
                           onChangeText={(password) => setPassword(password)}
                />
                </View>

                <View style={{bottom: -150}}>
                    <TouchableOpacity style={authStyles.button} onPress={onSignInPress}>
                        <Text style={authStyles.buttontext}>login</Text>
                    </TouchableOpacity>
                </View>

                <View style={{top: -25}}>
                    <Text style={authStyles.annotatedtext}>
                        Don't have an account? Click <Text onPress={()=> router.replace('/sign-up')} style={{textDecorationLine: 'underline'}}>here</Text> to signup.
                    </Text>
                </View>

        </SafeAreaView>

    )
}