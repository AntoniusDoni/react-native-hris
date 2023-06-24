import React,{useState,useEffect} from "react";
import MapView from "react-native-maps";
import * as TaskManager from "expo-task-manager"
import * as Location from "expo-location"

import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import Button from "../components/Button";

const LOCATION_TASK_NAME = "LOCATION_TASK_NAME"
let foregroundSubscription = null

// Define the background task for location tracking
TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.error(error)
    return
  }
  if (data) {
    // Extract location coordinates from data
    const { locations } = data
    const location = locations[0]
    if (location) {
      console.log("Location in background", location.coords)
    }
  }
});

export default function Attandace() {
  return (
    
      <View style={styles.container}>
        <MapView 
        
        style={styles.map} />
      </View>
     
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
