import React, { useContext, createContext, useState } from 'react';
import { getAllProduct, getOneProduct, getImageByProductID, getSearchProduct, getOneBrand, getAllBrand, getProductByBrandID, getSearchProductWithBrand, addCart, addCartDetail, getAllCart, getAllCartDetail, getOneCart } from './ProductService';

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

    const onAddCart = async (userID, address, status, total, createAt) => {
        try {
            const res = await addCart(userID, address, status, total, createAt);
            return res;
        } catch (error) {
            console.log('onAddCart error: ', error);
        }
    }

    const onAddCartDetail = async (quantityPurchased, amount, productID, cartID) => {
        try {
            const res = await addCartDetail(quantityPurchased, amount, productID, cartID);
            return res;
        } catch (error) {
            console.log('onAddCartDetail error: ', error);
        }
    }

    const onGetAllCart = async (userID) => {
        try {
            const res = await getAllCart(userID);
            return res;
        } catch (error) {
            console.log('onGetAllCart error: ', error);
        }
    }

    const onGetAllCartDetail = async (cartID) => {
        try {
            const res = await getAllCartDetail(cartID);
            return res;
        } catch (error) {
            console.log('onGetAllCartDetail error: ', error);
        }
    }

    const onGetOneCart = async (cartID) => {
        try {
            const res = await getOneBrand(cartID);
            return res;
        } catch (error) {
            console.log('onGetOneCart error: ', error);
        }
    }

    

    return (
        <ProductContext.Provider 
        value={{
            onGetAllProduct, onGetImageByProductID, onGetOneProduct, onGetSearchProduct, onGetOneBrand, onGetAllBrand, onGetProductByBrandID, onGetAllProductForListMore, onGetSearchProductForListMore,onGetSearchProductWithBrand, onAddCart, onAddCartDetail, onGetAllCart, onGetAllCartDetail, onGetOneCart,
            brand,products, product, images, brands
        }}
        >
            {children}
        </ProductContext.Provider>
    )
}
