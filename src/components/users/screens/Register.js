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
    if (name.trim().length == 0 || email.trim().length == 0 || phonenumber.trim().length == 0 || username.trim().length == 0 || password.trim().length == 0 || confirm_password.trim().length == 0) {
      ToastAndroid.show('Vui lòng nhập đầy đủ thông tin', ToastAndroid.CENTER);
      return;
    }

    if (password != confirm_password) {
      ToastAndroid.show('Xác nhận mật khẩu không đúng', ToastAndroid.CENTER);
      return;
    }

    const res = onRegister(username, password, confirm_password, name, email, phonenumber);
    if (res == false) {
      ToastAndroid.show('Đăng ký không thành công', ToastAndroid.CENTER);
      return;
    }

    navigation.navigate('Login');

  }

  return (
    <View style={styles.container}>
      <Image style={styles.background} source={require('../../../assets/images/bgr.jpg')} />

      <View style={styles.containerChi}>
        <Text style={styles.textHeader}>Đăng ký</Text>
        <View style={styles.itemContainer}>
          <TextInput value={name} onChangeText={setName} placeholder='Tên người dùng' style={styles.textInput} />
          <Image style={styles.icon} source={require('../../../assets/images/icon_name.png')} />
        </View>
        <View style={styles.itemContainer}>
          <TextInput value={email} onChangeText={setEmail} placeholder='Email' style={styles.textInput} />
          <Image style={styles.icon} source={require('../../../assets/images/icon_email.png')} />
        </View>
        <View style={styles.itemContainer}>
          <TextInput value={phonenumber} onChangeText={setPhoneNumber} placeholder='Số điện thoại' style={styles.textInput} />
          <Image style={styles.icon} source={require('../../../assets/images/icon_phone.png')} />
        </View>
        <View style={styles.itemContainer}>
          <TextInput value={username} onChangeText={setUsername} placeholder='Tài khoản' style={styles.textInput} />
          <Image style={styles.icon} source={require('../../../assets/images/icon_ed_profile.png')} />
        </View>
        <View style={styles.itemContainer}>
          <TextInput value={password} onChangeText={setPassword} placeholder='Mật khẩu' style={styles.textInput} secureTextEntry />
          <Image style={styles.icon} source={require('../../../assets/images/icon_pass1.png')} />
        </View>
        <View style={styles.itemContainer}>
          <TextInput value={confirm_password} onChangeText={setConfirm_password} placeholder='Nhập lại mật khẩu' style={styles.textInput} secureTextEntry />
          <Image style={styles.icon} source={require('../../../assets/images/icon_pass0.png')} />
        </View>


        <Pressable style={styles.button} onPress={register}>
          <Text style={styles.buttonLabel}>Đăng ký</Text>
        </Pressable>
        <View style={styles.registerContainer0}>
          <Text style={styles.textDon}>Đã có tài khoản?</Text>
          <Pressable style={styles.registerContainer} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.textRegister}>Đăng nhập ngay!</Text>
          </Pressable>
        </View>
      </View>
    </View>

  )
}

export default Register

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
    height: '100%'
  }
})