import Body from "./components/Body";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import PrivateRoute from "./components/PrivateRoute";

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
    }
  ]);
  return (
    <>
    <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
