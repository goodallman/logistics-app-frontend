import axios from "axios"
import config from "../config/config"
import Cookies from "js-cookie"

const addProduct = async (
    productName = "Základní název",
    productPrice = 2000
) => {
    const result = await axios.post(
        config.apiUrl + "/api/product",
        JSON.stringify({
            product_name: productName,
            product_price: productPrice
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

export default addProduct