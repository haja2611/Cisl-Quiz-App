import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentRegister from "./pages/StudentRegister";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Router basename="/Cisl-Quiz-App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<StudentRegister />} />
        {/* <Route path="/quiz" element={<QuizPage />} /> */}
        <Route path="/result" element={<ResultPage />} />
        {/* <Route path="/admin" element={<AdminLogin />} /> */}
        <Route
          path="/quiz"
          element={
            <ProtectedRoute role="student">
              <QuizPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
