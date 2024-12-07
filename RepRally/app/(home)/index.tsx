import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View } from 'react-native'

export default function Page() {
    const { user } = useUser()

    return (
        <View>
            // IF USER IS SIGNED IN WITH CLERK API
            <SignedIn>
                <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
            </SignedIn>

            // IF USER IS SIGNED OUT WITH CLERK API
            <SignedOut>
                <Link href={"/(auth)/sign-in"}>
                    <Text>Sign in</Text>
                </Link>
                <Link href={"/(auth)/sign-up"}>
                    <Text>Sign up</Text>
                </Link>
            </SignedOut>
        </View>
    )
}