import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {
  Route,
  RouterProvider,
  createRoutesFromElements,
  createBrowserRouter,
} from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './redux/store.js';

//private route
import PrivateRoute from './components/PrivateRoute.jsx';

//Admin Route
import AdminRoute from './pages/Admin/AdminRoute.jsx';
import UserLists from './pages/Admin/UserLists.jsx';
import CategoryList from './pages/Admin/CategoryList.jsx';

import CreateProduct from './pages/Admin/CreateProduct.jsx';
import AllProducts from './pages/Admin/AllProducts.jsx';
import ProductUpdate from './pages/Admin/ProductUpdate.jsx';
import Home from './pages/Home.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';

import AllComment from './pages/Admin/AllComment.jsx';

import Favorites from './pages/Products/Favorites.jsx';
import ProductDetails from './pages/Products/ProductDetails.jsx';

import Cart from './pages/Cart.jsx';
import Shop from './pages/Shop.jsx';
import UserOrder from './pages/User/UserOrder.jsx';

//Auth
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';

import Profile from './pages/User/Profile.jsx';
import Shipping from './pages/Orders/Shipping.jsx';
import PlaceOrder from './pages/Orders/PlaceOrder.jsx';
import Order from './pages/Orders/Order.jsx';

import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import OrderList from './pages/Admin/OrderList.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/favorite" element={<Favorites />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/user-orders" element={<UserOrder />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/order/:id" element={<Order />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="userlist" element={<UserLists />} />
        <Route path="categorylist" element={<CategoryList />} />
        <Route path="createproduct" element={<CreateProduct />} />
        <Route path="allproductslist" element={<AllProducts />} />
        <Route path="orderlist" element={<OrderList />} />
        <Route path="product/update/:_id" element={<ProductUpdate />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="allcomments" element={<AllComment />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PayPalScriptProvider>
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
);
