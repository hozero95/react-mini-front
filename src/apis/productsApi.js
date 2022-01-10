import axios from "axios";

export const getProductsAll = async () => {
    let result = [];

    await axios.get('http://localhost:8000/api/products/all')
        .then(res => {
            result = res.data;
        }, error => {
            alert('등록된 상품이 없습니다.');
        });

    return result;
};

export const getProducts = () => {

};

export const addProducts = () => {

};

export const updateProducts = () => {

};

export const deleteProducts = () => {

};