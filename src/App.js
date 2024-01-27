import { Route,Routes } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import axios from "axios";
import Admin from "./Components/Admin";
import AdminPrivateRoute from "./Components/AdminPrivateRoute";
import Category from "./Components/Category";
import ViewCategory from "./Components/ViewCategory";
import EditCategory from "./Components/EditCategory";
import Products from "./Components/Products";
import ViewProduct from "./Components/ViewProduct";
import EditProduct from "./Components/EditProduct";
import Contact from "./Components/Contact";
import About from "./Components/About";
import ViewCategoriesCollection from "./Components/Collections/ViewCategoriesCollection";
import ViewProductsCollections from "./Components/Collections/ViewProductsCollections";
import ProductDetails from "./Components/Collections/ProductDetails";
import Cart from "./Components/Cart";
import Checkout from "./Components/Checkout";
import ViewOrders from "./Components/ViewOrders";
import Featured from "./Components/Featured";
import WishList from "./Components/WishList";
import Orders from "./Components/Orders";
import ViewOrderItems from "./Components/ViewOrderItems";
import User from "./Components/User";




axios.defaults.baseURL="http://127.0.0.1:8000";
axios.defaults.headers.post['Content-Type']='application/json';
axios.defaults.headers.post['Accept']='application/json';

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token=localStorage.getItem('auth_token');
  config.headers.Authorization= token ? `Bearer ${token}`:'';
  return config;
});

function App() {
  return (
    <>
      <Navbar/>
      <Routes>  
        <Route path='/' Component={Home}/>
        <Route path='/featured' Component={Featured}/>
        <Route path='/contact' Component={Contact}/>
        <Route path='/about' Component={About}/>
        <Route path='/collections' Component={ViewCategoriesCollection}/>
        <Route path="/collections/:slug" element={<ViewProductsCollections/>}/>
        <Route path="/collections/:category/:product" element={<ProductDetails/>}/>

        <Route element={<AdminPrivateRoute/>}>
          <Route path="/admin/profile" element={<Admin/>}/>

          <Route path="/admin/add-category" element={<Category/>} />
          <Route path="/admin/view-category" element={<ViewCategory/>} />
          <Route path='/admin/edit-category/:id' element={<EditCategory/>}/>

          <Route path='/admin/add-product' element={<Products/>} />
          <Route path='/admin/view-product' element={<ViewProduct/>} />
          <Route path='/admin/edit-product/:id' element={<EditProduct/>} />

          <Route path='/admin/view-orders' element={<ViewOrders/>} />
          <Route path='/admin/view-order-items/:id' element={<ViewOrderItems/>} />
        </Route>
        
        <Route path="/user/cart" element={<Cart/>}/>
        <Route path="/user/wishlist" element={<WishList/>}/>
        <Route path="/user/orders" element={<Orders/>}/>
        <Route path="/checkout" element={<Checkout/>} />
        <Route path='/register' Component={Register}/>
        <Route path='/login' Component={Login}/>
        <Route path='/user/profile' Component={User}/>
      </Routes>
    </>
  );
}

export default App;
