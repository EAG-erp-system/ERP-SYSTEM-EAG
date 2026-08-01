import { Routes, Route } from "react-router-dom"
import Login from "./Pages/auth/Login"

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />}/>
      </Routes>
    </>
  )
}

export default App
