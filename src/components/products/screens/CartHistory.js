import { StyleSheet, Text, View, Image, Pressable, FlatList, TextInput, ToastAndroid, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../users/UserContext';
import { ProductContext } from '../ProductContext';


const CartHistory = (props) => {
  const { navigation } = props;
  const { onGetOneUser } = useContext(UserContext);
  const { onGetAllCart } = useContext(ProductContext);
  const [listCartHistory, setListCartHistory] = useState([]);
  const [user, setUser] = useState({});
  const [name, setName] = useState('');
  const [phonenumber, setPhonenumber] = useState('');

  const onFormatDate = (createAt) => {
    var d = new Date(createAt);
    if (d) {
      var date = d.getDate(); //Current Date
      var month = d.getMonth() + 1; //Current Month
      var year = d.getFullYear(); //Current Year
      var hours = d.getHours(); //Current Hours
      var min = d.getMinutes(); //Current Minutes
      var sec = d.getSeconds(); //Current Seconds
      const dateString = date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec;
      return dateString;
    }
  }

  const onGetTextColor = (status) => {
    if (status == "Đang đóng gói") {
      return 'green';
    } 
    else if (status == "Đang vận chuyển") {
      return 'green';
    }
    else if (status == "Đã giao hàng") {
      return 'blue';
    }
    else if (status == "Đã hủy") {
      return 'Red';
    }
  }

  const onFormatStatus = (status) => {
    if (status == 0) {
      return "Đang đóng gói";
    } else if (status == 1) {
      return "Đang vận chuyển";
    }
    else if (status == 2) {
      return "Đã giao hàng";
    }
    else if (status == 3) {
      return "Đã hủy";
    }
  }

  async function fetchData() {
    const username = await AsyncStorage.getItem("username");
    const res = await onGetOneUser(JSON.parse(username));
    setUser(res);
    setName(res.name);
    setPhonenumber(res.phonenumber);

    const listCartHistory0 = await onGetAllCart(res._id);
    var listCartHistory1 = [];
    if (listCartHistory0) {
      for (let index = 0; index < listCartHistory0.length; index++) {
        const dateString = onFormatDate(listCartHistory0[index].createAt);
        const statusString = onFormatStatus(listCartHistory0[index].status);
        const cart = {
          "_id": listCartHistory0[index]._id,
          "total": listCartHistory0[index].total,
          "status": statusString,
          "address": listCartHistory0[index].address,
          "createAt": dateString,
        }
        listCartHistory1.push(cart);
      }
    }
    setListCartHistory(listCartHistory1);

  }

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    const { _id, total, status, createAt, address } = item;

    return (
      // <Pressable style={styles.containerItem} onPress={() => navigation.navigate('Detail', { _id: _id })}>
      <Pressable style={styles.containerItem}>
        <View style={styles.containerItemTop}>
          <Text style={styles.txtTotal}>${total}</Text>
          <Text style={styles.txtDate}>{createAt}</Text>
        </View>
        <View style={styles.containerBottom}>
          <Text style={styles.txtStatus0}>Trạng thái:</Text>
          <Text style={styles.txtStatus}>{status}</Text>
        </View>
        <View style={styles.containerBottom}>
          <Text style={styles.txtAddress0}>Địa chỉ:</Text>
          <Text style={styles.txtAddress} >{address}</Text>
        </View>
      </Pressable>

    )
  }


  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Pressable style={styles.backIcon} onPress={() => navigation.goBack()}>
          <Image style={styles.iconImage} source={require('../../../assets/images/icon_arrow.png')} />
        </Pressable>
        <Text style={styles.textTop}>Lịch sử mua hàng</Text>
      </View>


      <FlatList style={styles.fla}
        data={listCartHistory}
        renderItem={renderItem}
        keyExtractor={Math.random}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
      </FlatList>
    </View>

  )
}

export default CartHistory

const styles = StyleSheet.create({
  txtAddress0: {
    marginRight: 8,
    fontWeight: '400',
    color: '#222',
    fontSize: 15,
  },
  txtAddress: {
    width: '83%',
    fontSize: 14,
    fontWeight: '400',
  },
  containerBottom: {
    flexDirection: 'row',
    position: 'relative',
    margin: 2,
  },
  txtStatus0: {
    marginRight: 8,
    fontWeight: '400',
    color: '#222',
    fontSize: 15,
  },
  txtStatus: {
    color: 'blue',
    fontSize: 15,
    fontWeight: '400',
  },
  txtDate: {
    position: 'absolute',
    right: 0,
    fontWeight: '500',
    color: 'gray',
    fontSize: 14,
  },
  txtTotal: {
    fontWeight: '700',
    color: '#7FB77E',
    fontSize: 17,
  },
  containerItemTop: {
    flexDirection: 'row',
    position: 'relative',
  },
  containerItem: {
    width: '92%',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'grey',
    alignSelf: 'center',
    margin: 10,
    padding: 10,
  },
  gachChan: {
    width: '10%',
    borderBottomColor: 'cyan',
    borderBottomWidth: 0.2,
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
    borderBottomColor: 'gray',
    marginBottom: 10,
  },
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
})