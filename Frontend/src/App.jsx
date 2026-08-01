import { Routes, Route } from "react-router-dom"
import AdminDashboard from "./Pages/AdminDashboard"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<AdminDashboard/>}/>
      </Routes>
    </>
  )
}

export default App
