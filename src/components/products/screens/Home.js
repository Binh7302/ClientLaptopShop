import { StyleSheet, Text, View, Image, Pressable, FlatList, TextInput } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { ProductContext } from '../ProductContext';

const Home = (props) => {
    const { navigation } = props;
    const { onGetAllProduct, onGetSearchProduct, products } = useContext(ProductContext);
    const [isLoading, setIsLoading] = useState(false);


    //tu dong chay khi component dc goi
    async function fetchData() {
        setIsLoading(true);
        const res = await onGetAllProduct();
        setIsLoading(false);
    }
    useEffect(() => {

        fetchData();
    }, []);


    const onSearch = (name) => {
        onGetSearchProduct(name);
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
                                placeholder='Search...'
                                onChangeText={(text) => onSearch(text)}></TextInput>
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

export default Home

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
        resizeMode: 'center',
    },
    containerItem: {
        width: 190,
        height: 230,
        margin: 5,
        borderRadius: 10,
        borderColor: '#B1D7B4',
        borderWidth: 0.5,

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
    },

    containerS: {
        marginHorizontal: 10,
    },
    textLoading: {
        textAlign: 'center',
        height: '100%',
        textAlignVertical: 'center',
    },
    fla: {
        marginBottom: 90,
    },
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },

})