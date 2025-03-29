import {Button, Modal, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {mainStyles} from "@/constants/main-styles";
import {CalendarList} from 'react-native-calendars';
import {useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider, BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import Day from "react-native-calendars/src/calendar/day";

export default function HomeScreen() {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const getDates = useQuery(api.markeddates.getMarkedDates);
    const [workoutTitle, setWorkoutTitle] = useState("");
    const [selectedDate, setSelectedDate] = useState("");

    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();

    }, []);
    // Function to dismiss the modal
    const handleDismiss = useCallback(() => {
        bottomSheetModalRef.current?.dismiss();
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
            console.log('handleSheetChanges', index);
    }, []);


    const markedDates = getDates?.reduce((acc, date) => {
        acc[date.date] = {
            date: date.date,
            marked: date.marked,
            dotColor: date.dotColor,
            title: date.title,
        };
        console.log(acc);
        return acc;
    }, {} as { [key: string]: { date?: string, marked?: boolean; dotColor?: string, title?: string } }) ?? {};


    const handleDatePress = (selectedDate: string) => {
        const matchedWorkout = Object.values(markedDates).find(entry => entry.date === selectedDate);
        console.log(selectedDate);
        if ( matchedWorkout) {
            console.log("day exists in marked dates")
            setWorkoutTitle(matchedWorkout.title ?? "null");
            setSelectedDate(matchedWorkout.date ?? "null");
            handlePresentModalPress();
        }
        else {
            handleSheetChanges(0);
            console.log("day does not exist in marked dates")
        }
    }
    return (
        <GestureHandlerRootView style={mainStyles.bg}>
            <BottomSheetModalProvider>
        {/*<View style={mainStyles.bg}>*/}
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
                    onDayPress={ day => handleDatePress(day.dateString)}
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
                    todayTextColor: '#333333',
                    dayTextColor: '#333333',
                    todayBackgroundColor: '#f5f5f5',
                }}
            />
            </View>
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        snapPoints={['25%', '50%']}
                        index={1}
                        backdropComponent={(props) => (
                            <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={1} pressBehavior="close" />
                        )}
                    >
                        <BottomSheetView style={styles.contentContainer}>
                            <Text style={{top: 10,fontSize: 20}}> {selectedDate} </Text>
                            <Text style={{top: 30, color: 'gray'}}>Workout Completed:</Text>
                            <Text style={{fontSize: 24, top: 50}}>{workoutTitle}</Text>
                        </BottomSheetView>
                    </BottomSheetModal>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({

    contentContainer: {
        flex: 3,
        height: 125,
        alignItems: 'center',
    },
});

