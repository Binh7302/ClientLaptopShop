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