import { View, SafeAreaView, StyleSheet } from "react-native";
import {
  Avatar,
  Title,
  Caption,
  Text,
  TouchableRipple,
} from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useAuth } from "../../contexts/AuthContexts";

export default function ProfilerScreen() {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userInfoSection}>
        <View style={{ flexDirection: "row",marginLeft:5,marginTop:25}}>
          {user?.profile_image!=null?(<Avatar.Image
            source={{
              uri: "https://api.adorable.io/avatars/80/abott@adorable.png",
            }}
            size={180}
          />):( <Icon name="account-circle" color="#E53F71" size={180} />)
        }
          
          <View style={{ flexDirection: "column" }}>
            <View style={[styles.row, { flex: 2, marginLeft: 10,marginBottom:15 }]}>
              {/* <Icon name="account" color="#555" size={20} /> */}
              <Title
                style={[
                  styles.title,
                ]}
              >
                {user.name}
              </Title>
            </View>
            <View style={[styles.row, { flex: 2, marginLeft: 10 }]}>
              <Icon name="account-key" color="#555" size={20} />
              <Text style={{ color: "#555", marginLeft: 20 }}>{user.nip}</Text>
            </View>
            <View style={[styles.row, { flex: 3, marginLeft: 10 }]}>
              <Icon name="phone" color="#555" size={20} />
              <Text style={{ color: "#555", marginLeft: 20 }}>
                {user.phone == null && "-"}
              </Text>
            </View>
            <View style={[styles.row, { flex: 4, marginLeft: 10 }]}>
              <Icon name="email" color="#777777" size={20} />
              <Text style={{ color: "#777777", marginLeft: 20 }}>
                {user.email}
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
          <Caption style={{ fontSize: 14, color: "#333", fontWeight: "bold" }}>
            {user.divisi}
          </Caption>
        </View>
        <View style={styles.infoBox}>
          <Title>Jabatan</Title>
          <Caption style={{ fontSize: 14, color: "#333", fontWeight: "bold" }}>
            {user.position}
          </Caption>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <TouchableRipple
          onPress={logout}
        >
          <View style={styles.menuItem}>
            <Icon name="logout" color="#FF6347" size={25} />
            <Text style={styles.menuItemText}>Keluar</Text>
          </View>
        </TouchableRipple>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
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
  },
  menuItemText: {
    color: "#777777",
    marginLeft: 20,
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 26,
  },
});
