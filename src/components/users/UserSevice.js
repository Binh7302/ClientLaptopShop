import axiosInstance from "../../utilities/axios";
import constants from "../../utilities/constants";

export const login = async (username, password) => {
    const data = { username, password };
    const res = await axiosInstance.post(constants.API_LOGIN, data);
    return res;
}

export const register = async (username, password, confirm_password, name, email, phonenumber) => {
    const data = { username, password, confirm_password, name, email, phonenumber };
    const res = await axiosInstance.post(constants.API_REGISTER, data);
    return res;
}

export const getOneUser = async (username) => {
    const res = await axiosInstance.get(`/api/get-user-by-username?username=${username}`);
    return res;
}

export const updateUser = async (_id ,name, email, phonenumber) => {
    const data = { name, email, phonenumber };
    const res = await axiosInstance.put(`/api/update-user/${_id}`, data);
    return res;
}

export const updatePass = async (_id, password) => {
    const data = { password };
    const res = await axiosInstance.put(`/api/update-user-pass/${_id}`, data);
    return res;
}