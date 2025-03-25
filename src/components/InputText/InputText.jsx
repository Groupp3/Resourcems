const InputText = ({ label, name, type = "text", value, onChange, placeholder }) => {
    return (
      <div className="input-container">
        {label && <label className="input-label" htmlFor={name}>{label}</label>}
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="input-field"
          required
        />
      </div>
    );
  };
  
  export default InputText;
  