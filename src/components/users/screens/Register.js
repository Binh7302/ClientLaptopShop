import { StyleSheet, Text, View, TextInput, Image, Pressable, ToastAndroid } from 'react-native'
import React, { useContext, useState } from 'react'
import { UserContext } from '../UserContext';

const Register = (props) => {
  const { navigation } = props;
  const { onRegister } = useContext(UserContext);


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm_password, setConfirm_password] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');


  const register = async () => {
    if (!name || !email || !phonenumber || !username || !password || name.trim().length == 0 || email.trim().length == 0 || phonenumber.trim().length == 0 || username.trim().length == 0 || password.trim().length == 0 || confirm_password.trim().length == 0) {
      ToastAndroid.show('Vui lòng nhập đầy đủ thông tin', ToastAndroid.CENTER);
      return;
    }

    if (password != confirm_password) {
      ToastAndroid.show('Xác nhận mật khẩu không đúng', ToastAndroid.CENTER);

    }

    const res = onRegister(username, password, confirm_password, name, email, phonenumber);
    if (res == false) {
      ToastAndroid.show('Đăng ký không thành công', ToastAndroid.CENTER);
      return;
    }
    ToastAndroid.show('Đăng ký thành công', ToastAndroid.CENTER);
    navigation.navigate('Login');

  }

  return (
    <View style={styles.container}>
      <Image style={styles.background} source={require('../../../assets/images/bgr.jpg')} />

      <View style={styles.containerChi}>
        <Text style={styles.textHeader}>Register</Text>
        <TextInput value={name} onChangeText={setName} placeholder='Name' style={styles.textInput} />
        <TextInput value={email} onChangeText={setEmail} placeholder='Email' style={styles.textInput} />
        <TextInput value={phonenumber} onChangeText={setPhoneNumber} placeholder='Phone number' style={styles.textInput} />
        <TextInput value={username} onChangeText={setUsername} placeholder='Username' style={styles.textInput} />
        <TextInput value={password} onChangeText={setPassword} placeholder='Password' style={styles.textInput} secureTextEntry />
        <TextInput value={confirm_password} onChangeText={setConfirm_password} placeholder='Confirm password' style={styles.textInput} secureTextEntry />
        

        <Pressable style={styles.button} onPress={register}>
          <Text style={styles.buttonLabel}>Register</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonLabel}>Login</Text>
        </Pressable>
      </View>
    </View>

  )
}

export default Register

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },

  textHeader: {
    fontSize: 50,
    fontWeight: '700',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 20,
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
    height: '100%'
  }
})