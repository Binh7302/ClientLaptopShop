import { StyleSheet, Text, View, Image, Pressable, FlatList, TextInput, Alert, ToastAndroid } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { ProductContext } from '../ProductContext';
import { UserContext } from '../../users/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Cart = (props) => {

  const [listCart, setListCart] = useState([]);
  const [haveItem, setHaveItem] = useState(false);
  const { onGetOneProduct } = useContext(ProductContext);
  const [total, setTotal] = useState(0);

  const onAlertBuy = () =>
    Alert.alert(
      "Thông báo",
      "Bạn có muốn đặt hàng ngay?",
      [
        {
          text: "Không",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Có", onPress: () => onBuyNow() }
      ]
    );

  const onBuyNow = async () => {
    ToastAndroid.show('Đặt hàng thành công', ToastAndroid.CENTER);
  }


  const onSetTotal = async () => {
    const listCart0 = await AsyncStorage.getItem("listCart");
    const listCart1 = JSON.parse(listCart0);
    var total0 = 0;
    for (let index = 0; index < listCart1.length; index++) {
      total0 += (listCart1[index].amount * listCart1[index].quantityPurchased);
    }
    setTotal(total0);
    if(total <= 0) {
      setHaveItem(false);
    }
  }


  const onMinusQuantity = async (_id) => {
    const listCart0 = await AsyncStorage.getItem("listCart");
    const listCart1 = JSON.parse(listCart0);
    for (let index = 0; index < listCart1.length; index++) {
      if (listCart1[index].product._id == _id & listCart1[index].quantityPurchased > 1) {
        listCart1[index].quantityPurchased--;
        AsyncStorage.setItem("listCart", JSON.stringify(listCart1));
        onRestartCart();
        return;
      }
    }
  }

  const onPlusQuantity = async (_id) => {
    const listCart0 = await AsyncStorage.getItem("listCart");
    const listCart1 = JSON.parse(listCart0);

    for (let index = 0; index < listCart1.length; index++) {
      if (listCart1[index].product._id == _id & listCart1[index].quantityPurchased > 0) {
        listCart1[index].quantityPurchased++;
        AsyncStorage.setItem("listCart", JSON.stringify(listCart1));
        onRestartCart();
        return;
      }
    }
  }

  const onDeleteCartDetail = async (_id) => {
    const listCart0 = await AsyncStorage.getItem("listCart");
    const listCart1 = JSON.parse(listCart0);
    for (let index = 0; index < listCart1.length; index++) {
      if (listCart1[index].product._id == _id) {
        listCart1.splice(index, 1);
        AsyncStorage.setItem("listCart", JSON.stringify(listCart1));
        onRestartCart();
        return;
      }
    }
  }

  async function fetchData() {
    try {
      const listCart0 = await AsyncStorage.getItem("listCart");
      if (listCart0) {
        setListCart(JSON.parse(listCart0));
        setHaveItem(true);
      } else {
        setHaveItem(false);
      }
      onSetTotal();
    } catch (error) {
      console.log("Cart erro: ", error);
    }

  }
  useEffect(() => {

    fetchData();
  }, []);

  const onRestartCart = async () => {
    try {
      const listCart0 = await AsyncStorage.getItem("listCart");
      if (listCart0) {
        setListCart(JSON.parse(listCart0));
        setHaveItem(true);

      } else {
        setHaveItem(false);
      }
      onSetTotal();
    } catch (error) {
      console.log("Cart erro: ", error);
    }
  }

  const renderItem = ({ item }) => {
    const { id, product, quantityPurchased, amount } = item;

    return (
      <View style={styles.containerItem}>

        <View style={styles.productImageContainer}>
          <Image style={styles.productImage} source={{ uri: product.image }}></Image>
        </View>

        <View style={styles.boxText}>
          <View style={styles.boxTextTop}>
            <Text numberOfLines={2} style={styles.txtname}>{product.name}</Text>
            <Pressable style={styles.containerIconDelete} onPress={() => onDeleteCartDetail(product._id)}>
              <Image style={styles.iconDelete} source={require('../../../assets/images/icon_garbage.png')} />
            </Pressable>
          </View>

          <View style={styles.boxTextBottom}>
            <Text style={styles.txtprice}>${amount}</Text>
            <View style={styles.boxCount}>
              <Pressable style={styles.containerIconMinus} onPress={() => onMinusQuantity(product._id)}>
                <Image style={styles.iconMinus} source={require('../../../assets/images/icon_minus.png')} />
              </Pressable>
              <Text style={styles.txtCount}>{quantityPurchased}</Text>
              <Pressable style={styles.containerIconPlus} onPress={() => onPlusQuantity(product._id)}>
                <Image style={styles.iconPlus} source={require('../../../assets/images/icon_plus.png')} />
              </Pressable>

            </View>
          </View>
        </View>
      </View>

    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.textTienIch}>Giỏ hàng</Text>
      <View style={styles.viewGachChan}>
        <Text> </Text>
      </View>
      {
        haveItem == false ?
          <Pressable onTouchStart={onRestartCart}>
            <Text style={styles.textLoading} >Bạn chưa mua gì hết</Text>
          </Pressable>
          :
          <View>
            <FlatList style={styles.fla}
              data={listCart}
              renderItem={renderItem}
              keyExtractor={Math.random}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              onTouchMove={onRestartCart}>
            </FlatList>

            <View style={styles.inforContainer}>
              <View style={styles.itemInforContainer}>
                <Text style={styles.txtItem}>Sản phẩm({listCart.length})</Text>
                <Text style={styles.txtPriceItem}>${total}</Text>
              </View>
              <View style={styles.itemInforContainer}>
                <Text style={styles.txtItem}>Phí vận chuyển</Text>
                <Text style={styles.txtPriceItem}>$2</Text>
              </View>
              <Image style={styles.iconDashed} source={require('../../../assets/images/icon_dashed.png')} />
              <View style={styles.itemInforContainer0}>
                <Text style={styles.txtItem0}>Tổng cộng</Text>
                <Text style={styles.txtPriceItem0}>${total + 2}</Text>
              </View>
            </View>
            <Pressable style={styles.button} onPress={onAlertBuy} >
              <Text style={styles.txtButton}>Đặt hàng</Text>
            </Pressable>
          </View>
      }

    </View>
  )
}

export default Cart

const styles = StyleSheet.create({
  textLoading: {
    fontWeight: '700',
    fontSize: 20,
    alignSelf: 'center',
    height: '100%',
    textAlignVertical: 'center',
  },
  txtButton: {
    fontWeight: '700',
    color: 'white',
    fontSize: 18,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7FB77E',
    margin: 10,
    borderRadius: 5,
    height: 50,
  },
  txtPriceItem0: {
    position: 'absolute',
    right: 0,
    position: 'absolute',
    fontWeight: '700',
    color: '#7FB77E',
    fontSize: 16,
  },
  txtItem0: {
    position: 'absolute',
    left: 0,
    fontWeight: '700',
    color: '#223263',
    fontSize: 16,
  },
  itemInforContainer0: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 24,
    position: 'relative',
  },
  iconDashed: {
    height: 0.5,
    width: 300,
    alignSelf: 'center',
    tintColor: '#9098B1',
    // backgroundColor: 'red',
    marginVertical: 16,
  },
  txtPriceItem: {
    position: 'absolute',
    right: 0,
    position: 'absolute',
    fontWeight: '500',
    color: '#223263',
    fontSize: 14,
  },
  txtItem: {
    position: 'absolute',
    left: 0,
    fontWeight: '500',
    color: '#9098B1',
    fontSize: 14,
  },
  itemInforContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 24,
    position: 'relative',
  },
  inforContainer: {
    width: '95%',

    marginTop: 10,
    borderWidth: 2,
    alignSelf: 'center',
    borderRadius: 3,
    borderColor: '#EBF0FF',
    padding: 10,
  },
  iconPlus: {
    width: 20,
    height: 20,
    tintColor: '#9098B1',
  },
  containerIconPlus: {
    width: '30%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtCount: {
    backgroundColor: '#EBF0FF',
    width: '40%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#223263',
    opacity: 0.5,
  },
  iconMinus: {
    width: 20,
    height: 20,
    tintColor: '#9098B1',
  },
  containerIconMinus: {
    width: '30%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxCount: {
    width: 110,
    height: 28,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.2,
    borderRadius: 2,
    right: 0,
    top: 5,
    position: 'absolute',
  },
  txtprice: {
    fontWeight: '700',
    color: '#7FB77E',
    fontSize: 16,
  },
  boxTextBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  iconDelete: {
    width: 30,
    height: 30,
    tintColor: '#9098B1',
  },
  containerIconDelete: {
    width: 30,
    height: 30,
    position: 'absolute',
    right: -3,
    bottom: 20,
  },
  txtname: {
    width: '72%',
    height: 40,
    fontSize: 13,
    fontWeight: '700',
  },
  boxTextTop: {
    width: '100%',
    flexDirection: 'row',
    position: 'relative',
  },
  boxText: {

  },
  productImage: {
    width: 72,
    height: 72,
    resizeMode: 'contain',
  },
  productImageContainer: {
    width: 79,
    height: 79,
    borderRadius: 10,
    borderWidth: 0.2,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#7FB77E',
  },
  containerItem: {
    width: '90%',
    height: 110,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.2,
    borderRadius: 3,
    margin: 6,
    alignSelf: 'center',
  },

  viewGachChan: {
    width: '100%',
    height: 1,
    backgroundColor: '#7FB77E',
    marginTop: 10,
  },
  textTienIch: {
    fontWeight: '800',
    fontSize: 22,
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  fla: {
    marginTop: 20,
    height: '60%',
  },
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
})