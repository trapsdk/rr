import * as React from 'react'
import {Text, TextInput, Button, View, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import {customStyles} from "@/constants/custom-styles";
import {authStyles} from "@/constants/auth-styles";


export default function Page() {
    const { isLoaded, signUp, setActive } = useSignUp()
    const router = useRouter()

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
                emailAddress,
                password,
            })

            // Send user an email with verification code
            await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

            // Set 'pendingVerification' to true to display second form
            // and capture OTP code
            setPendingVerification(true)
        } catch (err) {
            // See https://clerk.com/docs/custom-flows/error-handling
            // for more info on error handling
            console.error(JSON.stringify(err, null, 2))
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
            <View style={customStyles.bg}>
                <Text>Verify your email</Text>
                <TextInput
                    value={code}
                    placeholder="Enter your verification code"
                    placeholderTextColor="#666666"
                    onChangeText={(code) => setCode(code)}
                />
                <Button title="Verify" onPress={onVerifyPress} />
            </View>
        )
    }

    return (
        <ImageBackground source={require('../img/bg.png')} style={customStyles.bg}>
        <View>
            <>
                <TextInput style={authStyles.input}
                    autoCapitalize="none"
                    value={emailAddress}
                    placeholder="Enter email"
                    placeholderTextColor="#666666"
                    onChangeText={(email) => setEmailAddress(email)}
                />
                <TextInput style={authStyles.input}
                    value={password}
                    placeholder="Enter password"
                    placeholderTextColor="#666666"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
                <TouchableOpacity style={authStyles.button} onPress={onSignUpPress}>
                    <Text style={authStyles.buttontext}>sign up</Text>
                </TouchableOpacity>

                 <Text style={authStyles.annotatedtext}>
                        Have an account? Click <Text onPress={()=> router.replace('/sign-in')} style={{textDecorationLine: 'underline'}}>here</Text> to sign in.
                    </Text>

            </>
        </View>
        </ImageBackground>

    )
}