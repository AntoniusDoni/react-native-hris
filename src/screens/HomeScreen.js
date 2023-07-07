import React, { useState, useEffect } from "react";
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import { Avatar, Title, Caption, Text, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuth } from "../contexts/AuthContexts";
import { GetSchedule } from "../services/Api";
import { formatDateDB } from "./utils";

export default function HomeScreen({navigation}) {
  const { user } = useAuth();
  const [schedule, setSchedule] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  let date = new Date();
  let curdate = formatDateDB(date);
  const fetchSchedule = (params, refresh = false) => {
    GetSchedule(user.accessToken, {
      ...params,
      date_at: curdate,
      employee_id: user?.id,
    })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          Alert.alert("Info ", res.data.message);
        }
        setSchedule({
          message: res.data.message,
          detailSchedule: res.data.schedule,
        });
      })
      .catch((err) => {
        // console.log(err)
      });
  };
  const onRefresh = () => {
    setRefreshing(true);
    fetch();
    fetchSchedule();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  useEffect(() => {
    fetchSchedule();
  }, []);
  // console.log(user.role)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.userInfoSection}>
          <View style={{ flexDirection: "row", marginLeft: 5, marginTop: 25 }}>
            {user?.profile_image != null ? (
              <Avatar.Image
                source={{
                  uri: "https://api.adorable.io/avatars/80/abott@adorable.png",
                }}
                size={180}
              />
            ) : (
              <Icon name="account-circle" color="#E53F71" size={180} />
            )}

            <View style={{ flexDirection: "column" }}>
              <View
                style={[
                  styles.row,
                  { flex: 2, marginLeft: 10, marginBottom: 15 },
                ]}
              >
                <Title style={[styles.title]}>{user?.name}</Title>
              </View>
              <View style={[styles.row, { flex: 2, marginLeft: 10 }]}>
                <Icon name="account-key" color="#555" size={20} />
                <Text style={{ color: "#555", marginLeft: 20 }}>
                  {user?.nip}
                </Text>
              </View>
              <View style={[styles.row, { flex: 3, marginLeft: 10 }]}>
                <Icon name="phone" color="#555" size={20} />
                <Text style={{ color: "#555", marginLeft: 20 }}>
                  {user?.phone == null && "-"}
                </Text>
              </View>
              <View style={[styles.row, { flex: 4, marginLeft: 10 }]}>
                <Icon name="email" color="#777777" size={20} />
                <Text style={{ color: "#777777", marginLeft: 20 }}>
                  {user?.email}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.infoBoxWrapper}>
          <View
            style={[
              styles.infoBox,
              {
                borderRightColor: "#dddddd",
                borderRightWidth: 1,
              },
            ]}
          >
            <Title>Divisi</Title>
            <Caption
              style={{ fontSize: 14, color: "#333", fontWeight: "bold" }}
            >
              {user?.divisi}
            </Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>Jabatan</Title>
            <Caption
              style={{ fontSize: 14, color: "#333", fontWeight: "bold" }}
            >
              {user?.position}
            </Caption>
          </View>
        </View>
        <View style={styles.infoBoxWrapper}>
          <View
            style={[
              styles.infoBox,
              {
                borderRightColor: "#dddddd",
                borderRightWidth: 1,
              },
            ]}
          >
            <Title>Jam Masuk</Title>
            <Caption
              style={{ fontSize: 14, color: "#333", fontWeight: "bold" }}
            >
              {schedule?.detailSchedule?.start_in}
            </Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>Jam Pulang</Title>
            <Caption
              style={{ fontSize: 14, color: "#333", fontWeight: "bold" }}
            >
              {schedule?.detailSchedule?.end_out}
            </Caption>
          </View>
        </View>
        <View style={styles.menuItem}>
            <Button  icon="account" mode="elevated" 
            labelStyle={{ color: "#333"}}
            contentStyle={styles.menuButton} onPress={() => navigation.navigate('Cuti Screen')}>
              Riwayat Absensi
            </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "whitesmoke",
  },
  userInfoSection: {
    // paddingHorizontal: 5,
    marginBottom: 10,
    // marginLeft: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    // marginBottom: 12,
    marginLeft: "35%",
    fontSize: 14,
  },
  infoBoxWrapper: {
    borderBottomColor: "#dddddd",
    borderBottomWidth: 1,
    borderTopColor: "#dddddd",
    borderTopWidth: 1,
    flexDirection: "row",
    height: 100,
  },
  infoBox: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
    justifyContent:"space-between",
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
  menuButton:{
    marginVertical: 10,
    marginRight:5,
    justifyContent: 'center',
    alignItems: 'center',
   

  },
});
