import axios from "axios";


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
        console.log(error);
      });
}