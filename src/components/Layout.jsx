import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import NavBar from "./NavBar";
export function Layout(){
    return (
        <>
        <NavBar/>
        <Outlet/>
        <Footer/> 
        </>
    )
}