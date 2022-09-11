import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import More from './More';
import Detail from './Detail';
import ListMore from './ListMore';
const Stack = createNativeStackNavigator();


const MoreStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="More" component={More} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="ListMore" component={ListMore} />

    </Stack.Navigator>
  )
}

export default MoreStack
