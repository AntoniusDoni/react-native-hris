import { SafeAreaView, TouchableOpacity, Text, View, Alert } from "react-native";
import { Card, TextInput } from "react-native-paper";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment/moment";
// import InputDateTimePicker from "../components/InputDateTimePicker";
import Button from "../components/Button";
import { AddLeaves } from "../../services/Api";
import { useAuth } from "../../contexts/AuthContexts";
export default function LeavesScreen() {
  const [date_at, setDateAt] = useState(new Date());
  const [date_out, setDateOut] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);
  const { user } = useAuth();
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const showDatePicker2 = () => {
    setDatePickerVisibility2(true);
  };
  const changeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDateAt(selectedDate);
    setDatePickerVisibility(false);
  };
  const changeDateout = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDateOut(selectedDate);
    setDatePickerVisibility2(false);
  };
  const submitLeaves=()=>{
    return Alert.alert(
      "Konfirmasi Pengajuan",
      "Apakah Anda akan melakukan Pengajuan Cuti?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
              AddLeaves({
                date_at,
                date_out,
                user,
              }).then((res) => {
                console.log(res);
                return Alert.alert("Berhasil !",res.message)
  
              }).catch(errors => {
                //   setError(errors)
                  console.log("err",errors);
                  return Alert.alert("Gagal !","Periksa Kembali Koneksi jaringan anda")
                });
          },
        },
        {
          text: "No",
        },
      ]
    );
  }
  const addLeaves=()=>{
    
  }
  return (
    <SafeAreaView>
      <Card style={{ margin: 20 }}>
        <Card.Title title="Form Pengajuan Cuti" />
        <Card.Content>
          <View>
            <Text>{"Tanggal Mulai"}</Text>
            <TouchableOpacity onPress={showDatePicker}>
              <TextInput
                numberOfLines={1}
                editable={false}
                placeholder={"Tanggl Mulai"}
                value={moment(date_at).format("DD MMMM, YYYY")}
                style={{
                  marginTop: 10,
                }}
                mode="outlined"
                right={
                  <TextInput.Icon icon={"calendar"} onPress={showDatePicker} />
                }
              />
              {isDatePickerVisible && (
                <DateTimePicker
                  value={date_at}
                  mode={"date"}
                  is24Hour={true}
                  onChange={changeDate}
                />
              )}
            </TouchableOpacity>
          </View>
          <View>
            <Text>{"Tanggal Selesai"}</Text>
            <TouchableOpacity onPress={showDatePicker2}>
              <TextInput
                numberOfLines={1}
                editable={false}
                placeholder={"Tanggal Selesai"}
                value={moment(date_out).format("DD MMMM, YYYY")}
                style={{
                  marginTop: 10,
                }}
                mode="outlined"
                right={
                  <TextInput.Icon icon={"calendar"} onPress={showDatePicker} />
                }
              />
              {isDatePickerVisible2 && (
                <DateTimePicker
                  value={date_out}
                  mode={"date"}
                  is24Hour={true}
                  onChange={changeDateout}
                />
              )}
            </TouchableOpacity>
          </View>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={submitLeaves}>Ajukan</Button>
        </Card.Actions>
      </Card>
    </SafeAreaView>
  );
}
