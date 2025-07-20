
const Form = ({
    formTitle,
    formData,
    setFormData,
    image,
    setImage,
    imageInp = false,
    inputFields = [],
    onSubmit,
    loading = false,
    buttonText = 'Submit'
}) => {
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };

  return (
    <div style={{minHeight: '100%'}}>
        <div className="card shadow h-100">
            <div 
                className="card-header py-3 text-white" 
                style={{ backgroundColor: '#563d7c' }}
            >
                <h4 className="mb-0">{ formTitle || 'Enter form title' }</h4>
            </div>
            <div className="card-body overflow-y-auto">
                <form onSubmit={handleSubmit}>
                {/* Image Upload Field */}
                { imageInp && 
                <div className="mb-4 text-center">
                    <div className="d-flex align-items-center justify-content-center">
                    <div 
                        className="rounded-circle overflow-hidden bg-light" 
                        style={{ 
                        width: '70px', 
                        height: '70px', 
                        border: `3px solid ${formData.categoryColor || ''}` 
                        }}
                    >
                        {image ? (
                        <img 
                            src={URL.createObjectURL(image) || ""} 
                            alt="Preview" 
                            className="w-100 h-100 object-fit-cover"
                        />
                        ) : (
                        <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                            <i className="bi bi-image text-muted" style={{ fontSize: '3rem' }}></i>
                        </div>
                        )}
                    </div>
                    <label 
                        htmlFor="imageUpload" 
                        className="btn btn-sm btn-outline-primary mt-3 rounded-pill px-3"
                    >
                        <i className="bi bi-upload me-2"></i>
                        {image ? 'Change Image' : 'Upload Image'}
                    </label>
                    <input
                        type="file"
                        id="imageUpload"
                        accept="image/*"
                        onChange={(e)=>{setImage(e.target.files[0])}}
                        className="d-none"
                    />
                    </div>
                </div>
                }
                {
                    inputFields.map((field, index) => (
                        <div className="mb-4" key={index}>
                            <label htmlFor={field.name} className="form-label">{field.label}</label>
                            {
                                 (() => {
                                    switch(field.type) {
                                        case 'textarea':
                                            return (
                                                <textarea
                                                    id={field.name}
                                                    name={field.name}
                                                    value={formData[field.name]}
                                                    onChange={handleChange}
                                                    rows="4"
                                                    className="form-control py-2"
                                                    placeholder={field.placeholder}
                                                    required={field.required}
                                                ></textarea>
                                            );
                                        case 'select':
                                            return (
                                                <select
                                                    id={field.name}
                                                    name={field.name}
                                                    value={formData[field.name]}
                                                    onChange={handleChange}
                                                    className="form-control py-2"
                                                    required={field.required}
                                                >
                                                    {field.options.map(option => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            );
                                        case 'checkbox':
                                            return (
                                                <input
                                                    type="checkbox"
                                                    id={field.name}
                                                    name={field.name}
                                                    checked={formData[field.name]}
                                                    onChange={handleChange}
                                                    className="form-check-input"
                                                />
                                            );
                                        default:
                                            return (
                                                <input
                                                    type={field.type}
                                                    id={field.name}
                                                    name={field.name}
                                                    value={formData[field.name]}
                                                    onChange={handleChange}
                                                    className="form-control py-2"
                                                    placeholder={field.placeholder}
                                                    required={field.required}
                                                />
                                            );
                                    }
                                })()
                            }
                        </div>
                    ))
                }
                {/* Submit Button */}
                <div className="d-grid">
                    <button 
                    type="submit" 
                    disabled={loading}
                    className="btn py-2 text-white"
                    style={{ 
                        backgroundColor: '#563d7c',
                        borderColor: '#563d7c'
                    }}
                    >
                    { loading ? "Loading..." : buttonText }
                    </button>
                </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Form