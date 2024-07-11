// component import

//Css import
import './index.css';

import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
//library import
import { BrowserRouter, createBrowserRouter, createRoutesFromElements,Route,RouterProvider } from 'react-router-dom';

import { Layout } from './components/Layout';


const router=createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>

    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
     <Toaster/>
     <RouterProvider router={router}/>
  </BrowserRouter>,
)
