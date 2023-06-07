import axios from "axios"
import config from "../config/config"

const registerUser = async (
    username = "Základní název",
    password = "123456",
    email = "john@doe.com"
) => {
    const result = await axios.post(
        config.apiUrl + "/api/user",
        JSON.stringify({
            username: username,
            password: password,
            email: email
        }),
        {
            withCredentials: true
        }
    )

    return result.data
}

export default registerUser