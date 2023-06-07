import axios from "axios"
import config from "../config/config"
import Cookies from "js-cookie"

const addWarehouse = async (
    supplier_id = 0,
    warehouse_address = ""
) => {
    const result = await axios.post(
        config.apiUrl + "/api/warehouse",
        JSON.stringify({
            supplier_id: supplier_id,
            warehouse_address: warehouse_address
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

const getWarehouses = async () => {
    const result = await axios.get(
        config.apiUrl + "/api/warehouse",
        {
            withCredentials: true,
            headers: {
                Authorization: config.authenticationConstructor + Cookies.get(config.authCookieName)
            }
        }
    )

    return result.data
}

const deleteWarehouse = async (warehouse_id) => {
    const result = await axios.delete(
        config.apiUrl + "/api/warehouse/" + warehouse_id,
        {
            withCredentials: true,
            headers: {
                Authorization: config.authenticationConstructor + Cookies.get(config.authCookieName)
            }
        }
    )

    return result.data
}

export {addWarehouse, getWarehouses, deleteWarehouse}