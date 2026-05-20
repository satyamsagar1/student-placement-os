import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./routes/protectedRoutes.jsx";
import PublicRoute from "./routes/publicRoutes.jsx";
import AppLayout from "./layouts/appLayout.jsx";

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
      
      <Routes>
        <Route 
        path="/" 
        element={
          <AppLayout>
            <HomePage />
          </AppLayout>
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
              <AppLayout>
                <Dashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Application />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reminders"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Reminder />
              </AppLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/resumes"
          element={
            <ProtectedRoute>
              <AppLayout>
                <Resume />
              </AppLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
