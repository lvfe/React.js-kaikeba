import React, { Component } from "react";
// 暗号：埃及
const createForm = (props) => (Cmp) => {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {};
      this.options = {};
    }
    getFieldDecorator = (field, { rules }) => (InputCmp) => {
      this.options[field] = rules;
      return React.cloneElement(InputCmp, {
        name: field,
        value: this.state[field],
        onChange: (e) => {
          this.setState({ [field]: e.target.value });
        },
      });
    };
    validateFields = (Callback) => {
      let error = [];
      for (let field in this.options) {
        if (this.options[field][0].required && !this.state[field]) {
          error.push({ [field]: this.options[field] });
        }
      }
      if (error.length == 0) {
        return Callback(null, this.state);
      } else {
        return Callback(error, null);
      }
    };
    getFieldsValue = () => {
      return this.state;
    };
    getForm = () => {
      return {
        form: {
          getFieldDecorator: this.getFieldDecorator,
          getFieldsValue: this.getFieldsValue,
          validateFields: this.validateFields,
        },
      };
    };
    render() {
      return <Cmp {...props} {...this.getForm()} />;
    }
  };
};

export default createForm;
