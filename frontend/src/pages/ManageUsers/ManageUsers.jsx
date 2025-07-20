import { useEffect, useState } from "react";
import Form from "../../components/form/Form";
import List from "../../components/List/List";
import "../common/Utill.css";
import { addUser, deleteUser, getUsers } from "../../service/UserService";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [userData, setUserData] = useState({
    name:"",
    email:"",
    password:"",
    role: "ROLE_USER"
  })
  const inputFields = [
    {
      type : "text",
      name : "name",
      label : "Name",
      placeholder : "John Doe",
      required : true,
    },
    {
      type : "email",
      name : "email",
      label : "Email",
      placeholder : "youremail@example.com",
      required : true,
    },
    {
      type : "password",
      name : "password",
      label : "Password",
      placeholder : "************",
      required : true,
    }
  ]

  useEffect(() => {
    loadData();
  }, [])

  const loadData = async ()=>{
    const response = await getUsers();
    setData(response.data);
  }
  

  const handleSubmit = async ()=>{
    setLoading(true);
    try{
      const userResponse = await addUser(userData);
      if(userResponse.status === 200){
        const newUser = userResponse.data;
        setData(prev=>[...prev,newUser]);
        setUserData(
          {
            name:"",
            email:"",
            password:"",
            role: "ROLE_USER"
          }
        )
        toast.success("User added successfully!!");
      }
    }catch(e){
      toast.error(e.message);
    }finally{
      setLoading(false);
    }
  }

  const removeUser = async (id)=>{
    try{
      await deleteUser(id);
      setData(prev=>prev.filter(user=>user.userId!==id));
      toast.success("User removed successfully!!!");
    }catch(e){
      toast.error(e.message);
    }
  }
  return (
    <div className='item-container text-light'>
      <div className="left-column">
        <Form formTitle="User Form" inputFields={ inputFields } formData={userData} setFormData={setUserData} onSubmit={handleSubmit} loading={loading} buttonText="Add User" />
      </div>
      <div className="right-column">
        <List title="User List" data={data} deleteItem={removeUser}/>
      </div>
    </div>
  )
}

export default ManageUsers