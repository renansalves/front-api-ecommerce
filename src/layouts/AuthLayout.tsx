
import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="grid bg-gray-100">
      <Outlet />
    </div>
  );
}

