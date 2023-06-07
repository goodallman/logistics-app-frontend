import Katalog from "./katalog";
import Products from "./products";
import Suppliers from "./suppliers";
import Login from "./user/login";
import Register from "./user/register";
import Warehouses from "./warehouses";

const routes = [
    {
        name: "Produkty",
        component: <Products />,
        path: "/products",
        type: "main"
    },
    {
        name: "Sklady",
        component: <Warehouses />,
        path: "/warehouses",
        type: "main"
    },
    {
        name: "Dodavatelé",
        component: <Suppliers />,
        path: "/suppliers",
        type: "main"
    },
    {
        name: "Login",
        component: <Login />,
        path: "/login",
        type: "secondary"
    },
    {
        name: "Registrace",
        component: <Register />,
        path: "/register",
        type: "secondary"
    },
    {
        name: "Katalog",
        component: <Katalog />,
        path: "/catalog",
        type: "secondary"
    },
    {
        name: "Not found",
        component: <>Not found: 404</>,
        path: "*",
        type: "secondary"
    }
]

export default routes