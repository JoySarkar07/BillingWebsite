import { useEffect, useState } from "react";
import ListItem from "../listItem/ListItem";

const List = ({ 
    title,
    data,
    deleteItem
 }) => {
    const [searchVal, setSearchVal] = useState("");
    const [filteredData, setFilteredData] = useState(data || []);

    useEffect(() => {
        if(data && data.length > 0 && searchVal.trim() !== ""){
            const filteredData = data.filter(item=>item.name.toLowerCase().includes(searchVal.toLowerCase()));
            setFilteredData(filteredData);
        }
        else{
            setFilteredData(data || []);
        }
    }, [searchVal, data]);

    const handleDelete = async (id) => {
        // Implement delete functionality here
        deleteItem(id);
    };

  return (
    <div className="h-100">
        <div className="card shadow h-100">
            <div className="card-header py-3 text-white" style={{ backgroundColor: '#563d7c' }}>
                <h4 className="mb-0">{title || "Set Title"}</h4>
            </div>
            <div className="input-group p-1">
                <input className="form-control form-control-lg" type="search" placeholder="Search" aria-label="Search" value={searchVal} onChange={(e) => setSearchVal(e.target.value)} />
                <i className="bi bi-search btn btn-primary px-4"></i>
            </div>
            {
                filteredData && filteredData.length > 0 ? (
                    <div className="card-body overflow-y-auto" >  
                    {
                        filteredData.map((item, ind) => (
                            <ListItem key={ind} data={item} onDelete={handleDelete} />
                        ))
                    }
                    </div>
                ) : (
                    <div className="card-body text-center">
                        <p>No items available.</p>
                    </div>
                )
            }
        </div>
    </div>
  );
};

export default List;