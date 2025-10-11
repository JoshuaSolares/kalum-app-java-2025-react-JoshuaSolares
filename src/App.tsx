import { CssBaseline } from '@mui/material'
import './App.css'
import { AppBarMenu } from './components/layout/AppBarMenu'
import { useState } from 'react'
import { SideNav } from './components/layout/SideNav';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { LoginForm } from './components/auth/LoginForm';
import Swal from 'sweetalert2';
import { CareerList } from './components/careers/CareerList';
import { useAuth } from './hooks/useAuth';
import { ProtectedRoute } from './routes/ProtectedRoute';

function App() {
  const { isAuthenticated, logout } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const handleDrawerToggle = () => setDrawerOpen(!drawerOpen);

  const handleLogout = () => {
    Swal.fire({
      title: "Logout",
      text: "Esta seguro de cerrar Sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si!"
    }).then((result) => {
      if (result.isConfirmed) {
        logout()
        window.location.href = '/login'
      }
    });
  }

  return (
    <Router>
      <CssBaseline />
      {isAuthenticated && (
        <>
          <AppBarMenu onMenuClick={handleDrawerToggle} onLogout={handleLogout}></AppBarMenu>
          <SideNav open={drawerOpen} onClose={handleDrawerToggle}></SideNav>
        </>
      )}
      <Routes>
        <Route path='/login' element={<LoginForm onLoginSuccess={() => window.location.href = '/careers'} />} />
        <Route path='/careers' element={
          <ProtectedRoute>
            <CareerList />
          </ProtectedRoute>      
        } />
        <Route path='/' element={<Navigate to="/careers" />} />
      </Routes>
    </Router>
  )
}
export default App