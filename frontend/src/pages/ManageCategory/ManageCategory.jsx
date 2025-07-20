import "../common/Utill.css";
import Form from "../../components/form/Form";
import List from "../../components/List/List";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";
import { addCategory, deleteCategory } from "../../service/CategoryService";

const ManageCategory = () => {
  const { categories, setCategories } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name : "",
    description: "",
    bgColor : "#ffffff"
  });
  const [image, setImage] = useState(null);
  const inputFields = [
    {
      type : "text",
      name : "name",
      label : "Category Name",
      placeholder : "Enter category name",
      required : true,
    },
    {
      type : "textarea",
      name : "description",
      label : "Description",
      placeholder : "Enter item description",
      required : true,
    },
    {
      type : "color",
      name : "bgColor",
      label : "Background Color",
      placeholder : "Select item background color",
      required : false,
    }
  ]

  const handleSubmit = async ()=>{
    if(!image){
      toast.error("Please select an image");
      return;
    }
    setLoading(true);
    const categoryFormData = new FormData();
    categoryFormData.append("category", JSON.stringify(formData));
    categoryFormData.append("file", image);
    try{
      const responst = await addCategory(categoryFormData);
      if(responst.status === 201){
        const newCategory = responst.data;
        setCategories(prevCategories => [...prevCategories, newCategory]);
        setFormData({
          name : "",
          description: "",
          bgColor : "#ffffff"
        });
        setImage(null);
        setLoading(false);
        toast.success("Category added successfully");
      }
    }
    catch(e){
      setLoading(false);
      toast.error("Error adding category");
    }
  }
  const handleDelete = async (id) => {
    // Implement delete functionality here
    try{
      await deleteCategory(id);
      setCategories(prevCategories => prevCategories.filter(category => category.categoryId !== id));
      toast.success("Category deleted successfully");
    }catch(e){
      toast.error("Error deleting category");
    }
  };
  return (
    <div className='item-container text-light'>
      <div className="left-column">
        {/* <CategoryForm /> */}
        <Form formTitle="Create New Category" 
          imageInp={true} 
          inputFields={ inputFields } 
          buttonText="Add new Category" 
          formData={formData} 
          setFormData={setFormData} 
          image={image} 
          setImage={setImage} 
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
      <div className="right-column">
        <List title="Category List" data={ categories } deleteItem={ handleDelete }/>
      </div>
    </div>
  )
}

export default ManageCategory