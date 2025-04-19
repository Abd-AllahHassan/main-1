import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import NotFound from './pages/NotFound';
import AddCustomer from './pages/AddCustomer';
import EditCustomer from './pages/EditCustomer';
import ViewCustomer from './pages/ViewCustomer';
import Layout from './layouts/Layout';
import MainLayout from './layouts/MainLayout';
import ProfilePage from './pages/ProfilePage';
import Home from './pages/Home';
import EmptyPage from './pages/EmptyPage';
import { useAuth } from './context/AuthContext';
import { Navigate } from 'react-router-dom';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Protected Dashboard Routes */}
      <Route element={<MainLayout />}>
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/add-customer" 
          element={
            <ProtectedRoute>
              <AddCustomer />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/customers/:id" 
          element={
            <ProtectedRoute>
              <ViewCustomer />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/customers/edit/:id" 
          element={
            <ProtectedRoute>
              <EditCustomer />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/empty" 
          element={
            <ProtectedRoute>
              <EmptyPage />
            </ProtectedRoute>
          } 
        />
      </Route>

      {/* Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;