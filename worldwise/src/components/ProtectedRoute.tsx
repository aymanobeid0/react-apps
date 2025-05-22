import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Outlet, useNavigate, useLocation } from "react-router";

export function ProtectedRoute({
  redirectPath = "/login",
  children,
}: {
  redirectPath?: string;
  children?: React.ReactNode;
}) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(
    function checkUser() {
      if (!user) {
        navigate(redirectPath, {
          // replace: false,
          //where it should go after login
          state: { from: location },
        });
        console.log(location.pathname);
      }
    },
    [user, navigate, redirectPath, location]
  );

  return children ? children : <Outlet />;
}
