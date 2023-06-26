import React, { useState, useMemo, useContext, useEffect } from 'react'
import is from 'is_js'
import axios from 'axios'
// import Constants from 'expo-constants'
import AsyncStorage from '@react-native-async-storage/async-storage'

// why im create this , maybe it cause
// im think this singlethon call for 401 token timeout so it only call from one instance
const axioInstance = axios.create()
axios.defaults.baseURL = "http://192.168.1.7:8000/api"
axios.defaults.headers={
  'Content-Type': 'application/json'
}

const refreshAccessToken = (refreshToken) => {
  return axios({
    method: 'GET',
    url: '/v1/refresh-token',
    data: { refreshToken },
  }).then((res) => {
    // console.log("refres token",res);
  return res.data}).catch(function(error){
    console.log("refres token ERR",error);
  })
}

const logoutApi = (refreshToken) => {
  return axios({
    method: 'GET',
    url: '/v1/logout',
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + refreshToken,
    },
  }).then((res) => res.data).catch(function(error){
    console.log("refres token ERR",error);
  });
}

const userManager = {
  async set(val = {}) {
    await AsyncStorage.setItem('HRIS_USER', val)
  },
  async get() {
    try {
      const user = await AsyncStorage.getItem('HRIS_USER')
      return JSON.parse(user)
    } catch (error) {
      return error
    }
  },
  async remove() {
    await AsyncStorage.removeItem('HRIS_USER')
  },
}

const AuthContexts = React.createContext()

function AppProvider(props) {
  const [user, setUser] = useState(null)
  const value = useMemo(
    () => ({
      user,
      setUser,
     
    }),
    [user, setUser]
  )

  const getUser = async () => {
    const savedUser = await userManager.get()
    setUser(savedUser)
  }

  const axiosIntercept = async () => {
      await axios.interceptors.response.use(
        (res) => res,
        async (error) => {
         
          const {
            status,
            data: { message },
          } = error.response
          // console.log("contex",status === 401 && message === 'Token cannot be refreshed, please Login again');
          if (status === 401 && message === 'Token cannot be refreshed, please Login again') {
           
            userManager.remove()
            setUser(null)
          }

          if (status === 401 && message === 'Token is Expired') {
            const originalRequest = error.config
            originalRequest._retry = true
            const user = await userManager.get()

            const { refreshToken } = user
            const res = await refreshAccessToken(refreshToken)
          
            const newUser = { ...user, accessToken: res.data.accessToken }
            setUser(newUser)
            userManager.set(JSON.stringify(newUser))
            axios.defaults.headers.common[
              'Authorization'
            ] = `Bearer ${res.data.accessToken}`
            return axioInstance(originalRequest)
          }

          throw error
        }
      )
      await getUser()
  }

  useEffect(() => {
    axiosIntercept()
  }, [])

  return (
    <AuthContexts.Provider value={value} {...props} />
  )
}




function useAuth() {
  const appContext = useContext(AuthContexts)
  if (!appContext) {
    throw Error('useAuth must be used within AppProvider')
  }
  const { user, setUser } = appContext

  const isLoggedIn = () => {
    return is.not.empty(user) && is.not.null(user)
  }

  const persistUser = (user) => {
    userManager.set(JSON.stringify(user))
    setUser(user)
  }

  const logout = () => {
    logoutApi(user.refreshToken)
    userManager.remove()
    setUser(null)
    
  }

  return {
    user,
    isLoggedIn,
    persistUser,
    logout,
  }
}

export { AppProvider, useAuth }