import React, { Component } from "react";
import { Form, Input } from "antd";
import createForm from "../components/rc-form/createForm";

@createForm()
class RCFormPage extends Component {
  constructor(props) {
    super(props);
  }
  submit = () => {
    const {
      form: { validateFields, getFieldsValue },
    } = this.props;
    console.log(getFieldsValue());

    validateFields((err, succcall) => {
      if (err) {
        console.log(err);
      } else {
        console.log(succcall);
      }
    });
  };
  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    console.log("in render", this.props);
    return (
      <Form>
        <Form.Item label="姓名">
                 {" "}
          {getFieldDecorator("username", {
            rules: [
              {
                required: true,
                message: "这是必填项",
              },
            ],
          })(<Input placeholder="placeholder" />)}
                 
        </Form.Item>
               
        <Form.Item label="密码">
                 {" "}
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: "这是必填项",
              },
            ],
          })(<Input placeholder="placeholder" />)}
                 
        </Form.Item>
        <Form.Item>
          <button onClick={this.submit}>submit</button>
        </Form.Item>
             
      </Form>
    );
  }
}
export default RCFormPage;
