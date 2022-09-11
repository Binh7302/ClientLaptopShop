import { StyleSheet, Text, View, Image, Pressable, FlatList, TextInput, ToastAndroid } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { ProductContext } from '../ProductContext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Detail = (props) => {
  const { navigation, route: { params: { _id } } } = props;
  const { onGetOneProduct, onGetOneBrand, product, brand, onGetImageByProductID, images } = useContext(ProductContext);
  const [so, setSo] = useState(1);
  const [br, setbr] = useState({});
  // const [listCart, setListCart] = useState([]);


  const cong = () => {
    if (so >= 0) {
      setSo(so + 1);
    }
  }
  const tru = () => {
    if (so > 1) {
      setSo(so - 1);
    }
  }

  async function fetchData() {
    const res = await onGetOneProduct(_id);
    const res0 = await onGetOneBrand(res.brand);

    setbr(res0);
    await onGetImageByProductID(_id);
  }

  useEffect(() => {

    fetchData();
  }, []);

  const onBuyNow = async () => {
    try {
      const listCart0 = await AsyncStorage.getItem("listCart");

      if (listCart0) {
        const listCart1 = JSON.parse(listCart0);
        const cartDetail0 = {
          "id": listCart1.length,
          "product": product,
          "quantityPurchased": so,
          "amount": product.price,
        }

        for (let index = 0; index < listCart1.length; index++) {
          if (product._id == listCart1[index].product._id) {
            ToastAndroid.show('Sản phẩm đã có trong giỏ hàng', ToastAndroid.CENTER);
            console.log("Listcar...: ", listCart0);

            return;
          }
        }
        listCart1.push(cartDetail0);
        AsyncStorage.setItem("listCart", JSON.stringify(listCart1));
        ToastAndroid.show('Thêm vào giỏ hàng thành công', ToastAndroid.CENTER);


      } else {
        const listCart1 = [];
        const cartDetail0 = {
          "id": 0,
          "product": product,
          "quantityPurchased": so,
          "amount": product.price,
        }
        listCart1.push(cartDetail0);
        AsyncStorage.setItem("listCart", JSON.stringify(listCart1));
        ToastAndroid.show('Thêm vào giỏ hàng thành công', ToastAndroid.CENTER);

      }
      console.log("Listcar...: ", listCart0);


    } catch (error) {
      console.log("Buy erro: ", error);
    }

  };

  const onRemove = async () => {
    AsyncStorage.removeItem("listCart");
  }
  const { price, name, brandID, quantity, image, description } = product;


  return (
    <View style={styles.container}>
      <View style={styles.productImageContainer}>
        <View>
          <Image style={styles.productImage} source={{ uri: image }} />
        </View>
        <Pressable style={styles.iconContainer} onPress={() => navigation.goBack()}>
          <Image style={styles.iconImage} source={require('../../../assets/images/icon_arrow.png')} />
        </Pressable>
      </View>
      <View style={styles.containerText}>
        <View style={styles.containerName}>
          <Text style={styles.textName}>{name}</Text>
          <View style={styles.containerTotal}>
            <Pressable onPress={() => tru()} style={styles.containerCong}>
              <Text style={styles.textTru}>-</Text>
            </Pressable>
            <Text style={styles.textSo}>{so}</Text>
            <Pressable onPress={() => cong()} style={styles.containerTru}>
              <Text style={styles.textCong}>+</Text>
            </Pressable>
          </View>
        </View>
        <Text style={styles.textPrice}>${price}</Text>
        <Text style={styles.textDes0}>Mô tả</Text>
        <Text style={styles.textDes1}>{description}</Text>
        <View style={styles.brandContainer}>
          <Text style={styles.textBrand0}>Nhãn hàng:</Text>
          <Text style={styles.textBrand1}>{br.name}</Text>
        </View>
        <Pressable style={styles.containerBuy} onPress={onBuyNow}>
          <Text style={styles.textBuy}>Thêm vào giỏ hàng</Text>
        </Pressable>
      </View>


    </View>
  )
}

export default Detail

const styles = StyleSheet.create({
  textTru: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontSize: 16,

  },
  textCong: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontSize: 16,
  },
  textSo: {
    width: 40,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontSize: 16,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderRightColor: 'white',
    borderLeftColor: 'white'
  },
  containerTru: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerCong: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',

  },
  containerTotal: {
    flexDirection: 'row',
    backgroundColor: '#7FB77E',
    width: 100,
    height: 30,
    borderRadius: 20,
  },
  containerName: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textBuy: {
    fontWeight: '600',
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    marginRight: 10,
  },
  containerBuy: {
    width: '100%',
    height: 50,
    backgroundColor: '#7FB77E',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    borderRadius: 10,
  },
  textQuan1: {
    fontWeight: '600',
    color: '#000',
    fontSize: 16,
    lineHeight: 24,
    marginRight: 10,
  },
  textQuan0: {
    fontWeight: '600',
    color: '#7FB77E',
    fontSize: 16,
    lineHeight: 24,
    marginRight: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textBrand1: {
    fontWeight: '600',
    color: '#000',
    fontSize: 16,
    lineHeight: 24,
    marginRight: 10,
  },
  textBrand0: {
    fontWeight: '600',
    color: '#7FB77E',
    fontSize: 16,
    lineHeight: 24,
    marginRight: 10,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textDes1: {

  },
  textDes0: {
    fontWeight: '600',
    color: '#7FB77E',
    fontSize: 16,
    lineHeight: 24,
  },
  textPrice: {
    fontWeight: '700',
    color: '#7FB77E',
    fontSize: 18,
    lineHeight: 30,
    marginTop: 3,
  },
  textName: {
    fontWeight: '700',
    fontSize: 21,
    width: '75%'
  },

  containerText: {
    marginHorizontal: 16,
  },

  iconImage: {
    width: 20,
    height: 20,
  },
  iconContainer: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: 32,
    left: 16,
  },
  productImage: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
  },
  productImageContainer: {
    position: 'relative',
  },
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
})