import { useSelector } from "react-redux";
import { Navigate,Outlet } from "react-router-dom";

function RequireAuth({ allowedRoles }) {
  const {isLoggedIn,role} = useSelector((state) => (state.auth));
 

  return isLoggedIn && allowedRoles.find((myRole) => myRole === role) ? (
    <Outlet />
  ) : isLoggedIn ? (
    <Navigate to='/denied' />
    // console.log(isLoggedIn,role,"login in")
  ) : (
    <Navigate to="/login" />
  );
}

export default RequireAuth;
