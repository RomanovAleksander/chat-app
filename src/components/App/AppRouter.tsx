import React, {FC} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {privateRoutes, publicRoutes} from "../../routes";
import {CHATS_ROUTE, LOGIN_ROUTE} from "../../utils/consts";

const AppRouter: FC<{ isAuthenticated: boolean }> = ({ isAuthenticated }) => {
  return isAuthenticated ? (
    <Switch>
      {privateRoutes.map(({ path, Component }) =>
        <Route key={path} path={path} component={Component} />
      )}
      <Redirect to={CHATS_ROUTE} />
    </Switch>
  ) : (
    <Switch>
      {publicRoutes.map(({ path, Component}) =>
        <Route key={path} path={path} component={Component} exact={true} />
      )}
      <Redirect to={LOGIN_ROUTE} />
    </Switch>
  )
};

export default AppRouter;
