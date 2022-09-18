import axiosInstance from "../../utilities/axios";
import constants from "../../utilities/constants";

export const getAllProduct = async () => {
    const res = await axiosInstance.get("/api/get-all-product");
    return res;
}

export const getOneProduct = async (id) => {
    const res = await axiosInstance.get(`/api/get-one-product/${id}`);
    return res;
}

export const getImageByProductID = async (productID) => {
    const res = await axiosInstance.get(`/api/get-image-by-productID/${productID}`);
    return res;
}

export const getSearchProduct = async (search) => {
    const res = await axiosInstance.get(`/api/get-product-search?search=${search}`);
    return res;
}

export const getOneBrand = async (brandID) => {
    const res = await axiosInstance.get(`/api/get-one-brand/${brandID}`);
    return res;
}

export const getAllBrand = async () => {
    const res = await axiosInstance.get(`/api/get-all-brand`);
    return res;
}

export const getProductByBrandID = async (brandID) => {
    const res = await axiosInstance.get(`/api/get-product-by-brandID/${brandID}`);
    return res;
}

export const getSearchProductWithBrand = async (search, brandID) => {
    const res = await axiosInstance.get(`/api/get-product-search-with-brandID/${brandID}?search=${search}`);
    return res;
}

export const addCart = async (userID, address, statusID, total, createAt) => {
    const data = { userID, address, statusID, total, createAt };
    const res = await axiosInstance.post(`/api/add-cart/`, data);
    return res;
}

export const addCartDetail = async (quantityPurchased, amount, productID, cartID) => {
    const data = { quantityPurchased, amount, productID, cartID };
    const res = await axiosInstance.post(`/api/add-cartDetail/`, data);
    return res;
}

export const getAllCart = async (userID) => {
    const res = await axiosInstance.get(`/api/get-all-cart/${userID}`);
    return res;
}

export const getAllCartDetail = async (cartID) => {
    const res = await axiosInstance.get(`/api/get-all-cartDetail/${cartID}`);
    return res;
}

export const getOneCart = async (cartID) => {
    const res = await axiosInstance.get(`/api/get-one-cart/${cartID}`);
    return res;
}

export const updateCart = async (_id, statusID) => {
    const data = { statusID };
    const res = await axiosInstance.put(`/api/update-cart/${_id}`, data);
    return res;
}
