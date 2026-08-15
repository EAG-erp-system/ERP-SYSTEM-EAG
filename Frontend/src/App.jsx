import { Routes, Route } from "react-router-dom"

// page
import Login from "./Pages/auth/Login"

// components
import ProtectedRoute from "./components/ProtectedRoute"
import MainDashboard from "./Pages/MainDashboard"
import AttendanceGrid from "./Pages/AttendanceGrid"
import PayrollManagement from "./Pages/PayrollManagement"
import EmployeeManagement from "./Pages/EmployeeManagement"
import EmployeeDashboard from "./Pages/EmployeeDashboard"
import PayslipView from "./Pages/PayslipView"

// layout
import AdminDashboardLayout from "./layouts/AdminDashboardLayout"

function App() {

  return ( 
    <>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/login" element={<Login />}/>
        <Route element={<ProtectedRoute />}> 
          <Route path="/dashboard" element={<AdminDashboardLayout />}>
            <Route index element={<MainDashboard />}/>
            <Route path="personal" element={<EmployeeDashboard />}/>
            <Route path="payslip" element={<PayslipView />}/>
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["ADMIN", "HR"]} />}>
            <Route path="/attendance" element={<AdminDashboardLayout />}><Route index element={<AttendanceGrid />}/></Route>
            <Route path="/payroll" element={<AdminDashboardLayout />}><Route index element={<PayrollManagement />}/></Route>
            <Route path="/employees" element={<AdminDashboardLayout />}><Route index element={<EmployeeManagement />}/></Route>
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
