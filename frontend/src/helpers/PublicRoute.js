import React from "react";
import { Redirect, Route } from "react-router-dom";

function PublicRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !localStorage.getItem("access_token") ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/main",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default PublicRoute;
