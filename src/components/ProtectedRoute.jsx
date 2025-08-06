import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
// import axios from "axios";
import axios from '../api/axiosInstance'; 

export default function ProtectedRoute({ children, role }) {
  const [loading, setLoading] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/check-auth");
        if (!role || res.data.role === role) {
          setIsAllowed(true);
        }
      } catch (err) {
        setIsAllowed(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [role]);

  if (loading) return <div>Loading...</div>;
  if (!isAllowed) return <Navigate to="/" />;
  return children;
}
