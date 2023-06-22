import { SafeAreaView, View } from "react-native";
import { Card } from "react-native-paper";
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
export default function LeavesScreen(){
    const [date_at,setDateAt]=useState(new Date());

    const changeDate=(event, selectedDate) => {
        const currentDate = selectedDate;
        // setShow(false);
        // setDate(currentDate);
        setDateAt(currentDate)
      };
    return(
        <SafeAreaView>
           <Card>
            <DateTimePicker
            value={date_at}
            mode="date"
            is24Hour={true}
            onChange={changeDate}
            />
           </Card>
        </SafeAreaView>
    )
}