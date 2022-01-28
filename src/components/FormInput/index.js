import React from 'react';

function FormInput({
  isRegister = true,
  errors,
  formTitle,
  register,
  name,
  ...rest
}) {
  const resolveRegister = {};
  if (isRegister) Object.assign(resolveRegister, register(name));
  return (
    <>
      <label htmlFor='title'>{formTitle}</label>
      <input {...rest} {...resolveRegister} />
      {/* {isRegister && errors[name] && (
        <small className="text-danger">{errors[name].message}</small>
      )} */}
    </>
  );
}

export default FormInput;
