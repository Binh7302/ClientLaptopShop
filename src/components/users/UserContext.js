import React, { useContext, createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login, register, getOneUser, updateUser, updatePass } from './UserSevice';
import constants from '../../utilities/constants';

export const UserContext = createContext();

export const UserContextProvider = (props) => {
    const { children } = props;
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const onLogin = async (username, password) => {
        try {
            const res = await login(username, password);
            console.log("res: " + res.token);
            if (res && res.token) {
                await AsyncStorage.setItem(constants.TOKEN_KEY, res.token);
                setIsLoggedIn(true);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.log('onLogin error: ', error);
        }
        return false;
    }

    


    const onRegister = async (username, password, confirm_password, name, email, phonenumber) => {
        try {
            const res = await register(username, password, confirm_password, name, email, phonenumber);
            return res.status;
        } catch (error) {
            console.log('onRegister error: ', error);
        }
    }


    const onGetOneUser = async (username) => {
        try {
            const res = await getOneUser(username);
            return res;
        } catch (error) {
            console.log('onGetOneUser error: ', error);
        }
    }

    const onUpdateUser = async (_id, name, email, phonenumber) => {
        try {
            const res = await updateUser(_id, name, email, phonenumber);
        } catch (error) {
            console.log('onUpdateUser error: ', error);
        }
    }

    const onUpdatePass = async (_id, password) => {
        try {
            const res = await updatePass(_id, password);
        } catch (error) {
            console.log('onUpdatePass error: ', error);
        }
    }


    return (
        <UserContext.Provider 
        value={{
            onLogin, onRegister, isLoggedIn, onGetOneUser, onUpdateUser, setIsLoggedIn, onUpdatePass
        }}
        >
            {children}
        </UserContext.Provider>
    )
}
