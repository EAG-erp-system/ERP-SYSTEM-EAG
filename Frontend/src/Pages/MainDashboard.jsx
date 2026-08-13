
import { useOutletContext } from "react-router-dom"

function MainDashboard() {
    const { user } = useOutletContext();

    return(<><h1>{user?.full_name || "admin"}</h1></>)
}

export default MainDashboard