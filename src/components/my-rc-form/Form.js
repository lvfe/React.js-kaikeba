import React from "react";
import FieldContext from "./FieldContext";
import useForm from "./useForm";
const Form = (props) => {
  const [formRef] = useForm(props.form);
  console.log("debug", formRef);

  formRef.setCallback({
    onFinish: props.onFinish,
    onFinishFailed: props.onFinishFailed,
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formRef.submit();
      }}
    >
      <FieldContext.Provider value={formRef}>
        {props.children}
      </FieldContext.Provider>
    </form>
  );
};

export default Form;
