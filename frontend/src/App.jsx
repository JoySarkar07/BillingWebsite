import { Navigate, Route, Routes } from 'react-router-dom'
import Menubar from './components/menubar/Menubar'
import Dashboard from './pages/Dashboard/Dashboard'
import Explore from './pages/Explore/Explore'
import ManageUsers from './pages/ManageUsers/ManageUsers'
import ManageItems from './pages/ManageItems/ManageItems'
import ManageCategory from './pages/ManageCategory/ManageCategory'
import Login from "./pages/Login/Login"
import { Toaster } from 'react-hot-toast'
import { useContext, useState } from 'react'
import Orders from './pages/Orders/Orders'
import { AppContext } from './context/AppContext'
import NotFound from './pages/NotFound/NotFound'


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") ? true: false);
  const {auth} = useContext(AppContext);

  const LoginRoute = ({element})=>{
    if(auth.token){
      return <Navigate to={"/"} replace/>;
    }
    return element;
  }

  const ProtectedRoute = ({element, allowedRoles})=>{
    if(!auth.token){
      return <Navigate to={"/login"} replace/>;
    }
    if(allowedRoles && !allowedRoles.includes(auth.role)){
      return <Navigate to={"/"} replace/>;
    }
    return element;
  }

  return (
    <div>
      { isLoggedIn && <Menubar /> }
      <Toaster />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/users" element={<ProtectedRoute element={<ManageUsers />} allowedRoles={["ROLE_ADMIN"]} />} />
        <Route path="/items" element={<ProtectedRoute element={<ManageItems />} allowedRoles={["ROLE_ADMIN"]} />} />
        <Route path="/categories" element={<ProtectedRoute element={<ManageCategory />} allowedRoles={["ROLE_ADMIN"]} />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/login" element={<LoginRoute element={<Login setIsLoggedIn={setIsLoggedIn} />} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App