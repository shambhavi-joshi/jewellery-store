import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { Estimate } from './components/Estimate';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Login} />
        <Route path='/login' component={Login} />
        <Route path='/estimate' component={Estimate} />
      </Layout>
    );
  }
}
