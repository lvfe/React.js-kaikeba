import React from "react";
import LifeCycle from "./LifeCycle";
import invariant from "invariant";
import RouterContext from "./Context";

const Prompt = (props) => {
  const { when = true, message } = props;
  return (
    <RouterContext.Consumer>
      {(context) => {
        if (!when) {
          return null;
        }

        const enable = (message) => {
          if (this.unblock) this.unblock();

          this.unblock = context.router.history.block(message);
        };

        const disable = () => {
          if (this.unblock) {
            this.unblock();
            this.unblock = null;
          }
        };
        return (
          <LifeCycle
            onMount={(self) => {
              console.log(self, "onMount");
              invariant(
                context.router,
                "You should not use <Prompt> outside a <Router>"
              );
              if (when) enable(message);
            }}
            onUnmount={(self) => {
              console.log(self, "onUnMount");
              disable();
            }}
          ></LifeCycle>
        );
      }}
    </RouterContext.Consumer>
  );
};

export default Prompt;
