import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../users/UserContext';


const Profile = (props) => {
    const { navigation } = props;
    const { setIsLoggedIn } = useContext(UserContext);

    const onOut = () => {
        setIsLoggedIn(false);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.textTienIch}>Tài khoản</Text>
            <View style={styles.viewGachChan}>
                <Text> </Text>
            </View>
            <View style={styles.BoxContainer}>
                <Pressable style={styles.itemContainer} onPress={() => navigation.navigate('EditProfile')}>
                    <View style={styles.mainIcon}>
                        <Image style={styles.iconImage} source={require('../../../assets/images/icon_ed_profile.png')} />
                    </View>
                    <Text style={styles.textItem}>Hồ sơ người dùng</Text>
                    <View style={styles.backIcon}>
                        <Image style={styles.iconImageBack} source={require('../../../assets/images/icon_arrow_right.png')} />
                    </View>
                </Pressable>
                <Pressable style={styles.itemContainer} onPress={() => navigation.navigate('CartHistory')}>
                    <View style={styles.mainIcon}>
                        <Image style={styles.iconImage} source={require('../../../assets/images/icon_pill.png')} />
                    </View>
                    <Text style={styles.textItem}>Lịch sử mua hàng</Text>
                    <View style={styles.backIcon}>
                        <Image style={styles.iconImageBack} source={require('../../../assets/images/icon_arrow_right.png')} />
                    </View>
                </Pressable>
                <Pressable style={styles.itemContainer} onPress={() => navigation.navigate('ChangePass')}>
                    <View style={styles.mainIcon}>
                        <Image style={styles.iconImage} source={require('../../../assets/images/icon_change_pass.png')} />
                    </View>
                    <Text style={styles.textItem}>Đổi mật khẩu</Text>
                    <View style={styles.backIcon}>
                        <Image style={styles.iconImageBack} source={require('../../../assets/images/icon_arrow_right.png')} />
                    </View>
                </Pressable>
                <Pressable style={styles.itemContainer} onPress={onOut}>
                    <View style={styles.mainIcon}>
                        <Image style={styles.iconImageOut} source={require('../../../assets/images/icon_out.png')} />
                    </View>
                    <Text style={styles.textItem}>Đăng xuất</Text>
                    <View style={styles.backIcon}>
                        <Image style={styles.iconImageBack} source={require('../../../assets/images/icon_arrow_right.png')} />
                    </View>
                </Pressable>
            </View>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    iconImageOut: {
        width: 20,
        height: 20,
        tintColor: 'red',
    },
    textItem: {
        fontWeight: '700',
        color: '#444',
        fontSize: 16,
    },
    backIcon: {
        width: 20,
        height: 20,
        position: 'absolute',
        left: '95%',
    },
    iconImageBack: {
        width: 20,
        height: 20,
        tintColor: 'gray',
    },
    iconImage: {
        width: 20,
        height: 20,
        tintColor: '#7FB77E',
    },
    mainIcon: {
        width: 20,
        height: 20,
        marginRight: 16,
    },
    itemContainer: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
        borderBottomWidth: 0.2,
        borderBottomColor: '#7FB77E',
    },
    BoxContainer: {
        marginHorizontal: 10,
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
    container: {
        backgroundColor: 'white',
        height: '100%',
    },
})