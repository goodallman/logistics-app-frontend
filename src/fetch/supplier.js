import axios from "axios"
import config from "../config/config"
import Cookies from "js-cookie"

const addSupplier = async (
    supplier_name = 0,
    supplier_address = ""
) => {
    const result = await axios.post(
        config.apiUrl + "/api/supplier",
        JSON.stringify({
            supplier_name: supplier_name,
            supplier_address: supplier_address
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

const getSuppliers = async () => {
    const result = await axios.get(
        config.apiUrl + "/api/supplier",
        {
            withCredentials: true,
            headers: {
                Authorization: config.authenticationConstructor + Cookies.get(config.authCookieName)
            }
        }
    )

    return result.data
}

const deleteSupplier = async (supplier_id) => {
    const result = await axios.delete(
        config.apiUrl + "/api/supplier/" + supplier_id,
        {
            withCredentials: true,
            headers: {
                Authorization: config.authenticationConstructor + Cookies.get(config.authCookieName)
            }
        }
    )

    return result.data
}

export {addSupplier, getSuppliers, deleteSupplier}