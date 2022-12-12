import "./App.css";
import UserList from "./pages/userList/UserList";
import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { Outlet } from "react-router-dom";

const AppLayout = ({ admin }) =>
  admin ? (
    <>
    <Topbar/>
      
      <div className="container">
        <Sidebar />
        <Outlet />
      </div>
    </>
  ) : null;
function App() {
  const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root"))?.user || "{}")?.currentUser?.isAdmin ;
  return (
    <BrowserRouter>
      <div className="container2">
        <Routes>
          <Route path="/login" element={<Login />} />
          {admin && (
              <Route element={<AppLayout admin={admin} />}>
              <Route index element={<Home />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/user/:userId" element={<User />} />
              <Route path="/newUser" element={<NewUser />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:productId" element={<Product />} />
              <Route path="/newProduct" element={<NewProduct />} />
            </Route>
          )}
          
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
