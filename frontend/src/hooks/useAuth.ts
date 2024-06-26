import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useAuth() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token"); // Remove the token
    queryClient.clear(); // Clear the cache
    navigate("/signin"); // Redirect to login page
  }

  return { logout };
}
