import { Routes, Route } from "react-router-dom"

// page
import Login from "./Pages/auth/Login"
import DashboardSideBar from "./Pages/DashboardSideBar"

function App() {

  return ( 
    <>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/dashboard" element={<DashboardSideBar />}/>
      </Routes>
    </>
  )
}

export default App
