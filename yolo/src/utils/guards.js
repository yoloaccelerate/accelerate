import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
     sessionStorage.getItem('token')
        ? <Component {...props} />
         : <Redirect to='/login' />
    )} />
  )

export default ProtectedRoute;