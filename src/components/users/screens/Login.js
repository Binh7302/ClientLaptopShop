import { StyleSheet, Text, View, TextInput, Image, Pressable, ToastAndroid } from 'react-native'
import React, { useContext, useState } from 'react';
import { UserContext } from '../UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = (props) => {
  const { navigation } = props;
  const { onLogin } = useContext(UserContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {

    AsyncStorage.setItem("username", JSON.stringify(username.toLowerCase()));
    AsyncStorage.setItem("pass", JSON.stringify(password));

    if (username.trim().length == 0 || password.trim().length == 0) {
      ToastAndroid.show('Vui lòng nhập đầy đủ thông tin', ToastAndroid.CENTER);
      return;
    }

    const res = onLogin(username.toLowerCase(), password);
    console.log('login...: ', await AsyncStorage.getItem("username"));

    if (res == false) {
      ToastAndroid.show('Tài khoản hoặc mật khẩu không đúng', ToastAndroid.CENTER);
      return;
    }

  }

  return (
    <View style={styles.container}>

      <Image style={styles.background} source={require('../../../assets/images/bgr.jpg')} />

      <View style={styles.containerChi}>
        <Text style={styles.textHeader}>Đăng nhập</Text>

        <View style={styles.itemContainer}>
          <TextInput value={username} onChangeText={setUsername} placeholder='Tài khoản' style={styles.textInput} />

          <Image style={styles.icon} source={require('../../../assets/images/icon_person.png')} />
        </View>
        <View style={styles.itemContainer}>
          <TextInput value={password} onChangeText={setPassword} placeholder='Mật khẩu' style={styles.textInput} secureTextEntry />

          <Image style={styles.icon} source={require('../../../assets/images/icon_key.png')} />
        </View>

        <Pressable style={styles.button} onPress={login}>
          <Text style={styles.buttonLabel}>Đăng nhập</Text>
        </Pressable>
        <View style={styles.registerContainer0}>
          <Text style={styles.textDon}>Không có tài khoản?</Text>
          <Pressable style={styles.registerContainer} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.textRegister}>Đăng ký ngay!</Text>
          </Pressable>
        </View>


      </View>



    </View>
  )
}

export default Login

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    position: 'absolute',
    left: 10,
    tintColor: '#7FB77E',
  },
  itemContainer: {
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
  },
  textDon: {
    fontSize: 15,
    color: 'white',
    marginRight: 5,
  },
  registerContainer0: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  textRegister: {
    fontSize: 15,
    color: '#7FB77E',
  },
  registerContainer: {

  },
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

  textHeader: {
    fontSize: 40,
    fontWeight: '700',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
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
    height: 50,
    backgroundColor: '#355',
    borderRadius: 8,
    marginVertical: 8,
    justifyContent: 'center',
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    width: '100%',
    height: 46,
    borderRadius: 8,
    marginVertical: 8,
    paddingLeft: 46,
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