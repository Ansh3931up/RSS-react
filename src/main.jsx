// component import

//Css import
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
//library import
import {  createBrowserRouter, createRoutesFromElements,Route,RouterProvider } from 'react-router-dom';

import { store } from './app/store';
import Aboutpage from './components/Aboutpage';
import BlogDescriptionpage from './components/BlogDescriptionpage';
import BlogList from './components/BlogPages/BlogList';
import Contactpage from './components/Contactpage';
import Deniedpage from './components/Deniedpage';
import HomeLayout from './components/HomeLayout';
import { Layout } from './components/Layout';
import Loginpage from './components/Loginpage';
import Notfoundpage from './components/Notfoundpage';
import Signup from './components/Signup';


const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route path="" element={<HomeLayout/>}/>
      <Route path='about' element={<Aboutpage/>}/>
      <Route path='signup' element={<Signup/>}/>
      <Route path='Login' element={<Loginpage/>}/>
      <Route path='updates' element={<BlogList/>}/>
      <Route path='contact' element={<Contactpage/>}/>
      <Route path='denied' element={<Deniedpage/>}/>
      <Route path='updates/description' element={<BlogDescriptionpage/>}/>
      {/* <Route path='newsletter' element={<NewsLetter/>}/> */}
    
      {/* <Route path='contact' element={<Contact/>}/> */}
      <Route path='*' element={<Notfoundpage/>}/>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
     <Toaster/>
     <RouterProvider router={router}/>
  </React.StrictMode>
  </Provider>,
)
