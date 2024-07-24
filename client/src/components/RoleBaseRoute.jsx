import React from "react";
import { Route, Redirect } from "react-router-dom";
import useAuthorization from "./useAuthorization";

const RoleBasedRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const isAuthorized = useAuthorization(allowedRoles);

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthorized ? (
          <Component {...props} />
        ) : (
          <Redirect to='/unauthorized' />
        )
      }
    />
  );
};

export default RoleBasedRoute;
