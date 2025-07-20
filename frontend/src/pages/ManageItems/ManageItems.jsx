import "../common/Utill.css";
import Form from "../../components/form/Form";
import List from "../../components/List/List";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { addItem, deleteItem } from "../../service/ItemService";
import toast from "react-hot-toast";

const ManageItems = () => {
  const { items, setItems, categories, setCategories } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
    price: "",
    description: ""
  })
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCategoryOptions = ()=>{
    const options = [
      { value: '', label: '--- Select item ---' },
    ]
    categories.map(category=>{
      options.push({value: category.categoryId, label: category.name})
    })
    return options
  }

  const inputFields = [
    {
      type : "text",
      name : "name",
      label : "Name",
      placeholder : "Enter item name",
      required : true,
    },
    {
      type : "select",
      name : "categoryId",
      label : "Category",
      placeholder : "Enter item Category",
      required : true,
      options : getCategoryOptions()
    },
    {
      type : "number",
      name : "price",
      label : "Price",
      placeholder : "200 $",
      required : true,
    },
    {
      type : "textarea",
      name : "description",
      label : "Description",
      placeholder : "Enter item description",
      required : true,
    }
  ]

  const handleSubmit = async ()=>{
    if(!image){
      toast.error("Please select an image");
      return;
    }
    setLoading(true);
    const data = {...formData,price: Number(formData.price)}
    const itemFormData = new FormData();
    itemFormData.append("item", JSON.stringify(data));
    itemFormData.append("file", image);
    try{
      const responst = await addItem(itemFormData);
      if(responst.status === 201){
        const newitem = responst.data;
        setItems(prevCategories => [...prevCategories, newitem]);
        const updatedCategories = categories.map(category => {
          if (category.categoryId === formData.categoryId) {
            return {
              ...category,
              items: category.items + 1,
            };
          }
          return category;
        });
        setCategories(updatedCategories);
        setFormData({
          name: "",
          categoryId: "",
          price: "",
          description: ""
        });
        setImage(null);
        setLoading(false);
        toast.success("Item added successfully");
      }
    }
    catch(e){
      setLoading(false);
      toast.error("Error adding item");
    }
  }

  const removeItem = async (id)=>{
    try{
      await deleteItem(id);
      let deleted = null;
      setItems(prev=>prev.filter(item=>{
        deleted = item.categoryId;
        return item.itemId!==id
      }))
      const updatedCategory = categories.map(category=>{
        if(category.categoryId === deleted){
          return {
            ...category,
            items : category.items-1,
          }
        }
        return category;
      })
      setCategories(updatedCategory);
      toast.success("Item removed");
    }catch(e){
      toast.error(e.message);
    }
  }
  return (
    <div className='item-container text-light'>
      <div className="left-column overflow-y-auto">
        <Form 
          formTitle="Enter New Item" 
          imageInp={true} 
          inputFields={ inputFields } 
          formData={formData} 
          setFormData={setFormData} 
          image={image} 
          setImage={setImage} 
          loading={loading} 
          onSubmit={handleSubmit} 
          buttonText="Add Item"
        />
      </div>
      <div className="right-column">
        <List title="Item List" data={ items } deleteItem={removeItem} />
      </div>
    </div>
  )
}

export default ManageItems