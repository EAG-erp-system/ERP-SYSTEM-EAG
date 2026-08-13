import { Routes, Route } from "react-router-dom"

// page
import Login from "./Pages/auth/Login"
import DashboardSideBar from "./Pages/DashboardSideBar"

// components
import ProtectedRoute from "./components/ProtectedRoute"
import MainDashboard from "./Pages/MainDashboard"

// layout
import AdminDashboardLayout from "./layouts/AdminDashboardLayout"

function App() {

  return ( 
    <>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<AdminDashboardLayout />}>
            <Route index element={<MainDashboard />}/>
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
