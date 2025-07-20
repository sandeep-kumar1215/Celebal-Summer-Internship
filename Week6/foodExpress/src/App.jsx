import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Cart from "./components/Cart";

import Menu from "./components/Menu";
import Error from "./components/Error";
import { Outlet } from "react-router-dom";
import { createBrowserRouter , RouterProvider } from "react-router-dom";
import { Suspense, lazy } from 'react';
import { Provider } from "react-redux";
import appStore from "./redux/appStore.jsx";
// Lazy load the Instamart component
const Instamart = lazy(() => import('./components/Instamart'));


// Main App Layout
const AppLayout = () => {
  return (
    <Provider store={appStore}>
    <div className="app">
      <Header />
      <Outlet/>
    </div>
  </Provider>
);
};

const approuter=createBrowserRouter([
  {
    path:"/",
    element :<AppLayout/>,

    children:[
      {  path:"/",
        element :<Body/>
      },
      {
        path:"/about",
        element:<About/>
      },
      {
        path:"/contact",
        element:<Contact/>
     }, 
     {
      path:"/menu/:resId",
      element:<Menu/>
     },
     {
      path:"/cart",
      element:<Cart/>
     },
     
     {
      path:"/instamart",
      element:<Suspense fallback={<h2>loading failed</h2>}  > <Instamart/></Suspense>
     }
    
    ],
    errorElement:<Error/>
  }
 

])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
 < RouterProvider router={approuter} />
);
