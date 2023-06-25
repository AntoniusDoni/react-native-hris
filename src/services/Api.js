import axios from "axios";
import {Alert} from "react-native";

export function Sigin(payload){
    const { email, password } = payload
 
    var data = JSON.stringify({
        "email": email.value,
        "password": password.value
      });
      
      return axios({method:'post',url:'/login',data:data})
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {
        console.log("Axios Err Res",error);
        if (error.response.status === 401) {
          return Alert.alert("Password User Salah")
         }
       
      });
}
export function Attendace(payload){

  var data = JSON.stringify({
    "date_at": payload.date_at,
    "employee_id": payload?.user?.id,
    "lat":payload.latitude,
    "long":payload.longitude,
    "time_attendance":payload.time_attendance
  });
  
  return axios({method:'post',url:'/v1/attendace',data:data, 
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + payload.user.accessToken
}})
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {
        console.log(error);
      });
}