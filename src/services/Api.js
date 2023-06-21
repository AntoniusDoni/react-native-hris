import axios from "axios";

export function login(payload) {
  const { email, password } = payload
  return axios({
    method: 'POST',
    url: '/authentications',
    data: { email, password }
  })
    .then(response => response.data)
    .catch(err => {throw err.response.data})
}

export function Sigin(payload){
    const { email, password } = payload
 
    var data = JSON.stringify({
        "email": email.value,
        "password": password.value
      });
      
      var config = {
        method: 'post',
        url: 'http://192.168.55.238:8000/api/login',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      return axios(config)
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {
        console.log(error);
      });
}