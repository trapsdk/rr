import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import React from 'react';
import {mainStyles} from "@/constants/main-styles";
import {ClerkLoaded} from "@clerk/clerk-expo";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {backgroundColor} from "react-native-calendars/src/style";

export default function HomeScreen() {

    return (

        <View style={mainStyles.bg}>

            <View style={{top: 100}}>
                <Text style={{
                    color: '#c4e5ef',
                    fontFamily: "Poppins-Regular",
                    left: -100,
                    fontSize: 30,
                }}>Calendar</Text>
            </View>

        <View style={{top: 100}}>

            <CalendarList
                pastScrollRange={24}
                futureScrollRange={24}
                // scrollEnabled={false}
                showScrollIndicator={true}
                style={{
                    backgroundColor: '#2e2e2e',
                    width: '100%',
                    height: '100%',

                }}
                theme={{
                    calendarBackground: '#2e2e2e',
                    backgroundColor: '#2e2e2e',
                    textSectionTitleColor: 'white',
                    monthTextColor: 'white',
                    textDayFontFamily: "Poppins-Regular",
                    textMonthFontFamily: "Poppins-Regular",
                    textDayHeaderFontFamily: "Poppins-Regular",
                    todayTextColor: '#3f3f3f',
                    dayTextColor: '#5d6f75',
                    todayBackgroundColor: '#b3ddea'
                }}


                // Enable horizontal scrolling, default = false
                // horizontal={true}
                // Enable paging on horizontal, default = false
                // pagingEnabled={true}

            />
        </View>

        </View>

    );
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});
