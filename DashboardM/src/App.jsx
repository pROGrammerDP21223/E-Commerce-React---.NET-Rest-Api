
import { Route, Routes } from 'react-router-dom'
import './App.css'

import Header from './Components/Header'
import Login from './Components/Login'
import Dashboard from './Components/Dashboard'
import { useAuth } from './Components/AuthContext'
import ProtectedRoutes from './Components/ProtectedRoutes'
import Edit from './Components/Edit'
import Delete from './Components/Delete'
import Create from './Components/Create'

import Display from './Components/Display'
import Home from './Components/Home'
import Cart from './Components/Cart'
import Checkout from './Components/Checkout'
import Footer from './Components/Footer'
import Contact from './Components/Contact'
import About from './Components/About'

function App() {
 
  const { isLoggedIn } = useAuth();


  return (
    <>
    <Header />

    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/about' element={<About />} />
    <Route path='/contact' element={<Contact />} />
      <Route path="/login" element={<Login />} />
      
<Route
        path="/cart"
        element={
          <ProtectedRoutes isLoggedIn={isLoggedIn}>
            <Cart />
          </ProtectedRoutes>
        }
      />

<Route
        path="/checkout"
        element={
          <ProtectedRoutes isLoggedIn={isLoggedIn}>
            <Checkout />
          </ProtectedRoutes>
        }
      />


        <Route
        path="/dashboard"
        element={
          <ProtectedRoutes isLoggedIn={isLoggedIn}>
            <Dashboard />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/products/view/:productId"
        element={
          <ProtectedRoutes isLoggedIn={isLoggedIn}>
            <Display />
          </ProtectedRoutes>
        }
      />
       <Route
        path="/products/edit/:productId"
        element={
          <ProtectedRoutes isLoggedIn={isLoggedIn}>
            <Edit />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/products/delete/:productId"
        element={
          <ProtectedRoutes isLoggedIn={isLoggedIn}>
            <Delete />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/products/create"
        element={
          <ProtectedRoutes isLoggedIn={isLoggedIn}>
            <Create />
          </ProtectedRoutes>
        }
      />
      
    </Routes>
    <Footer />
    
    </>
  )
}

export default App
