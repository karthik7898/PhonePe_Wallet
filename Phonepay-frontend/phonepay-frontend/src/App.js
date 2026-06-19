import React, { Suspense, lazy, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

// Lazy load components
const LoginForm = lazy(() => import("./components/LoginForm/LoginForm"));
const RegistrationForm = lazy(() => import("./components/RegistrationForm/RegistrationForm"));
const Dashboard = lazy(() => import("./components/Dashboard/Dashboard"));

// Loading screen
const Loading = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f5f5f5",
      fontSize: "18px",
      color: "#666",
    }}
  >
    Loading...
  </div>
);

function App() {
  const [loggedIn, setLoggedIn] = useState(
    !!localStorage.getItem("currentUser")
  );

  // Protect dashboard
  const PrivateRoute = ({ children }) => {
    return loggedIn ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={<LoginForm onLogin={() => setLoggedIn(true)} />}
          />

          <Route
            path="/login"
            element={<LoginForm onLogin={() => setLoggedIn(true)} />}
          />

          <Route path="/register" element={<RegistrationForm />} />

          {/* Protected Route */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
