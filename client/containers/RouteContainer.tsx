import React, { FunctionComponent } from 'react';
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom';

// ----- Pages
import LoginPage from '../pages/LoginPage';
import LogoutPage from '../pages/LogoutPage';
import RegisterPage from '../pages/RegisterPage';
import MainPage from '../pages/MainPage';
import UserUpdatePage from '../pages/UserUpdatePage';
import NotFoundPage from '../pages/404Page';
import { StoreShape } from '../types';

const RouteContainer: FunctionComponent<any> = (props) => {
  // TODO distinguish between unauthenticated and authenticated routes
  // TODO handle 404 and 500 errors
  const authorizedUser = useSelector((state: StoreShape) => state.authorizedUser);
  const { username, userId } = authorizedUser;
  const isNotAuthorized: boolean = username === undefined || userId === undefined;
  console.log(authorizedUser);

  const AuthorizedRoutes = (
    <>
      <Route path='/account' exact component={ UserUpdatePage }/>
    </>
  );
  const UnauthorizedRoutes = (
    <>
      <Route path='/login' exact component={ LoginPage }/>
      <Route path='/register' exact component={ RegisterPage }/>
    </>
  )

  // NOTE RENDER CONDITIONAL ROUTES LAST
  return (
    <Switch>
      <Route path='/' exact component={ isNotAuthorized ? LoginPage : MainPage }/>
      <Route path='/logout' exact component={ LogoutPage }/>
      { authorizedUser.userId && authorizedUser.username ? AuthorizedRoutes : UnauthorizedRoutes }
      <Route component={ NotFoundPage }/>
    </Switch>
  )
}

export default RouteContainer;