import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import Form from '../../components/form/Form'
import "./Login.css";
import { login } from '../../service/AuthService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';


const Login = ({
    setIsLoggedIn = false
}) => {
    const { setAuthData } = useContext(AppContext);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email : "",
        password : ""
    })
    const [loading, setLoading] = useState(false);
    const inputFields = [
        {
            type : "text",
            name : "email",
            label : "Email",
            placeholder : "example@gmail.com",
            required : true,
        },
        {
            type : "password",
            name : "password",
            label : "Password",
            placeholder : "***********",
            required : true,
        }
    ]

    const handleSubmit = async ()=>{
        setLoading(true);
        try{
            const response = await login(formData);
            if(response.status === 200){
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("role", response.data.role);
                setIsLoggedIn(true);
                setAuthData(response.data.token, response.data.role);
                toast.success("LoggedIn successfully");
                navigate("/");
            }
        }catch(e){
            toast.error(e.message);
        }
        setLoading(false);
    }
  return (
    <div className='vh-100 loginbox'>
        <img src={assets.loginPage} alt="loginBgImage" className="img"/>
        <div className='form'>
            <Form formTitle="Login" inputFields={inputFields} formData={formData} setFormData={setFormData} onSubmit={handleSubmit} loading={loading} buttonText='Login'/>
        </div>
    </div>
  )
}

export default Login