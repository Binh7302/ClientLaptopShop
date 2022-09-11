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