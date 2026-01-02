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
import { UserList } from './components/users/UserList';
import { DashBoard } from './components/dashboard/Dashboard';
import { AdmissionExamList } from './components/admissionExams/AdmissionExamList';
import { StatusExamenAdmin } from './components/admissionExams/StatusExamenAdmin';
import { FinalizeCandidateProcess } from './components/admissionExams/FinalizeCandidateProcess';


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
        <Route path='/login' element={<LoginForm onLoginSuccess={() => window.location.href = '/dashboard'} />} />
        <Route path='/dashboard' element={
          <DashBoard />
        }>
        </Route>
        <Route path='/careers' element={
          <ProtectedRoute>
            <CareerList />
          </ProtectedRoute>  
        } />
        <Route path='/examenes-admision' element={
          <AdmissionExamList/>
        }
        />
        <Route path='/examenes-admision/:careerId' element={
          <AdmissionExamList />
        }
        />
        <Route path='/candiate/finalize-process/:noExpediente' element={
          <ProtectedRoute>
            <FinalizeCandidateProcess />
          </ProtectedRoute>
        } />
        <Route path='/users' element={
          <ProtectedRoute>
            <UserList />
          </ProtectedRoute>
        } />
        <Route path='/status-examen-admision' element={
          <ProtectedRoute>
            <StatusExamenAdmin />
          </ProtectedRoute>
        } />
        <Route path='/' element={<Navigate to="/dashboard" />} />
      </Routes> 
    </Router>
  )
}
//http://localhost:5173/candiate/finalize-process/EXP-20240011
export default App