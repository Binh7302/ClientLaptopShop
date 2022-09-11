import { StyleSheet, Text, View, Image, Pressable, FlatList, TextInput } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { ProductContext } from '../ProductContext';

const ListMore = (props) => {
  const { navigation, route: { params: { _id } } } = props;
  const { onGetAllProductForListMore, onGetSearchProductForListMore, onGetProductByBrandID, onGetSearchProductWithBrand } = useContext(ProductContext);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([])


  //tu dong chay khi component dc goi
  async function fetchData() {
    setIsLoading(true);
    if(_id == 0){
      const res = await onGetAllProductForListMore();
      setProducts(res);
      
    } else {
      const res = await onGetProductByBrandID(_id);
      setProducts(res);
    }
    setIsLoading(false);
  }
  useEffect(() => {

    fetchData();
  }, []);


  const onSearch = async (name) => {
    if(_id == 0) {
      const res = await onGetSearchProductForListMore(name);
      setProducts(res);
    } else {
      const res = await onGetSearchProductWithBrand(name, _id);
      setProducts(res);
    }
    
  }

  const renderItem = ({ item }) => {
    const { _id, name, price, image } = item;
    return (
      <View>
        <Pressable onPress={() => navigation.navigate('Detail', { _id: _id })} style={styles.containerItem}>

          <View style={styles.productImageContainer}>
            <Image style={styles.productImage} source={{ uri: image }}></Image>
          </View>

          <View style={styles.boxText}>
            <Text numberOfLines={2} style={styles.txtname}>{name}</Text>
            <Text style={styles.txtprice}>${price}</Text>
          </View>


        </Pressable>
      </View>

    )
  }

  return (
    <View style={styles.container}>
      {
        isLoading == true ?
          <Text style={styles.textLoading}>Loading...</Text> :
          <View style={styles.containerS}>
            <View style={styles.searchContainer}>
              <View style={styles.searchIcon}>
                <Image style={styles.iconImage} source={require('../../../assets/images/icon_search.png')} />
              </View>
              <TextInput style={styles.textInputSearch}
                placeholder='Tìm kiếm...'
                onChangeText={(text) => onSearch(text)}></TextInput>
            </View>
            <View style={styles.viewGachChan}>
              <Text> </Text>
            </View>

            <FlatList style={styles.fla}
              data={products}
              renderItem={renderItem}
              keyExtractor={Math.random}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              numColumns={2}
              contentContainerStyle={{ alignSelf: 'center' }}>
            </FlatList>

          </View>


      }
    </View>
  )
}

export default ListMore

const styles = StyleSheet.create({
  txtprice: {
    fontWeight: '700',
    color: '#7FB77E',
    fontSize: 16,
  },
  txtname: {
    height: 40,
    fontWeight: '500',

  },
  boxText: {
    paddingHorizontal: 10,
  },
  productImageContainer: {

  },
  productImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'contain',
  },
  containerItem: {
    width: 190,
    height: 230,
    margin: 5,
    borderRadius: 10,
    borderColor: '#B1D7B4',
    borderWidth: 0.5,

  },
  viewGachChan: {
    width: '100%',
    height: 1,
    backgroundColor: '#7FB77E',
    marginTop: 10,
    marginBottom: 6,
  },
  textInputSearch: {
    width: '100%',
    height: '100%',
    paddingLeft: 50,
    paddingRight: 20,
    color: 'white',
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 17,
  },
  iconImage: {
    height: 20,
    width: 20,
    top: 15,
    left: 20,
    color: 'white',
  },
  searchIcon: {
    position: 'absolute',

  },
  searchContainer: {
    height: 50,
    position: 'relative',
    marginTop: 30,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#B1D7B4',
    borderWidth: 1,
    borderColor: '#7FB77E',
    marginHorizontal: 10,
  },

  containerS: {
    // marginHorizontal: 10,
  },
  textLoading: {
    textAlign: 'center',
    height: '100%',
    textAlignVertical: 'center',
  },
  fla: {
    marginBottom: 110,
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },

})