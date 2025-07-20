import "./PriceTag.css";

const PriceTag = ({ price }) => (
  <div 
    className="p-1 my-2 rounded-3 fw-bold fs-5 text-white position-relative overflow-hidden"
    style={{
        height: "15%",
        width: "fit-content",
        background: '#6a11cb',
        boxShadow: '0 0 15px rgba(106, 17, 203, 0.7)',
        zIndex: 1
    }}
  >
    ${price.toFixed(2)}
    <div 
      className="position-absolute top-0 start-0 w-100 h-100"
      style={{
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
        animation: 'shine 2s infinite',
        zIndex: -1
      }}
    />
  </div>
);

export default PriceTag;