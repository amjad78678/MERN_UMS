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
    {
      path:'/home',
      element:<Home/>
    },
    // Its private routes
    {
      path:'',
      element:<PrivateRoute/>,
      children:[
        {
          path:'/profile',
          element:<Profile/>
        }
      ]
    },
    
    // Its admin routes
    {
     path:'/admin',
     element:<Admin/>,
     children:[
      {
        path:'/admin',
        element:<AdminLogin/>
      },
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
