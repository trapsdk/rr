import { Text, View} from 'react-native';
import React, {useState} from 'react';
import {mainStyles} from "@/constants/main-styles";
import {CalendarList} from 'react-native-calendars';
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";



export default function HomeScreen() {

    const getDates = useQuery(api.markeddates.getMarkedDates);

    const [selected, setSelected] = useState('');

    const markedDates = getDates?.reduce((acc, date) => {
        acc[date.date] = {
            selected: date.selected,
            marked: date.marked,
            dotColor: date.dotColor,
        };
        return acc;
    }, {} as { [key: string]: { selected?: boolean; marked?: boolean; dotColor?: string } }) ?? {};
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

            <View style={{flex:2, maxHeight: '75%', top: -25}}>

                <CalendarList
                markedDates={markedDates}
                pastScrollRange={12}
                futureScrollRange={12}
                showScrollIndicator={true}
                theme={{
                    calendarBackground: 'white',
                    backgroundColor: 'beige',
                    textSectionTitleColor: '#5d6f75',
                    monthTextColor: 'black',
                    textDayFontFamily: "Poppins-Regular",
                    textMonthFontFamily: "Poppins-Regular",
                    textDayHeaderFontFamily: "Poppins-Regular",
                    todayTextColor: 'white',
                    dayTextColor: 'black',
                    todayBackgroundColor: 'black',
                }}

            />
            </View>


        </View>

    );
}

