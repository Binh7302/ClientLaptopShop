import { StyleSheet, Text, View, TextInput, Image, Pressable, ToastAndroid } from 'react-native'
import React, { useContext, useState} from 'react'
import {UserContext} from '../UserContext';

const Login = (props) => {
  const { navigation } = props;
  const { onLogin } = useContext(UserContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    if (!username || !password || username.trim().length == 0 || password.trim().length ==0){
      ToastAndroid.show('Vui lòng nhập đầy đủ thông tin', ToastAndroid.CENTER);
      return;
    }

    const res = onLogin(username, password);
    if (res == false){
      ToastAndroid.show('Đăng nhập không thành công', ToastAndroid.CENTER);
      return;
    }


  }

  return (
    <View style={styles.container}>

<Image style={styles.background} source={require('../../../assets/images/bgr.jpg')} />

      <View style={styles.containerChi}>
      <Text style={styles.textHeader}>Login</Text>
      <TextInput value={username} onChangeText={setUsername} placeholder='Username' style={styles.textInput}/>
      <TextInput value={password} onChangeText={setPassword} placeholder='Password' style={styles.textInput} secureTextEntry/>
      <Pressable style={styles.button} onPress={login}>
        <Text style={styles.buttonLabel}>Login</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonLabel}>Register</Text>
      </Pressable>
      </View>
      

      
    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  background:{
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

  textHeader: {
    fontSize: 50,
    fontWeight: '700',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 40,
    color: 'white',
  },
  buttonLabel: {
    color: 'white',
    fontSize: 19,
    fontWeight: '700',
    textAlign: 'center',
    
  },

  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#355',
    borderRadius: 8,
    marginVertical: 8,
    justifyContent: 'center',
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    width: '100%',
    height: 40,
    borderRadius: 8,
    marginVertical: 8,
    paddingLeft: 16,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  containerChi: {
    flex: 1,
    padding: 32,
  },
  container: {
    width: '100%',
    height: '100%',
  }
})