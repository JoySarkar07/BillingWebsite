import PriceTag from "../priceTag/PriceTag";
import { assets } from "../../assets/assets";

const ListItem = ({
    data,
    width = '100%',
    onDelete,
    onSelect,
    selectedCategory,
}) => {
  const handleDelete = (id) => {
    // Implement delete functionality here
    onDelete(id);
  };

  const handleSelect = (name)=>{
    onSelect(name);
  }
  return (
    <div 
        className={`list-group-item d-flex justify-content-between align-items-center p-3 mb-3 rounded-3 shadow-sm bg-opacity-10 `}
        style={{ backgroundColor: data.bgColor || '#aaf1f9ff', width, minWidth: width, cursor:`${onSelect && "pointer"}` }}
        onClick={()=>handleSelect(data.name)}
        >
        <img 
          src={data.imgUrl || assets.user} 
          alt={data.name} 
          className="img-thumbnail rounded-circle border-white shadow me-3"
          style={{ width: '64px', height: '64px', objectFit: 'cover' }}
          />
        <div className="flex-grow-1">
            <h5 className="mb-1 fw-semibold">{data.name}</h5>
            {
              data.email && <p className="mb-0 text-muted small">{ data.email }</p>
            }
            {
              data.items && <p className="mb-0 small text-light">Items : { data.items }</p>
            }
            {
              data.categoryName && <>
                <p className="mb-0 text-muted small">Category : { data.categoryName }</p>
                <PriceTag price={data.price}/>
              </>
            }
        </div>
        {
          onDelete && <div>
                        <button type="button" className="btn btn-danger"><i className="bi bi-trash" onClick={() => handleDelete(data.itemId || data.categoryId || data.userId)}></i></button>
                      </div>
        }
        {selectedCategory===(data.name==="All"?"":data.name) && <span className="position-absolute top-0 end-0 m-2"><i className="bi bi-check-circle-fill text-success"></i></span>}
    </div>
  )
}

export default ListItem