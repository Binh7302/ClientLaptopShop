import { StyleSheet, Text, View, Image, Pressable, FlatList, TextInput, ToastAndroid, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../users/UserContext';


const EditProfile = (props) => {
  const { navigation } = props;
  const { onGetOneUser, onUpdateUser } = useContext(UserContext);
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
  const [address, setAddress] = useState('');


  let test;


  async function fetchData() {
    const username = await AsyncStorage.getItem("username");
    const res = await onGetOneUser(JSON.parse(username));
    test = res;
    setUser(test);
    setName(test.name);
    setPhonenumber(res.phonenumber);
    setEmail(res.email);
    try {
      const addr0 = await AsyncStorage.getItem("address");
      if(addr0){
        setAddress(JSON.parse(addr0));
      } else {
      }
    } catch (error) {
      console.log("address: " + error);
    }
  }
  
  useEffect(() => {

    fetchData();
  }, []);

  const onSave = async () => {
    await onUpdateUser(user._id, name, email, phonenumber);
    AsyncStorage.setItem("address", JSON.stringify(address));
    ToastAndroid.show('Lưu thành công', ToastAndroid.CENTER);
    navigation.navigate('Profile');
  }


  return (
    <ScrollView style={styles.container}>

    <View >
      <View style={styles.topContainer}>
        <Pressable style={styles.backIcon} onPress={() => navigation.goBack()}>
          <Image style={styles.iconImage} source={require('../../../assets/images/icon_arrow.png')} />
        </Pressable>
        <Text style={styles.textTop}>Hồ sơ người dùng</Text>
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
          <Text style={styles.txtName}>Tên người dùng</Text>
          <View style={styles.itemNameContainer}>
            <Image style={styles.iconName} source={require('../../../assets/images/icon_name.png')} />
            <TextInput value={name} onChangeText={setName} style={styles.textInput} />
          </View>
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.txtName}>Số điện thoại</Text>
          <View style={styles.itemNameContainer}>
            <Image style={styles.iconName} source={require('../../../assets/images/icon_phone.png')} />
            <TextInput value={phonenumber} onChangeText={setPhonenumber} style={styles.textInput} />
          </View>
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.txtName}>Email</Text>
          <View style={styles.itemNameContainer}>
            <Image style={styles.iconName} source={require('../../../assets/images/icon_email.png')} />
            <TextInput value={email} onChangeText={setEmail} style={styles.textInput} />
          </View>
        </View>

        <View style={styles.itemContainer}>
          <Text style={styles.txtName}>Địa chỉ</Text>
          <View style={styles.itemNameContainer}>
            <Image style={styles.iconName} source={require('../../../assets/images/icon_address.png')} />
            <TextInput value={address} onChangeText={setAddress} style={styles.textInput} />
          </View>
        </View>

        <View style={styles.buttonContainer0}>
          <Pressable style={styles.buttonContainer} onPress={onSave}>
            <Text style={styles.txtButton} >Lưu</Text>
          </Pressable>
        </View>

      </View>
    </View>
    </ScrollView>

  )
}

export default EditProfile

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