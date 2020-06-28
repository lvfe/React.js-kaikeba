import React from "react";
import { Field, useForm, Form } from "./my-rc-form";

const MYRCFormPage = (props) => {
  const [form] = useForm();
  const onFinish = (val) => {
    console.log("finish", val);
  };
  const onFinishFailed = (val) => {
    console.log("failed", val);
  };

  return (
    <div>
      <h3>Antd Form page</h3>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <Field name="username" label="username">
          <input placeholder="username placeholder" />
        </Field>
        <Field name="password" label="password">
          <input placeholder="password placeholder" />
        </Field>
        <Field>
          <button type="primary" size="large">
            Submit
          </button>
        </Field>
      </Form>
    </div>
  );
};

export default MYRCFormPage;
