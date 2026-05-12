import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './routes/protectedRoutes.jsx';

import Application from './pages/applications.jsx';
import Dashboard from './pages/dashboard.jsx';
import Login from './pages/login.jsx';
import Register from './pages/register.jsx';
import Reminder from './pages/reminders.jsx';
import Resume from './pages/resumes.jsx';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-5xl font-bold text-blue-600">
        StudentPlacementOS
      </h1>
    </div>} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/applications" element={<ProtectedRoute><Application /></ProtectedRoute>} />
        <Route path="/reminders" element={<ProtectedRoute><Reminder /></ProtectedRoute>} />
        <Route path="/resumes" element={<ProtectedRoute><Resume /></ProtectedRoute>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
