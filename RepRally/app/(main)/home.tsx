import {ActivityIndicator, Alert, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {mainStyles} from "@/constants/main-styles";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';




export default function HomeScreen() {

    const [markedDates, setMarkedDates] = useState({});
    const [selected, setSelected] = useState('');

    return (



        <View style={mainStyles.bg}>

            <View style={{flex: 1, maxHeight: '20%', top: 85}}>
                <Text style={{
                    color: 'black',
                    fontFamily: "Poppins-Regular",
                    left: -100,
                    fontSize: 30,
                }}>Calendar</Text>
            </View>

        <View style={{flex:2, maxHeight: '75%'}}>

            <CalendarList
                onDayPress={day => {
                    setSelected(day.dateString);
                }}
                markedDates={{
                    [selected]: {selected: false, marked: true, disableTouchEvent: true, dotColor: "black"}
                }}
                // markedDates={{markedDates}}
                markingType={"dot"}
                pastScrollRange={12}
                futureScrollRange={12}
                // scrollEnabled={false}
                showScrollIndicator={true}
                style={{
                    // backgroundColor: 'black',
                    // width: '100%',
                    // height: '',

                }}
                theme={{
                    calendarBackground: 'white',
                    backgroundColor: 'beige',
                    textSectionTitleColor: '#5d6f75',
                    monthTextColor: 'black',
                    textDayFontFamily: "Poppins-Regular",
                    textMonthFontFamily: "Poppins-Regular",
                    textDayHeaderFontFamily: "Poppins-Regular",
                    todayTextColor: 'white',
                    dayTextColor: '#5d6f75',
                    todayBackgroundColor: 'black',
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
