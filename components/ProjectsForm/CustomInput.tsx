import React from "react";

const CustomInput = ({
  name,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
}:any) => {
  return (
    <div className="py-2">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border-2 ${
          error ? "border-red-500" : "border-grey"
        } text-sm rounded py-2 px-2 w-[100%]`}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">Please enter {name}</p>
      )}
    </div>
  );
};

export default CustomInput;
