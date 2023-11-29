import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const navigate = useNavigate();
  const check = JSON.parse(localStorage.getItem('currentUser'));
  const roleAuth = JSON.parse(localStorage.getItem('UserRole'));

  useEffect(() => {
    if (check === null) {
      console.log("no user");
      navigate("/register");
    } else if (roleAuth !== "Admin") {
      navigate("/");
    }
  }, [check, roleAuth, navigate]);
};

