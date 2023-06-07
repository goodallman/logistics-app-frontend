import { useState } from "react"
import { styled } from "styled-components"
import Input from "../../components/input"
import PageTitle from "../../components/pageTitle"
import Button from "../../components/button"
import registerUser from "../../fetch/register"
import { useNavigate } from "react-router-dom"

const Container = styled("form")`
    width: 30vw;

    padding: 10vh 5rem;

    margin: 0 auto auto auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

const Register = () => {
    const [userData, setUserData] = useState({
        username: "",
        email: "",
        password: ""
    })

    const navigator = useNavigate()

    const handleRegister = async() => {
        const data = await registerUser(userData.username, userData.password, userData.email)
        if(data.status == "001"){
            alert("Registrace úspěšná")
            navigator(0)
        }
    }

    return (
        <Container onSubmit={(e) => {e.preventDefault(); handleRegister()}}>
            <PageTitle>Registrace prvního uživatele systému</PageTitle>
            <Input 
                label="Vaše jméno"
                onChange={(e) => {setUserData({...userData, username: e.target.value})}}
                value={userData.username}
                required
                type="text"
            />
            <Input 
                label="Email"
                onChange={(e) => {setUserData({...userData, email: e.target.value})}}
                value={userData.email}
                required
                type="email"
            />
            <Input 
                label="Heslo"
                onChange={(e) => {setUserData({...userData, password: e.target.value})}}
                value={userData.password}
                required
                type="password"
            />
            <div style={{width: "fit-content"}}>
                <Button>Přihlásit</Button>
            </div>
        </Container>
    )
}

export default Register