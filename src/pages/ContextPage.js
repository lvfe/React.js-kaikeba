import React, { Component } from "react";
import { ThemeProvider } from "../Context";
import ConsumerPage from "./ConsumerPage";
class ContextPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: {
        themeColor: "red",
      },
    };
  }
  render() {
    const { theme } = this.state;
    return (
      <div>
        <h3>ContextPage</h3>
        {/* {"aa":12} == {"aa":12}  X */}
        {/* value = {this.state.theme correct} */}
        <ThemeProvider value={theme}>
          <ConsumerPage />
        </ThemeProvider>
      </div>
    );
  }
}

export default ContextPage;
