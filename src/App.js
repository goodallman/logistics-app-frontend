import React, { useEffect, useState } from 'react'
import { Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import routes from './pages/routeList'
import { checkLogin } from './fetch/login'
import MainLayout from './components/mainContainer'

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [loginCheckStatus, setLogInCheckStatus] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()

    const loading = async() => {
        const data = await checkLogin()

        if(data.loggedIn == true){
            setLoggedIn(true)
            if(location.pathname == "/login" || location.pathname == "/"){
                navigate("/products")
            }
        }

        if(data.loggedIn == false){
            if(data.status !== undefined){
                if(location.pathname !== "/register"){
                    navigate("/register")
                }
            }else{
                if(location.pathname !== "/login"){
                    navigate("/login")
                }
            }
        }

        setLogInCheckStatus(true)
    }
    
    useEffect(() => {
        loading()
    }, [location])

    useEffect(() => {
        document.title = "Logistická aplikace"
    }, [])

    return (
        <>
            {
                loginCheckStatus ? (
                    loggedIn ? (
                        <MainLayout>
                            <Routes>
                                {
                                    routes.map((element, key) => {
                                        return <Route key={"route-index-" + key} element={element.component} path={element.path} />
                                    })
                                }
                            </Routes>
                        </MainLayout>
                    ) : (
                        <Routes>
                            {
                                routes.map((element, key) => {
                                    return <Route key={"route-index-" + key} element={element.component} path={element.path} />
                                })
                            }
                        </Routes>
                    )
                ) : (
                    <div 
                        style={{
                            width: "100vw", 
                            height: "100vh", 
                            fontSize: "2rem", 
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center"
                        }}
                    >
                        Loading...
                    </div>
                )
            }
        </>
    )
}

export default App