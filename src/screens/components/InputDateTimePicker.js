import moment from "moment";
import React,{useState} from "react";
import { TouchableOpacity, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

const InputDateTimePicker = ({TextLabel,date,isvisble,onChangeDate,showDatePicker}) => {
    
  return (
    <View>
      <Text>{TextLabel}</Text>
      <TouchableOpacity onPress={showDatePicker}>
        <TextInput
          numberOfLines={1}
          editable={false}
          placeholder={TextLabel}
          value={moment(date).format("DD MMMM, YYYY")}
          style={{
            marginTop: 10,
          }}
          mode="outlined"
          right={<TextInput.Icon icon={"calendar"} onPress={showDatePicker}/>}
        />
         {isvisble && (
                <DateTimePicker
                  value={date}
                  mode={"date"}
                  is24Hour={true}
                  onChange={onChangeDate}
                />
              )}
      </TouchableOpacity>
    </View>
  );
};

export default InputDateTimePicker;
