import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Cart = () => {
  return (
    <View>
      <Text style={styles.text}>Giỏ hàng</Text>

    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
    text: {
        fontSize: 30
    }
})