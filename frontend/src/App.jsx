import { Navigate, Route, Routes } from "react-router-dom"
import Home from "./views/home/Home"
import Login from "./views/login/Login"
import Signup from "./views/signup/Signup"
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext"

function App() {
  const { authUser } = useAuthContext();

  return (
    <div className="p-4 flex items-center justify-center h-screen">
      <Routes>
        <Route path="/" element={ authUser ? <Home /> : <Navigate to={"/login"} />} />
        <Route path="/login" element={authUser ? <Navigate to='/' /> : <Login />} />
        <Route path="/signup" element={authUser ? <Navigate to='/' /> : <Signup />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
