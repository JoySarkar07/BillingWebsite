

const ProductView = ({
    data,
    onAdd
}) => {
  return (
    <div 
        className="list-group-item fw-light d-flex justify-content-between align-items-center p-3 rounded-3 shadow-sm bg-opacity-10"
        style={{ backgroundColor: '#010e10ff' }}
        >
        <img 
          src={data.imgUrl || assets.user} 
          alt={data.name} 
          className="img-thumbnail rounded-circle border-white shadow me-3"
          style={{ width: '64px', height: '64px', objectFit: 'cover' }}
          />
        <div className="flex-grow-1">
            <h5 className="mb-1 fw-semibold">{data.name}</h5>
            <span className="fw-bold"><i className="bi bi-currency-rupee"></i>{data.price}</span>
        </div>
        <div className='d-flex flex-column justify-content-between align-items-center gap-2'>
            <i className="bi bi-cart-plus text-warning"></i>
            <button className='bg-success rounded-2' onClick={()=>onAdd(data)}>
              <i className="bi bi-plus"></i>
            </button>
        </div>
    </div>
  )
}

export default ProductView