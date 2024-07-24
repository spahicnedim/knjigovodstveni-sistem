import { useSelector } from "react-redux";

const useAuthorization = (allowedRoles) => {
  const user = useSelector((state) => state.auth.user);
  const roles = useSelector((state) => state.auth.roles);

  if (!user || !roles.length) return false;

  return allowedRoles.includes(user.role);
};

export default useAuthorization;
