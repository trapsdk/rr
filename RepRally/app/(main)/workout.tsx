import * as React from
        'react'
import {
    Text,
    TextInput,
    Button,
    View,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    Modal
} from 'react-native'
import {ClerkLoaded, useAuth, useSignUp} from '@clerk/clerk-expo'
import {Link, router, useRouter} from 'expo-router'
import {mainStyles} from "@/constants/main-styles";
import {Authenticated, useConvex, useConvexAuth, useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import {useContext} from "react";
import {authStyles} from "@/constants/auth-styles";

export default function Workout() {

    const {isLoading} = useConvexAuth();
    const workouts = useQuery(api.workouts.list);
    const [workoutId, setWorkoutId] = React.useState("");
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [workoutName, setWorkoutName] = React.useState("");

    const addWorkout = (): void => {
        router.navigate("/(screens)/new-workout")
    };


    return(
        <Authenticated>
        <ClerkLoaded>
        <View style={mainStyles.bg}>

            <View style={{top: 85}}>
                <Text style={{
                    color: 'black',
                    fontFamily: "Poppins-Regular",
                    left: -100,
                    fontSize: 30,
                }}>Workouts</Text>
            </View>

            <View style={{
                top: -115,
                left: 100,
                flex: 1,

            }}>
                    <TouchableOpacity style={mainStyles.addWorkoutButton} onPress={()=>setModalVisible(true)}>
                        <Text style={mainStyles.addWorkoutButtonText}>+</Text>
                    </TouchableOpacity>

                    {workouts?.map(({ _id, name }) => <Text key={_id}>{name}</Text>)}
            </View>

            <Modal
                visible={isModalVisible}
                animationType={"slide"}
                presentationStyle={"pageSheet"}
            >
                <View style={mainStyles.bg}>

                    <View style={{
                        top: -100,
                    }}>
                        <TextInput style={authStyles.input}
                                   placeholderTextColor={"#2e2e2e"}
                                   autoCapitalize="characters"
                                   value={workoutName}
                                   placeholder="Enter Workout Title"
                                   onChangeText={(workoutName) => setWorkoutName(workoutName)}
                        />

                    </View>




                    <TouchableOpacity style={mainStyles.addWorkoutButton} onPress={()=>setModalVisible(false)}>
                        <Text style={mainStyles.addWorkoutButtonText}>Save Workout</Text>
                    </TouchableOpacity>



                </View>

        </Modal>





            <View style={{ flex: 3,
                // backgroundColor: 'teal',
                width: '90%',
            }}>
                {!workouts ? <ActivityIndicator/> : null}
                <FlatList
                    data={workouts}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (

                        <TouchableOpacity>
                            <View style={mainStyles.listItem}>
                                <Text style={{
                                    color: '#c4e5ef',
                                    fontSize: 25,
                                }}
                                >{item.name}</Text>
                            </View>
                        </TouchableOpacity>

                    )}
                    contentContainerStyle={mainStyles.flatListContent}
                />
            </View>

        </View>
        </ClerkLoaded>
        </Authenticated>

    )
}