import axios from "axios";
import { Alert } from "react-native";
import qs from 'query-string'
import { dateToStringLocal } from "../helpers/utils";

export function Sigin(payload) {
  const { email, password } = payload;

  var data = JSON.stringify({
    email: email.value,
    password: password.value,
  });

  return axios({ method: "post", url: "/login", data: data })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log("Axios Err Res", error);
      if (error.response.status === 401) {
        return Alert.alert("Password User Salah");
      }
    });
}
export function GetAtendace(accessToken,params) {
  return axios({
    method: "get",
    url: `v1/attendace?${qs.stringify(params)}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      // console.log("Api fecth",error);
      throw error;
    });
}
export function GetSchedule(accessToken,params) {
  return axios({
    method: "get",
    url: `v1/schedule?${qs.stringify(params)}`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
  })
    .then(function (response) {
      const resp={status:response.status,data:response.data}
      return resp;
    })
    .catch(function (error) {
      // console.log("Api fecth",error);
      throw error;
    });
}
export function Attendace(payload) {
  var data = JSON.stringify({
    date_at: payload.date_at,
    employee_id: payload?.user?.id,
    lat: payload.latitude,
    long: payload.longitude,
    time_attendance: payload.time_attendance,
  });

  return axios({
    method: "post",
    url: "/v1/attendace",
    data: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + payload.user.accessToken,
    },
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      // console.log(error);
      throw error;
    });
}
export function Attendaceout(payload) {
  var data = JSON.stringify({
    date_at: payload.date_at,
    employee_id: payload?.user?.id,
    lat: payload.latitude,
    long: payload.longitude,
    time_attendance: payload.time_attendance,
  });

  return axios({
    method: "post",
    url: "/v1/attendaceout",
    data: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + payload.user.accessToken,
    },
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      // console.log(error);
      throw error;
    });
}

export function AddLeaves(payload){
  var data = JSON.stringify({
    date_start: dateToStringLocal(payload.date_at),
    date_end: dateToStringLocal(payload.date_out),
    employee_id: payload?.user?.id,
    
  });
console.log(data);
  return axios({
    method: "post",
    url: "/v1/leaves",
    data: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + payload.user.accessToken,
    },
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      // console.log(error);
      throw error;
    });
}
