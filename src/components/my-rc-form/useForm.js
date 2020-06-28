import React, { useRef } from "react";
class FormStore {
  constructor() {
    this.store = {};
    this.callbacks = {};
  }
  getFieldValue = (name) => {
    return this.store[name];
  };
  setFieldsValue = (newstore) => {
    this.store = { ...newstore, ...this.store };
  };
  setCallback = (callback) => {
    this.callbacks = {
      ...this.callbacks,
      ...callback,
    };
  };
  getForm = () => {
    return {
      setCallback: this.setCallback,
      getFieldValue: this.getFieldValue,
      setFieldsValue: this.setFieldsValue,
    };
  };
  validate = () => {
    return true;
  };
  submit = () => {
    let error = this.validate();
    if (error) {
      this.callbacks.onFinish(this.store);
    } else {
      this.callbacks.onFinishFailed(error);
    }
  };
}

const useForm = () => {
  const formRef = useRef();
  if (!formRef.current) {
    let current = new FormStore();
    formRef.current = current;
  }

  return [formRef.current];
};

export default useForm;
