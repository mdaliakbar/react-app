import React from 'react';
import Layout from './components/Layout';
import Result from './pages/Result';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Login from "./pages/Login"
import Quiz from './pages/Quiz';
import './styles/App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext';
import PublicRoute from './pages/PublicRoute';
import PrivateRoute from './pages/PrivateRoute';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <PublicRoute exact path="/signup" component={Signup} />
            <PublicRoute exact path="/login" component={Login} />
            <PrivateRoute exact path="/quiz/:id" component={Quiz} />
            <PrivateRoute exact path="/result/:id" component={Result} />
          </Switch>
        </Layout>
      </AuthProvider>
    </Router>
  )
}
