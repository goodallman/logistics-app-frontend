import { styled } from "styled-components"
import Input from "../../components/input"
import PageTitle from "../../components/pageTitle"
import Button from "../../components/button"
import { useState } from "react"
import { loginUser } from "../../fetch/login"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import config from "../../config/config"

const Container = styled("form")`
    width: 30vw;

    padding: 10vh 5rem;

    margin: 0 auto auto auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })

    const [loading, setLoading] = useState(false)
    const navigator = useNavigate()

    const handleLogin = async() => {
        setLoading(true)
        const data = await loginUser(credentials.email, credentials.password)

        if(data.status == "400"){
            alert("Špatné uživatelské údaje")
        }

        if(data.status == "001"){
            Cookies.set(config.authCookieName, data.token)
            alert("Úspěšně přihlášen!")
            navigator(0)
        }

        setLoading(false)
    }

    return (
        <Container onSubmit={(e) => {e.preventDefault(); handleLogin()}}>
            <PageTitle>Přihlášení</PageTitle>
            <Input 
                label="Email"
                value={credentials.email}
                required
                type="email"
                onChange={(e) => {setCredentials({...credentials, email: e.target.value})}}
            />
            <Input 
                label="Heslo"
                value={credentials.password}
                type="password"
                required
                onChange={(e) => {setCredentials({...credentials, password: e.target.value})}}
            />
            {
                loading ? (
                    <div>
                        Zpracovávám...
                    </div>
                ) : (
                    <div style={{width: "fit-content"}}>
                        <Button>Přihlásit</Button>
                    </div>
                )
            }
        </Container>
    )
}

export default Login