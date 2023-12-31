import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

// layouts
import RootLayout from "./layout/RootLayout";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Redirect } from "./pages/Redirect";
import Users from "./pages/Users";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import ProfilePage from "./pages/ProfilePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Redirect />} />
      <Route path="admin" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="users" element={<Users />} />
        <Route path="allproducts" element={<Products />} />
        <Route path="addproduct" element={<AddProduct />} />
        <Route path="userprofile" element={<ProfilePage />} />
      </Route>
      <Route path="login" element={<Login />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
