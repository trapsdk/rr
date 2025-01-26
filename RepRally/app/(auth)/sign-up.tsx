import * as React from 'react'
import {
    Text,
    TextInput,
    Button,
    View,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    Alert,
    SafeAreaView
} from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import {customStyles} from "@/constants/custom-styles";
import {authStyles} from "@/constants/auth-styles";
import {ClerkAPIError} from "@clerk/types";
import {mainStyles} from "@/constants/main-styles";


export default function Page() {
    const { isLoaded, signUp, setActive } = useSignUp()
    const router = useRouter()

    const [username, setUsername] = React.useState('')
    const [emailAddress, setEmailAddress] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [pendingVerification, setPendingVerification] = React.useState(false)
    const [code, setCode] = React.useState('')

    // Handle submission of sign-up form
    const onSignUpPress = async () => {
        if (!isLoaded) return

        // Start sign-up process using email and password provided
        try {
            await signUp.create({
                username,
                emailAddress,
                password,
            })

            // Send user an email with verification code
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

            // Set 'pendingVerification' to true to display second form
            // and capture OTP code
            setPendingVerification(true)
        } catch (err: any) {

            function isClerkAPIError(error: any): error is ClerkAPIError {
                // @ts-ignore
                return (
                    error &&
                    Array.isArray(error.errors) &&
                    error.errors.every(err => typeof err.message === 'string')
                );
            }
            console.error('Clerk Error:', err)
            if (isClerkAPIError(err)) {
                const errorMessage = err.errors[0].message;
                Alert.alert('Sign-Up Error', errorMessage);
            } else {
                Alert.alert('Error', 'An unexpected error occurred.');
            }
        }
    }

    // Handle submission of verification form
    const onVerifyPress = async () => {
        if (!isLoaded) return

        try {
            // Use the code the user provided to attempt verification
            const signUpAttempt = await signUp.attemptEmailAddressVerification({
                code,
            })

            // If verification was completed, set the session to active
            // and redirect the user
            if (signUpAttempt.status === 'complete') {
                await setActive({ session: signUpAttempt.createdSessionId })
                router.replace('/home')
            } else {
                // If the status is not complete, check why. User may need to
                // complete further steps.
                console.error(JSON.stringify(signUpAttempt, null, 2))
            }
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
        }
    }

    const styles = StyleSheet.create({
        textInput:{
            borderColor: "red",

        },
    });

    if (pendingVerification) {
        return (
            <SafeAreaView style={mainStyles.bg}>
            <View style={customStyles.bg}>

                <View style={{top : -165}} >
                    <Text style={authStyles.titletext}>Verify Email</Text>
                </View>

                <TextInput style={authStyles.input}
                    value={code}
                    placeholder="Enter your verification code"
                    placeholderTextColor="#2e2e2e"
                    onChangeText={(code) => setCode(code)}
                />

                <View style={{bottom: -150}}>
                    <TouchableOpacity style={authStyles.button} onPress={onVerifyPress}>
                        <Text style={authStyles.buttontext}>Verify</Text>
                    </TouchableOpacity>
                </View>

                <View style={{top: -25}}>
                    <Text style={authStyles.annotatedtext}>
                        Click <Text onPress={()=> router.replace('/')} style={{textDecorationLine: 'underline'}}>here</Text> to go back.
                    </Text>
                </View>

            </View>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView style={mainStyles.bg}>

            <View style={{top : -125}} >
                <Text style={authStyles.titletext}>Sign Up</Text>
            </View>

            <View style={{top : 0}}>
                <TextInput style={authStyles.input}
                           placeholderTextColor={"#2e2e2e"}
                           autoCapitalize="none"
                           value={username}
                           placeholder="Enter username"
                           onChangeText={(username) => setUsername(username)}
                />
            </View>

            <View style={{top : 25}}>
                <TextInput style={authStyles.input}
                           placeholderTextColor={"#2e2e2e"}
                           autoCapitalize="none"
                           value={emailAddress}
                           placeholder="Enter email"
                           onChangeText={(email) => setEmailAddress(email)}
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
                    <TouchableOpacity style={authStyles.button} onPress={onSignUpPress}>
                        <Text style={authStyles.buttontext}>sign up</Text>
                    </TouchableOpacity>
            </View>

                    <View style={{top: -25}}>
                        <Text style={authStyles.annotatedtext}>
                            Have an account? Click <Text onPress={()=> router.replace('/sign-in')} style={{textDecorationLine: 'underline'}}>here</Text> to sign in.
                        </Text>
                    </View>
        </SafeAreaView>

    )
}