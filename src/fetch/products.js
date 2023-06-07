import axios from "axios"
import config from "../config/config"
import Cookies from "js-cookie"

const getProducts = async () => {
    const result = await axios.get(
        config.apiUrl + "/api/product",
        {
            withCredentials: true,
            headers: {
                Authorization: config.authenticationConstructor + Cookies.get(config.authCookieName)
            }
        }
    )

    return result.data
}

const deleteProduct = async (product_id) => {
    const result = await axios.delete(
        config.apiUrl + "/api/product/" + product_id,
        {
            withCredentials: true,
            headers: {
                Authorization: config.authenticationConstructor + Cookies.get(config.authCookieName)
            }
        }
    )

    return result.data
}

const getCatalog = async () => {
    const result = await axios.get(
        config.apiUrl + "/api/catalog",
        {
            withCredentials: true,
            headers: {
                Authorization: config.authenticationConstructor + Cookies.get(config.authCookieName)
            }
        }
    )

    return result.data
}

const postToCatalog = async (product_id, warehouse_id, supplier_id, product_count) => {
    const result = await axios.post(
        config.apiUrl + "/api/catalog",
        JSON.stringify({
            product_id: product_id,
            warehouse_id: warehouse_id,
            supplier_id: supplier_id,
            product_count: product_count,
        }),
        {
            withCredentials: true,
            headers: {
                Authorization: config.authenticationConstructor + Cookies.get(config.authCookieName)
            }
        }
    )

    return result.data
}

const deleteFromCatalog = async (assoc_id) => {
    const result = await axios.delete(
        config.apiUrl + "/api/catalog/" + assoc_id,
        {
            withCredentials: true,
            headers: {
                Authorization: config.authenticationConstructor + Cookies.get(config.authCookieName)
            }
        }
    )

    return result.data
}

export { getProducts, deleteProduct, getCatalog, postToCatalog, deleteFromCatalog}