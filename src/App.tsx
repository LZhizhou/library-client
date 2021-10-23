import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/useAuthContext';
import { SnackBarProvider } from './context/useSnackbarContext';
import './App.css';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Admin from './pages/Admin/Admin';
import React from 'react';


function App() {
  return (

    <BrowserRouter>
      <SnackBarProvider>
        {/* <AuthProvider> */}
        <Switch>
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />

          <ProtectedRoute path="*" exact>
            <Redirect to="/login" />
          </ProtectedRoute>
        </Switch>
        {/* </AuthProvider> */}
      </SnackBarProvider>
    </BrowserRouter>
  );
}

export default App;
