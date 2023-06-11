const FormInput = ({ type, name, error, label,value, ...rest}) => {
  return (
    <>
      <div className="form-floating small-input">
        <input
          {...rest}
          name={name}
          type={type}
          placeholder={label}
          value={value === null ? "" : value} 
          
          className={["form-control", error && "is-invalid"]
            .filter(Boolean)
            .join(" ")}
        />
        <label htmlFor="floatingInput">{label}</label>
        
        <span style={{ color: "red" }}>{error}</span>
      </div>
    </>
  );
};
export default FormInput;
