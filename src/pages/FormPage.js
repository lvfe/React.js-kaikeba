import React, { Component, useForm, useEffect } from "react";
import { Form, Button, Input } from "antd";

const FormItem = Form.Item;
const nameRules = { required: true, message: "my name" };
const passwordRules = { required: true, message: "my password" };
const FormPage = (props) => {
  const [form] = Form.useForm();
  const onFinish = (val) => {
    console.log("finish", val);
  };
  const onFinishFailed = (val) => {
    console.log("failed", val);
  };
  useEffect(() => {
    form.setFieldsValue({ username: "default" });
    console.log("form", form);
  }, []);
  return (
    <div>
      <h3>Antd Form page</h3>
      <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
        <FormItem name="username" label="username" rules={[nameRules]}>
          <Input placeholder="username placeholder" />
        </FormItem>
        <FormItem name="password" label="password" rules={[passwordRules]}>
          <Input placeholder="password placeholder" />
        </FormItem>
        <FormItem>
          <Button type="primary" size="large" htmlType="submit">
            Submit
          </Button>
        </FormItem>
      </Form>
    </div>
  );
};

export default FormPage;

// class FormPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//     this.formRef = React.createRef();
//     this.nameRules = { required: true, message: "my name" };
//     this.passwordRules = { required: true, message: "my password" };
//   }

//   componentDidMount() {
//     this.formRef.current.setFieldsValue({ username: "default" });
//     console.log("form", this.formRef);
//   }
//   onFinish = (val) => {
//     console.log("finish", val);
//   };
//   onFinishFailed = (val) => {
//     console.log("failed", val);
//   };
//   render() {
//     return (
//       <div>
//         <h3>Antd Form page</h3>
//         <Form
//           ref={this.formRef}
//           onFinish={this.onFinish}
//           onFinishFailed={this.onFinishFailed}
//         >
//           <Form.Item name="username" label="username" rules={[this.nameRules]}>
//             <Input placeholder="username placeholder" />
//           </Form.Item>
//           <Form.Item
//             name="password"
//             label="password"
//             rules={[this.passwordRules]}
//           >
//             <Input placeholder="password placeholder" />
//           </Form.Item>
//           <Form.Item>
//             <Button type="primary" size="large" htmlType="submit">
//               Submit
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     );
//   }
// }
// export default FormPage;
