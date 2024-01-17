import { Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import HomePage from './pages/home/HomePage';
import MyProfile from './pages/profile/MyProfile';
import Addresses from './pages/profile/Addresses';
import AllProducts from './pages/products/AllProducts';
import AddProducts from './pages/products/AddProduct';
import AllUser from './pages/users/AllUser';
import CartPage from './pages/cart/CartPage';
import { useSelector } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import SingleProduct from './pages/products/SingleProduct';
import { Toaster } from 'react-hot-toast';
import Login from "./features/login/Login"

function App() {
  const userState = useSelector((state) => state.userState)
  console.log(userState, "userState")
  return (
    <div className="App">
      <Toaster position='bottom-right' />
      {userState?.isLoggedIn && <Sidebar />}
      <Routes>
        <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/me" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
        <Route path="/profile/addresses" element={<ProtectedRoute><Addresses /></ProtectedRoute>} />
        <Route path='/products/all' element={<ProtectedRoute><AllProducts /></ProtectedRoute>} />
        <Route path='/product/'>
          <Route path=':id' element={<ProtectedRoute><SingleProduct /></ProtectedRoute>} />
        </Route>

        <Route path='/products/add' element={<ProtectedRoute><AddProducts /></ProtectedRoute>} />
        <Route path='/users/all' element={<ProtectedRoute><AllUser /></ProtectedRoute>} />
        <Route path='/cart' element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
      </Routes>
    </div>
  );
}


export default App;
