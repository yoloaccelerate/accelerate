import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
<<<<<<< HEAD
     sessionStorage.getItem('token')
=======
     window.sessionStorage.getItem('token')
>>>>>>> fa15ae34eb4b800a29090a050a34462d4dc4dab2
        ? <Component {...props} />
         : <Redirect to='/login' />
    )} />
  )

export default ProtectedRoute;