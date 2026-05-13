import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/protectedRoutes.jsx";
import PublicRoute from "./routes/publicRoutes.jsx";
import Navbar from "./components/navbar.jsx";

import HomePage from "./pages/homePage.jsx";
import Application from "./pages/applications.jsx";
import Dashboard from "./pages/dashboard.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Reminder from "./pages/reminders.jsx";
import Resume from "./pages/resumes.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route 
        path="/" 
        element={
        <PublicRoute>
        <HomePage />
        </PublicRoute>
        } />

        <Route 
        path="/login" 
        element={
        <PublicRoute>
          <Login />
        </PublicRoute>
        } />

        <Route 
        path="/register" 
        element={
        <PublicRoute>
          <Register />
        </PublicRoute>
        } />
        
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <Application />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reminders"
          element={
            <ProtectedRoute>
              <Reminder />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resumes"
          element={
            <ProtectedRoute>
              <Resume />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
