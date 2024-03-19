import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/UserSide/Home";
import Profile from "./components/UserSide/Profile";
import Login from "./components/UserSide/Login";
import Signup from "./components/UserSide/Signup";
import PrivateRoute from "./components/UserSide/PrivateRoute";
import Admin from "./components/AdminSide/Admin";
import AdminHome from "./components/AdminSide/AdminHome";
import AdminLogin from "./components/AdminSide/AdminLogin";
import AdminDashboard from "./components/AdminSide/AdminDashboard";
import AdminAddUser from "./components/AdminSide/AdminAddUser";
import UpdateUsers from "./components/AdminSide/UpdateUsers";

function App() {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path:'/signup',
      element:<Signup/>
    },

    // Its private routes
    {
      path:'',
      element:<PrivateRoute/>,
      children:[
        {
          path:'/profile',
          element:<Profile/>
        },
        {
          path:'/home',
          element:<Home/>
        },
      ]
    },
    
    // Its admin routes
    {
      path:'/admin',
      element:<AdminLogin/>
    },
    {
     path:'/admin',
     element:<Admin/>,
     children:[
      {
        path:'home',
        element:<AdminHome/>  
      },
      {
        path:'dashboard',
        element:<AdminDashboard/>,
     
      },
      {
        path:'add-user',
        element:<AdminAddUser/>
      },
      {
        path:'get-update-user/:id',
        element:<UpdateUsers/>
      }
      
       
     ]
    },

  ]);
  return (
    <>
    <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
