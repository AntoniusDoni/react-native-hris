import { Entypo } from '@expo/vector-icons';
import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { theme } from '../theme/theme'

export default function Logo() {
 
  return (
    // <Image source={require('../../../assets/logo.png')} style={styles.image} />
    <Entypo name='user' size={32} color={theme.colors.user_logo} ></Entypo>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 110,
    // marginBottom: 8,
  },
})