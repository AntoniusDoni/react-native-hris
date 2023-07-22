import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContexts";
import { GetHistoryAttendace } from "../../services/Api";
import { MonthToString } from "../utils";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  RefreshControl,
  FlatList,
  Text,
  View,
} from "react-native";
export default function ListAttendanceScreen({ navigation }) {
  const { user } = useAuth();
  const [history, setHistory] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  let date = new Date();
  let curmonth = MonthToString(date);
  const fetchHistoryAttendace = (params, refresh = false) => {
    GetHistoryAttendace(user.accessToken, {
      ...params,
      month: curmonth,
      employee_id: user?.id,
    })
      .then((res) => {
        // console.log(res);
        if (res.status === 201) {
          Alert.alert("Info ", res.data.message);
        }
        setHistory({
          message: res.data.message,
          detailHistory: res.data.attendance,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
 
  const myItemSeparator = () => {
    return (
      <View
        style={{ height: 1, backgroundColor: "grey", marginHorizontal: 10 }}
      />
    );
  };

  const myListEmpty = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={styles.item}>No data found</Text>
      </View>
    );
  };
  useEffect(() => {
    fetchHistoryAttendace();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={history?.detailHistory}
        scrollEnabled={true}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.item}>{item.date_at}</Text>
            <Text style={styles.itemdetail}>Jam Masuk : {item?.time_in}</Text>
            <Text style={styles.itemdetail}>Jam Pulang : {item?.time_out ==null ?" -- " : item?.time_out}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={myItemSeparator}
        ListEmptyComponent={myListEmpty}
        
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  item: {
    padding: 20,
    fontSize: 16,
    marginTop: 5,
    fontWeight:'bold'
  },
  itemdetail:{
    marginBottom:10,
    marginLeft:20,
  },
});
