import React, { useContext, createContext, useState } from 'react';
import { getAllProduct, getOneProduct, getImageByProductID, getSearchProduct, getOneBrand, getAllBrand, getProductByBrandID, getSearchProductWithBrand } from './ProductService';

export const ProductContext = createContext();

export const ProductContextProvider = (props) => {
    const { children } = props;
    const [products, setProducts] = useState([]);
    const [images, setImages] = useState([]);
    const [product, setProduct] = useState({});
    const [brand, setBrand] = useState({});
    const [brands, setBrands] = useState([]);




    const onGetAllProduct = async () => {
        try {
            const res = await getAllProduct();
            setProducts(res);

        } catch (error) {
            console.log('onGetAllProduct error: ', error);
        }
    }

    const onGetAllProductForListMore = async () => {
        try {
            const res = await getAllProduct();
            return res;

        } catch (error) {
            console.log('onGetAllProductForListMore error: ', error);
        }
    }

    const onGetOneBrand = async (brandID) => {
        try {
            const res = await getOneBrand(brandID);
            console.log('onGetOneBrand: ', res);
            setBrand(res);
            return res;
        } catch (error) {
            console.log('onGetOneBrand error: ', error);
        }
    }

    const onGetOneProduct = async (id) => {
        try {
            const res = await getOneProduct(id);
            setProduct(res);
            return res;
            console.log('onGetOneProduct: ', res);

        } catch (error) {
            console.log('onGetOneProduct error: ', error);
        }
    }

    const onGetImageByProductID = async (productID) => {
        try {
            const res = await getImageByProductID(productID);
            setImages(res);
            // console.log('onGetImageByProductID: ', images);

        } catch (error) {
            console.log('onGetImageByProductID error: ', error);
        }
    }

    const onGetSearchProduct = async (search) => {
        try {
            const res = await getSearchProduct(search);
            setProducts(res);
        } catch (error) {
            console.log('onGetSearchProduct error: ', error);
        }
    }

    const onGetSearchProductForListMore = async (search) => {
        try {
            const res = await getSearchProduct(search);
            return res;
        } catch (error) {
            console.log('onGetSearchProduct error: ', error);
        }
    }

    const onGetSearchProductWithBrand = async (search, brandID) => {
        try {
            const res = await getSearchProductWithBrand(search, brandID);
            return res;
        } catch (error) {
            console.log('getSearchProductWithBrand error: ', error);
        }
    }

    const onGetAllBrand = async () => {
        try {
            const res = await getAllBrand();
            setBrands(res);

        } catch (error) {
            console.log('onGetAllBrand error: ', error);
        }
    }

    const onGetProductByBrandID = async (brandID) => {
        try {
            const res = await getProductByBrandID(brandID);
            return res;
        } catch (error) {
            console.log('onGetAllProduct error: ', error);
        }
    }

    

    return (
        <ProductContext.Provider 
        value={{
            onGetAllProduct, onGetImageByProductID, onGetOneProduct, onGetSearchProduct, onGetOneBrand, onGetAllBrand, onGetProductByBrandID, onGetAllProductForListMore, onGetSearchProductForListMore,onGetSearchProductWithBrand,
            brand,products, product, images, brands
        }}
        >
            {children}
        </ProductContext.Provider>
    )
}
