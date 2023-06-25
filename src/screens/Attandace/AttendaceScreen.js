import React, { useEffect, useState, useRef } from "react";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { StyleSheet, SafeAreaView, View, Button, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { FAB } from "react-native-paper";
import { Attendace } from "../../services/Api";
import { formatTimeDB, formatDateDB } from "../utils";
import { useAuth } from "../../contexts/AuthContexts";

const LOCATION_TASK_NAME = "LOCATION_TASK_NAME";
let foregroundSubscription = null;

// Define the background task for location tracking
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error(error);
    return;
  }
  if (data) {
    // Extract location coordinates from data
    const { locations } = data;
    const location = locations[0];
    if (location) {
      console.log("Location in background", location.coords);
    }
  }
});

const AttendaceScreen = () => {
  // const mapRef = useRef(null);
  const [position, setPosition] = useState(null);
  const [region, setRegion] = useState({
    latitude: -0.5023114,
    longitude: 117.1516973,
    latitudeDelta: 0.0022,
    longitudeDelta: 0.0021,
  });
  const { user } = useAuth();
  const submit = () => {
    if (position == null) {
      startTrack();
    } else {
      return Alert.alert(
        "Konfirmasi Absensi",
        "Apakah Anda akan melakukan Absensi",
        [
          // The "Yes" button
          {
            text: "Yes",
            onPress: () => {
              let date = new Date();
              let latitude = position?.latitude;
              let longitude = position?.longitude;
              let date_at = formatDateDB(date);
              let time_attendance = formatTimeDB(date);
             

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
                });
            },
          },
          {
            text: "No",
          },
        ]
      );
    }
  };
  const startTrack = async () => {
    // Check if foreground permission is granted
    const { granted } = await Location.getForegroundPermissionsAsync();
    if (!granted) {
      console.log("location tracking denied");
      return;
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

        // foregroundSubscription?.remove();
      }
    );
  };

  // useEffect(() => {
  //   const requestPermissions = async () => {
  //     const foreground = await Location.requestForegroundPermissionsAsync();
  //     if (foreground.granted)
  //       await Location.requestForegroundPermissionsAsync();
  //   };
  //   requestPermissions();
  // }, []);

  // useEffect(() => {
  //   startTrack();
  // }, [position]);
  // console.log("location",position)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <MapView
          // ref={mapRef}
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
      </View>
      <View style={styles.mylocation}>
        <FAB
          icon="plus"
          style={styles.fab}
          color={"white"}
          onPress={startTrack}
        />
      </View>
      <View>
        <Button onPress={submit} title="Absen" />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
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
});
export default AttendaceScreen;
