import { Outlet, useLocation } from "react-router-dom";

export default function PublicLayout () {
    const location = useLocation();
    return (
        <Outlet key={location.pathname}/>
    )
}