import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const HomeStack = () => {
  return (
    <View>
      <Text style={styles.text}>Trang chủ</Text>
    </View>
  )
}

export default HomeStack

const styles = StyleSheet.create({
    text: {
        fontSize: 30
    }
})