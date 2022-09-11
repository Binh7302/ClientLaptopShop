import { StyleSheet, Text, View, Image, Pressable, FlatList, TextInput, ToastAndroid } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../users/UserContext';

const ChangePass = (props) => {
  const { navigation } = props;
  const { onGetOneUser, onUpdatePass, setIsLoggedIn } = useContext(UserContext);
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [phonenumber, setPhonenumber] = useState('');

  const [passOld, setPassOld] = useState('');
  const [passNew, setPassNew] = useState('');
  const [passNewRe, setPassNewRe] = useState('');


  async function fetchData() {
    const username = await AsyncStorage.getItem("username");
    const res = await onGetOneUser(JSON.parse(username));

    setUser(res);
    setName(res.name);
    setPhonenumber(res.phonenumber);
  }

  useEffect(() => {

    fetchData();
  }, []);

  const onSave = async () => {
    const pass = await AsyncStorage.getItem("pass");

    if (passOld.trim().length == 0 | passNew.trim().length == 0 | passNewRe.trim().length == 0) {
      ToastAndroid.show('Vui lòng nhập đầy đủ thông tin', ToastAndroid.CENTER);
      return;
    } else if (passOld != JSON.parse(pass)) {
      ToastAndroid.show('Mật khẩu cũ không đúng', ToastAndroid.CENTER);
      return;
    } else if (passOld == JSON.parse(pass) & passNew == passNewRe) {
      await onUpdatePass(user._id, passNew);
      ToastAndroid.show('Đổi mật khẩu thành công', ToastAndroid.CENTER);
      setIsLoggedIn(false);
      return;
    } else {
      ToastAndroid.show('Mật khẩu không trùng khớp', ToastAndroid.CENTER);
      return;
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Pressable style={styles.backIcon} onPress={() => navigation.goBack()}>
          <Image style={styles.iconImage} source={require('../../../assets/images/icon_arrow.png')} />
        </Pressable>
        <Text style={styles.textTop}>Đổi mật khẩu</Text>
      </View>
      <View style={styles.midContainer}>
        <View style={styles.imageContainer}>
          <Image style={styles.iconImagePerson} source={require('../../../assets/images/icon_person.png')} />
        </View>
        <View style={styles.inforCotainer}>
          <Text style={styles.txtMidName}>{user.name}</Text>
          <Text style={styles.txtMidPhone}>{phonenumber}</Text>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.itemContainer}>
          <Text style={styles.txtName}>Mật khẩu cũ</Text>
          <View style={styles.itemNameContainer}>
            <Image style={styles.iconName} source={require('../../../assets/images/icon_key.png')} />
            <TextInput value={passOld} onChangeText={setPassOld} style={styles.textInput} secureTextEntry />
          </View>
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.txtName}>Mật khẩu mới</Text>
          <View style={styles.itemNameContainer}>
            <Image style={styles.iconName} source={require('../../../assets/images/icon_pass1.png')} />
            <TextInput value={passNew} onChangeText={setPassNew} style={styles.textInput} secureTextEntry />
          </View>
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.txtName}>Nhập lại mật khẩu mới</Text>
          <View style={styles.itemNameContainer}>
            <Image style={styles.iconName} source={require('../../../assets/images/icon_pass0.png')} />
            <TextInput value={passNewRe} onChangeText={setPassNewRe} style={styles.textInput} secureTextEntry />
          </View>
        </View>

        <View style={styles.buttonContainer0}>
          <Pressable style={styles.buttonContainer} onPress={onSave}>
            <Text style={styles.txtButton} >Lưu</Text>
          </Pressable>
        </View>

      </View>
    </View>
  )
}

export default ChangePass

const styles = StyleSheet.create({
  buttonContainer0: {
    width: '100%',
    alignItems: 'center',
  },
  txtButton: {
    fontWeight: '700',
    color: 'white',
    fontSize: 18,
  },
  buttonContainer: {
    width: '90%',
    height: 50,
    backgroundColor: '#7FB77E',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 50,
  },
  itemNameContainer: {
    flexDirection: 'row',
    position: 'relative',
    alignItems: 'center',
  },
  iconName: {
    width: 24,
    height: 24,
    position: 'absolute',
    tintColor: '#7FB77E',
  },
  textInput: {
    width: '100%',
    height: 40,
    fontSize: 16,
    borderBottomWidth: 0.2,
    fontWeight: '400',
    paddingLeft: 38,
  },
  txtName: {
    fontWeight: '700',
    color: '#444',
    fontSize: 16,
  },
  itemContainer: {
    marginBottom: 16,
  },
  bottomContainer: {
    marginHorizontal: 10,
    marginTop: 16,
  },
  txtMidPhone: {
    fontWeight: '400',
    color: '#444',
    fontSize: 16,
  },
  txtMidName: {
    fontWeight: '700',
    color: '#444',
    fontSize: 16,
  },
  inforCotainer: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  iconImagePerson: {
    width: 45,
    height: 45,
    tintColor: '#7FB77E',
  },
  imageContainer: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  midContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  textTop: {
    fontSize: 18,
    fontWeight: '700'
  },
  iconImage: {
    width: 20,
    height: 20,
  },
  backIcon: {
    width: 20,
    height: 20,
    marginLeft: 16,
    marginRight: 16,
  },
  topContainer: {
    flexDirection: 'row',
    marginTop: 30,
    alignItems: 'center',
    borderBottomWidth: 0.2,
    paddingBottom: 18,
    borderBottomColor: 'gray'
  },
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
})