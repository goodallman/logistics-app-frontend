import { styled } from "styled-components"
import routes from "../pages/routeList"
import { Link, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import config from "../config/config"

const Container = styled("div")`
    display: flex;

    max-width: 100%;
    max-height: 100%;
`

const Sidebar = styled("div")`
    width: 15rem;

    height: 100vh;

    display: flex;
    flex-direction: column;
    padding: 1rem 0.5rem 1rem 0.5rem;

    border-right: 1px solid #28282840;
    gap: 0.5rem;
    box-sizing: border-box;
`

const MenuItem = styled(Link)`
    text-decoration: none;
    color: ${props => props.fontColor == undefined ? "#282828" : props.fontColor};

    padding: 1rem 1.5rem;
    border-radius: 10px;

    border: 1px solid #28282840;

    background-color: ${props => props.background == undefined ? "#ffffff" : props.background};

    transition: all 0.3s ease-in-out;
    display: flex;

    &:hover{
        background-color: ${props => props.hoverBackground == undefined ? "#f1f1f1" : props.hoverBackground};
    }
`

const MenuItemEmpty = styled("div")`
    text-decoration: none;
    color: ${props => props.fontColor == undefined ? "#282828" : props.fontColor};

    padding: 1rem 1.5rem;
    border-radius: 10px;

    border: 1px solid #28282840;

    background-color: ${props => props.background == undefined ? "#ffffff" : props.background};

    transition: all 0.3s ease-in-out;
    display: flex;
    cursor: pointer;

    &:hover{
        background-color: ${props => props.hoverBackground == undefined ? "#f1f1f1" : props.hoverBackground};
    }
`

const MainLayout = ({
    children
}) => {
    const navigator = useNavigate()

    const logout = () => {
        Cookies.remove(config.authCookieName)
        navigator(0)
    }

    return (
        <Container>
            <Sidebar>
                {
                    routes.map((element, key) => {
                        if(element.type == "main"){
                            return <MenuItem to={element.path}>{element.name}</MenuItem>
                        }

                        return <></>
                    })
                }
                <div style={{
                    margin: "auto 0 0 0",
                    width: "100%"
                }}>
                    <MenuItemEmpty onClick={() => {logout()}} fontColor={"#ffffff"} background={"#BC011D"} hoverBackground={"#DE233F"}>Odhlásit</MenuItemEmpty>
                </div>
            </Sidebar>
            {children}
        </Container>
    )
}

export default MainLayout