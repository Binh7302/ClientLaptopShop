import { StyleSheet, Text, View, Image, Pressable, FlatList, TextInput } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { ProductContext } from '../ProductContext';

const More = (props) => {

    const { navigation } = props;
    const { onGetAllBrand, brands } = useContext(ProductContext);
    const [isLoading, setIsLoading] = useState(false);

    //tu dong chay khi component dc goi
    async function fetchData() {
        setIsLoading(true);
        await onGetAllBrand();
        setIsLoading(false);
    }
    useEffect(() => {

        fetchData();
    }, []);

    const renderItem = ({ item }) => {
        const { _id, name, image } = item;
        return (
            <View>
                <Pressable onPress={() => navigation.navigate('ListMore', { _id: _id })} style={styles.containerItem}>
                    <Image style={styles.brandImage} source={{ uri: image }}></Image>
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

                        <Text style={styles.textTienIch}>Mở rộng</Text>


                        <View style={styles.viewGachChan}>
                            <Text> </Text>
                        </View>

                        <Text style={styles.textBrand}>Tiện ích</Text>
                        <View style={styles.containerTienIch}>
                            <Pressable onPress={() => navigation.navigate('ListMore', { _id: 0 })} style={styles.containerItem0}>
                                <Text style={styles.textBrandAll}>Tất cả</Text>
                            </Pressable>

                        </View>
                        <Text style={styles.textBrand}>Nhãn hàng</Text>
                        <FlatList style={styles.fla}
                            data={brands}
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

export default More

const styles = StyleSheet.create({
    textBrandAll: {
        fontWeight: '700',
        fontSize: 18,
        color: '#B1D7B4',
    },
    textBrand: {
        fontSize: 18,
        marginLeft: 16,
        marginBottom: 8,
        marginTop: 30,
        fontWeight: '700',
    },
    brandImage: {
        width: '100%',
        height: 50,
        borderRadius: 40,
        resizeMode: 'contain',
    },
    containerItem: {
        width: 190,
        height: 55,
        margin: 5,
        borderRadius: 10,
        borderColor: '#B1D7B4',
        borderWidth: 0.5,
        backgroundColor: 'white',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerItem0: {
        width: 190,
        height: 55,
        margin: 5,
        borderRadius: 10,
        borderColor: '#B1D7B4',
        borderWidth: 0.5,
        backgroundColor: 'white',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
    viewGachChan: {
        width: '100%',
        height: 1,
        backgroundColor: '#7FB77E',
        marginTop: 10,
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
    textTienIch: {
        fontWeight: '800',
        fontSize: 22,
        width: '100%',
        textAlign: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    containerS: {
    },
    container: {
        backgroundColor: 'white',
        height: '100%'

    },
    textLoading: {
        textAlign: 'center',
        height: '100%',
        textAlignVertical: 'center',
    },
    fla: {
        marginBottom: 110,
    },
})