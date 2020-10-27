import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
<<<<<<< HEAD
     sessionStorage.getItem('token')
=======
     localStorage.getItem('token')
>>>>>>> a99d4e44db915ab24bd957a18280f4c4cbc5e7d1
        ? <Component {...props} />
         : <Redirect to='/login' />
    )} />
  )

export default ProtectedRoute;