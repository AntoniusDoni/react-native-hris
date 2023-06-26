import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { StyleSheet, SafeAreaView, View, Alert,ScrollView,RefreshControl } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Attendace, Attendaceout, GetAtendace, GetSchedule } from "../../services/Api";
import { formatTimeDB, formatDateDB } from "../utils";
import { useAuth } from "../../contexts/AuthContexts";
import Button from "../components/Button";
const LOCATION_TASK_NAME = "LOCATION_TASK_NAME";
let foregroundSubscription = null;

const AttendaceScreen = (navigation) => {
  const [position, setPosition] = useState(null);
  const [isAttendace, setAttendace] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [region, setRegion] = useState({
    latitude: -0.5023114,
    longitude: 117.1516973,
    latitudeDelta: 0.0022,
    longitudeDelta: 0.0021,
  });
  const [refreshing, setRefreshing] = React.useState(false);
  const { user } = useAuth();
  let date = new Date();
  let date_at = formatDateDB(date);
  let time_attendance = formatTimeDB(date);

  const fetch =  (params, refresh = false) => {
     GetAtendace(user.accessToken, {
      ...params,
      date_at: date_at,
      employee_id: user?.id,
    })
      .then((res) => {
       setAttendace({flag:res.flag,out:res.attendace.is_out});
      })
      .catch((err) => {
        // console.log(err)
      })
  }

  const fetchSchedule=  (params, refresh = false) => {
     GetSchedule(user.accessToken, {
      ...params,
      date_at: date_at,
      employee_id: user?.id,
    })
      .then((res) => {
        console.log(res)
        if(res.status===201){
          Alert.alert("Info ",res.data.message)
        }
        setSchedule({message:res.data.message,detailSchedule:res.data.schedule});
      })
      .catch((err) => {
        // console.log(err)
      })
  }

  const sendAttendaceIn=async()=>{
    let labelAttendace="Masuk";
   
    if(isAttendace.flag==="2"){
      labelAttendace="Pulang";
    }
    return Alert.alert(
      "Konfirmasi Absensi",
      "Apakah Anda akan melakukan Absensi "+labelAttendace,
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            let latitude = position?.latitude;
            let longitude = position?.longitude;
            if(isAttendace.flag==="2"){
              Attendaceout({
                latitude,
                longitude,
                date_at,
                time_attendance,
                user,
              })
              .then((res) => {
                console.log(res);
                return Alert.alert("Berhasil !",res.message)
  
              }).catch(errors => {
                //   setError(errors)
                  console.log("err",errors);
                  return Alert.alert("Gagal !","Periksa Kembali Koneksi jaringan anda")
                });
            }else{
              Attendace({
                latitude,
                longitude,
                date_at,
                time_attendance,
                user,
              })
              .then((res) => {
                console.log(res);
                return Alert.alert("Berhasil !",res.message)
  
              }).catch(errors => {
                //   setError(errors)
                  console.log("err",errors);
                  return Alert.alert("Gagal !","Periksa Kembali Koneksi jaringan anda")
                });
            }
           
          },
        },
        {
          text: "No",
        },
      ]
    );
  }
  const submit = () => {
    if (position == null) {
      startTrack();
    } else{
      sendAttendaceIn();
    }
    
  };
  const startTrack = async () => {
    // Check if foreground permission is granted
    const { granted } = await Location.getForegroundPermissionsAsync();
    if (!granted) {
      console.log("location tracking denied");
      // return;s
    }
    // Make sure that foreground location tracking is not running
    foregroundSubscription?.remove();
    // Start watching position in real-time
    foregroundSubscription = await Location.watchPositionAsync(
      {
        // For better logs, we set the accuracy to the most sensitive option
        accuracy: Location.Accuracy.Highest,
      },
      (location) => {
        var newPosition = location.coords;
        const newRegion = {
          latitude: newPosition?.latitude,
          longitude: newPosition?.longitude,
          latitudeDelta: 0.0022,
          longitudeDelta: 0.0021,
        };

        // mapRef.current.animateToRegion(setRegion(newRegion), 3 * 1000);
        setRegion(newRegion);
        setPosition(location.coords);
        sendAttendaceIn();
        
        // foregroundSubscription?.remove();
      }
    );
  };

  useEffect(() => {
    const requestPermissions = async () => {
      const foreground = await Location.requestForegroundPermissionsAsync()
      if (foreground.granted.status!='granted'){
        await Location.enableNetworkProviderAsync().then().catch(function (error){
          console.log(error)
          requestPermissions();
        })
       
      } 
    }
    requestPermissions()
  }, [])
const onRefresh=()=>{
  setRefreshing(true);
  fetch();
  fetchSchedule();
  setTimeout(() => {
    setRefreshing(false);
  }, 2000);
}
useEffect(()=>{
  fetch();
},[]);

useEffect(()=>{
  fetchSchedule();
},[])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
       contentContainerStyle={styles.scrollView}
       refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      
     
        <MapView
         
          region={region}
          initRegion={region}
          style={styles.map}
          radius={500}
        >
          {position != null && (
            <Marker
              coordinate={{
                latitude: position?.latitude,
                longitude: position?.longitude,
              }}
            />
          )}
        </MapView>
     
      <View style={styles.buttonSection}>
        {schedule?.detailSchedule!=null&&(
          <Button mode="contained" 
          onPress={()=>{isAttendace?.out===null?submit:""}} 
          disabled={isAttendace?.out===null?true:false}
          style={{alignItems:'center',justifyContent:'center',width:'50%'}}>
            Absen 
        {isAttendace?.flag==2?" Pulang":" Masuk"}
        </Button>
        )}
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex:1,
    width: "100%",
    height: "50%",
  },
  mylocation: {
    alignItems: "center",
    justifyContent: "center",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 30,
    margin: 16,
    backgroundColor: "#dc143c",
  },
  buttonSection:{
      bottom: 5,
      width: '100%',
      height: '10%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
      position: "absolute",
      // flex:1
  },
  
});
export default AttendaceScreen;