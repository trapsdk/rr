import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function AuthRoutesLayout() {

    // setting const "isSignedIn" to see if user is signed in w/ clerk useAuth()
    const { isSignedIn } = useAuth()

    // if user is already signed in, redirect to home
    if (isSignedIn) {
        return <Redirect href={'/home'} />
    }

    // returning (auth) stack with no header shown.
    return (
        <Stack screenOptions={{
            headerShown: false
        }} >
        </Stack>
    )
}